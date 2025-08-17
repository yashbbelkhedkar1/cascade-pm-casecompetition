import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CashflowAnalysis = () => {
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-12-31");
  const [activeTab, setActiveTab] = useState("Trend");

  // Mock data based on Figma design
  const cashFlowData = {
    thisPeriod: 712404,
    income: 1076341,
    expenses: 363937,
    avgIncome: 89695,
    avgExpenses: 30328,
    avgSavings: 59367
  };

  // Monthly trend data for charts
  const monthlyData = [
    { month: "Feb", amount: 45000, positive: true },
    { month: "Mar", amount: 30000, positive: true },
    { month: "Apr", amount: 55000, positive: true },
    { month: "May", amount: 35000, positive: true },
    { month: "Jun", amount: 65000, positive: true },
    { month: "Jul", amount: 40000, positive: true },
    { month: "Aug", amount: 50000, positive: true },
    { month: "Sep", amount: 45000, positive: true },
    { month: "Oct", amount: 35000, positive: true },
    { month: "Nov", amount: 60000, positive: true },
    { month: "Dec", amount: 55000, positive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/analytics" className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold">Statistics</h1>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">Cash Flow</h2>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Date Range Selector */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Cash Flow Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Cash Flow</h3>
            <p className="text-sm text-gray-600">Am I spending less than I make?</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-1">THIS PERIOD</p>
            <div className="text-3xl font-bold text-green-600">+₹{cashFlowData.thisPeriod.toLocaleString()}</div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-700">Income</span>
              </div>
              <span className="font-semibold">₹{cashFlowData.income.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-700">Expenses</span>
              </div>
              <span className="font-semibold">₹{cashFlowData.expenses.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Cash Flow Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Cash Flow Trend</h3>
            <p className="text-sm text-gray-600">In which periods I was saving more or less money?</p>
          </div>

          {/* Tab Buttons */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg border ${
                activeTab === "Trend" 
                  ? "bg-purple-600 text-white border-purple-600" 
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setActiveTab("Trend")}
            >
              Trend
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg border ${
                activeTab === "Cumulative" 
                  ? "bg-purple-600 text-white border-purple-600" 
                  : "bg-white text-gray-700 border-gray-300"
              }`}
              onClick={() => setActiveTab("Cumulative")}
            >
              Cumulative
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">THIS PERIOD</p>

          {/* Chart Area */}
          <div className="mb-6">
            {activeTab === "Trend" ? (
              <div className="flex items-end justify-between h-32 px-2">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center">
                    <div 
                      className="w-6 bg-green-500 rounded-t"
                      style={{ 
                        height: `${(data.amount / 70000) * 100}px`,
                        minHeight: '20px'
                      }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">{data.month}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-32 bg-gradient-to-b from-green-200 to-green-100 rounded-lg flex items-center justify-center">
                <p className="text-green-700 font-medium">Cumulative Cash Flow Chart</p>
              </div>
            )}
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Avg Income</p>
              <p className="font-semibold text-green-700">₹{cashFlowData.avgIncome.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Avg Expenses</p>
              <p className="font-semibold text-red-700">₹{cashFlowData.avgExpenses.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Avg Savings</p>
              <p className="font-semibold text-purple-700">₹{cashFlowData.avgSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashflowAnalysis;

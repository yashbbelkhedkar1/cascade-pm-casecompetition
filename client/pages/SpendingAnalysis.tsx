import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

const SpendingAnalysis = () => {
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-12-31");

  // Mock spending data based on the Figma design
  const spendingData = [
    { category: "Food", amount: 74239, percentage: 25, color: "#8B5CF6" },
    { category: "Transport", amount: 27250, percentage: 9, color: "#EF4444" },
    { category: "Entertainment", amount: 26684, percentage: 9, color: "#F59E0B" },
    { category: "Rent", amount: 120000, percentage: 40, color: "#10B981" },
    { category: "Shopping", amount: 49960, percentage: 17, color: "#06B6D4" }
  ];

  const totalSpending = 298133;

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/analytics" className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Spending Analysis</h1>
            <p className="text-purple-100 text-sm">Category breakdown and trends</p>
          </div>
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

        {/* Total Spending Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Total Spending</h2>
          <div className="text-3xl font-bold text-red-600 mb-1">₹{totalSpending.toLocaleString()}</div>
          <p className="text-sm text-gray-600">1/1/2024 - 12/31/2024</p>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          
          {/* Pie Chart - Using CSS to create a simple pie chart */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Rent - 40% */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="50"
                  strokeDasharray="62.8 157.2"
                  strokeDashoffset="0"
                />
                {/* Food - 25% */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="50"
                  strokeDasharray="39.25 180.95"
                  strokeDashoffset="-62.8"
                />
                {/* Shopping - 17% */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="50"
                  strokeDasharray="26.69 193.51"
                  strokeDashoffset="-102.05"
                />
                {/* Transport - 9% */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="50"
                  strokeDasharray="14.13 206.07"
                  strokeDashoffset="-128.74"
                />
                {/* Entertainment - 9% */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="50"
                  strokeDasharray="14.13 206.07"
                  strokeDashoffset="-142.87"
                />
              </svg>
              
              {/* Category Labels */}
              <div className="absolute top-0 right-0 text-xs">
                <span className="bg-white px-2 py-1 rounded shadow">Transport 9%</span>
              </div>
              <div className="absolute top-4 left-0 text-xs">
                <span className="bg-white px-2 py-1 rounded shadow">Entertainment 9%</span>
              </div>
              <div className="absolute top-1/2 right-0 text-xs">
                <span className="bg-white px-2 py-1 rounded shadow">Food 25%</span>
              </div>
              <div className="absolute bottom-4 right-4 text-xs">
                <span className="bg-white px-2 py-1 rounded shadow">Shopping</span>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs">
                <span className="bg-white px-2 py-1 rounded shadow">Rent 40%</span>
              </div>
            </div>
          </div>

          {/* Category List */}
          <div className="space-y-3">
            {spendingData.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium text-gray-900">{item.category}:</span>
                  <span className="text-gray-700">₹{item.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trends</h3>
          
          {/* Simple bar chart representation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="w-16">60000</span>
              <div className="flex-1 mx-2">
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="w-16">45000</span>
              <div className="flex-1 mx-2">
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="w-16">30000</span>
              <div className="flex-1 mx-2">
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="w-16">15000</span>
              <div className="flex-1 mx-2">
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="w-16">0</span>
              <div className="flex-1 mx-2">
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Apr 2024</span>
            <span>Aug 2024</span>
            <span>Dec 2024</span>
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Entertainment</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Food</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-cyan-500 rounded"></div>
              <span>Shopping</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Transport</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingAnalysis;

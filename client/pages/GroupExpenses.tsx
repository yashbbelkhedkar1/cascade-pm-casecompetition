import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GroupExpenses = () => {
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-12-31");

  // Mock data based on Figma design
  const summary = {
    totalOwedToMe: 16200,
    totalIOwe: 7350
  };

  const groupExpenseDetails = [
    {
      name: "Alice Johnson",
      amount: 4500,
      status: "Owes Me",
      date: "3/27/2024",
      statusColor: "text-green-600"
    },
    {
      name: "Bob Smith",
      amount: 2400,
      status: "I Owe",
      date: "6/11/2024",
      statusColor: "text-red-600"
    },
    {
      name: "Carol Davis",
      amount: 6600,
      status: "Owes Me",
      date: "3/29/2024",
      statusColor: "text-green-600"
    },
    {
      name: "David Wilson",
      amount: 1350,
      status: "I Owe",
      date: "9/3/2024",
      statusColor: "text-red-600"
    },
    {
      name: "Emma Brown",
      amount: 2850,
      status: "Owes Me",
      date: "10/12/2024",
      statusColor: "text-green-600"
    },
    {
      name: "Frank Miller",
      amount: 3600,
      status: "I Owe",
      date: "6/5/2024",
      statusColor: "text-red-600"
    },
    {
      name: "Grace Lee",
      amount: 2250,
      status: "Owes Me",
      date: "10/8/2024",
      statusColor: "text-green-600"
    }
  ];

  // Balance overview chart data
  const balanceData = [
    { month: "Jan", amount: 3500, positive: true },
    { month: "Feb", amount: 2000, positive: true },
    { month: "Mar", amount: -1500, positive: false },
    { month: "Apr", amount: 2500, positive: true },
    { month: "May", amount: -2000, positive: false },
    { month: "Jun", amount: 1800, positive: true },
    { month: "Jul", amount: -3500, positive: false },
    { month: "Aug", amount: 2800, positive: true }
  ];

  const netBalance = 8850;

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/analytics" className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Group Expenses</h1>
            <p className="text-purple-100 text-sm">Shared expenses and debts</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Total Owed to Me</h3>
            <div className="text-2xl font-bold text-green-700">
              ₹{summary.totalOwedToMe.toLocaleString()}
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <h3 className="text-sm font-medium text-red-800 mb-1">Total I Owe</h3>
            <div className="text-2xl font-bold text-red-700">
              ₹{summary.totalIOwe.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Group Expense Details */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Group Expense Details</h3>
          </div>
          
          <div className="p-4">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 mb-4 pb-2 border-b">
              <span>Name</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            
            {/* Data Rows */}
            <div className="space-y-3">
              {groupExpenseDetails.map((expense, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 text-sm items-center">
                  <span className="font-medium text-gray-900">{expense.name}</span>
                  <span className="font-semibold">₹{expense.amount.toLocaleString()}</span>
                  <span className={`font-medium ${expense.statusColor}`}>{expense.status}</span>
                  <span className="text-gray-600">{expense.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Balance Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Balance Overview</h3>
          
          {/* Chart */}
          <div className="mb-6">
            <div className="flex items-end justify-between h-32 px-2">
              {balanceData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    {data.positive ? (
                      <div 
                        className="w-6 bg-green-500 rounded-t mb-1"
                        style={{ 
                          height: `${(Math.abs(data.amount) / 4000) * 60 + 20}px`
                        }}
                      ></div>
                    ) : (
                      <div className="h-5"></div>
                    )}
                    
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                    
                    {!data.positive && (
                      <div 
                        className="w-6 bg-red-500 rounded-b mt-1"
                        style={{ 
                          height: `${(Math.abs(data.amount) / 4000) * 60 + 20}px`
                        }}
                      ></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Owes Me (Positive)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">I Owe (Negative)</span>
            </div>
          </div>

          {/* Net Balance */}
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-purple-800 mb-1">Net Balance</p>
            <div className="text-2xl font-bold text-purple-700">
              +₹{netBalance.toLocaleString()}
            </div>
            <p className="text-sm text-purple-600">Total amount owed to you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupExpenses;

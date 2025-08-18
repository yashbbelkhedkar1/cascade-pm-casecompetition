import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, TrendingUp, BarChart3, Users } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import { useTransactions } from "../context/TransactionContext";

const Analytics = () => {
  const { totalIncome, totalExpenses, balance } = useTransactions();
  const [fromDate, setFromDate] = useState("2024-01-01");
  const [toDate, setToDate] = useState("2024-12-31");

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-8 text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-purple-100 text-sm">Track your financial insights</p>
          <p className="text-purple-100 text-sm">Jan 1 - Dec 31, 2024</p>
        </div>
      </div>

      <div className="px-4 py-6 pb-20 space-y-6">
        {/* Date Range Selector */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-gray-900">Select Date Range</span>
          </div>
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
        </div>

        {/* Balance Summary */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Total Balance Left</span>
          </div>
          <div className="text-3xl font-bold text-purple-700 mb-4">₹{balance.toLocaleString()}</div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Income</p>
              <p className="text-lg font-semibold text-green-600">₹{totalIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-lg font-semibold text-red-600">₹{totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Analytics Options */}
        <div className="space-y-3">
          <Link
            to="/spending-analysis"
            className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Spending Analysis</h3>
                <p className="text-sm text-gray-600">View category breakdown and trends</p>
              </div>
            </div>
            <span className="text-purple-600 font-medium">View →</span>
          </Link>

          <Link
            to="/cashflow-analysis"
            className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Cashflow Analysis</h3>
                <p className="text-sm text-gray-600">Track income vs expenses flow</p>
              </div>
            </div>
            <span className="text-purple-600 font-medium">View →</span>
          </Link>

          <Link
            to="/group-expenses"
            className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Group Expenses</h3>
                <p className="text-sm text-gray-600">Track shared expenses and debts</p>
              </div>
            </div>
            <span className="text-purple-600 font-medium">View →</span>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Analytics;

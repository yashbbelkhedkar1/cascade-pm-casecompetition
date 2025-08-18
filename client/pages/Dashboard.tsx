import { Link } from "react-router-dom";
import {
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  Utensils,
  Bus,
  BookOpen,
  Wallet,
  BarChart3,
} from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import { useTransactions } from "../context/TransactionContext";

const Dashboard = () => {
  const { balance, totalIncome, totalExpenses, getRecentTransactions } =
    useTransactions();

  const recentExpenses = getRecentTransactions("expense", 3);
  const recentIncome = getRecentTransactions("income", 3);

  // Helper function to get icon based on category
  const getCategoryIcon = (category: string) => {
    const categoryMap: Record<string, any> = {
      "Food & Dining": {
        icon: Utensils,
        bg: "bg-red-100",
        color: "text-red-600",
      },
      Transportation: { icon: Bus, bg: "bg-blue-100", color: "text-blue-600" },
      Academic: {
        icon: BookOpen,
        bg: "bg-purple-100",
        color: "text-purple-600",
      },
      Employment: { icon: Wallet, bg: "bg-green-100", color: "text-green-600" },
      "Financial Support": {
        icon: TrendingUp,
        bg: "bg-yellow-100",
        color: "text-yellow-600",
      },
      Investments: {
        icon: BarChart3,
        bg: "bg-indigo-100",
        color: "text-indigo-600",
      },
    };
    return (
      categoryMap[category] || {
        icon: Wallet,
        bg: "bg-gray-100",
        color: "text-gray-600",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <Header
        title="Dashboard"
        rightContent={
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
            <span className="text-white text-sm font-medium">J</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        }
      />

      <div className="px-4 pb-20 relative">
        {/* Action Buttons */}
        <div className="py-4">
          <div className="flex gap-3">
            <Link
              to="/add-income"
              className="flex-1 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-xl py-5 sm:py-6 px-4 sm:px-6 flex flex-col items-center justify-center gap-2 shadow-lg transition-all touch-manipulation"
            >
              <Plus className="w-4 h-4" />
              <span className="font-semibold text-sm sm:text-base">
                Add Income
              </span>
            </Link>
            <Link
              to="/add-expense"
              className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-xl py-5 sm:py-6 px-4 sm:px-6 flex flex-col items-center justify-center gap-2 shadow-lg transition-all touch-manipulation"
            >
              <Minus className="w-4 h-4" />
              <div className="text-center">
                <div className="font-semibold text-sm sm:text-base">Add</div>
                <div className="font-semibold text-sm sm:text-base">
                  Expense
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-5 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-100 text-sm mb-1">Total Balance</p>
                <p className="text-xl sm:text-2xl font-bold truncate">
                  ₹{balance.toFixed(2)}
                </p>
              </div>
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-100 flex-shrink-0 ml-3" />
            </div>
          </div>
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link
            to="/payment-reminders"
            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">
                Reminders
              </span>
            </div>
            <p className="text-xs text-gray-600">5 active</p>
          </Link>
          <Link
            to="/wallet-ai"
            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">
                WalletAI
              </span>
            </div>
            <p className="text-xs text-gray-600">AI Assistant</p>
          </Link>
          <Link
            to="/loan-management"
            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Loans</span>
            </div>
            <p className="text-xs text-gray-600">8 loans</p>
          </Link>
          <Link
            to="/split-expenses"
            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Split</span>
            </div>
            <p className="text-xs text-gray-600">1 group</p>
          </Link>
        </div>

        {/* Income/Expense Stats */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-sm text-gray-600">Income (30d)</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ₹{totalIncome.toFixed(0)}
            </p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-sm text-gray-600">Expense (30d)</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ₹{totalExpenses.toFixed(0)}
            </p>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>
              <select className="text-sm border rounded-lg px-3 py-1 bg-white">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Recent Expenses</h3>
              <Link
                to="/expense-history"
                className="text-blue-500 text-sm font-medium"
              >
                Show More
              </Link>
            </div>

            <div className="space-y-3">
              {recentExpenses.map((expense) => {
                const categoryIcon = getCategoryIcon(expense.category);
                const IconComponent = categoryIcon.icon;
                return (
                  <div key={expense.id} className="flex items-center gap-3 p-2">
                    <div
                      className={`w-10 h-10 rounded-full ${categoryIcon.bg} flex items-center justify-center`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${categoryIcon.color}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {expense.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {expense.category}
                      </p>
                    </div>
                    <p className="font-semibold text-red-500">
                      ₹ {expense.amount}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Income */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Income</h2>
              <select className="text-sm border rounded-lg px-3 py-1 bg-white">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Recent Income</h3>
              <Link
                to="/income-history"
                className="text-blue-500 text-sm font-medium"
              >
                Show More
              </Link>
            </div>

            <div className="space-y-3">
              {recentIncome.map((income) => {
                const categoryIcon = getCategoryIcon(income.category);
                const IconComponent = categoryIcon.icon;
                return (
                  <div key={income.id} className="flex items-center gap-3 p-2">
                    <div
                      className={`w-10 h-10 rounded-full ${categoryIcon.bg} flex items-center justify-center`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${categoryIcon.color}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {income.title}
                      </p>
                      <p className="text-sm text-gray-600">{income.category}</p>
                    </div>
                    <p className="font-semibold text-green-500">
                      ₹ {income.amount}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;

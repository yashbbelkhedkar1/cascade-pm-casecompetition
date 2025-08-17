import { Link } from "react-router-dom";
import { Plus, Minus, TrendingUp, TrendingDown, Utensils, Bus, BookOpen, Wallet, BarChart3 } from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import { useTransactions } from "../context/TransactionContext";

const Dashboard = () => {
  const { balance, totalIncome, totalExpenses, getRecentTransactions } = useTransactions();

  const recentExpenses = getRecentTransactions("expense", 3);
  const recentIncome = getRecentTransactions("income", 3);

  // Helper function to get icon based on category
  const getCategoryIcon = (category: string) => {
    const categoryMap: Record<string, any> = {
      "Food & Dining": { icon: Utensils, bg: "bg-red-100", color: "text-red-600" },
      "Transportation": { icon: Bus, bg: "bg-blue-100", color: "text-blue-600" },
      "Academic": { icon: BookOpen, bg: "bg-purple-100", color: "text-purple-600" },
      "Employment": { icon: Wallet, bg: "bg-green-100", color: "text-green-600" },
      "Financial Support": { icon: TrendingUp, bg: "bg-yellow-100", color: "text-yellow-600" },
      "Investments": { icon: BarChart3, bg: "bg-indigo-100", color: "text-indigo-600" },
    };
    return categoryMap[category] || { icon: Wallet, bg: "bg-gray-100", color: "text-gray-600" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-800 rounded-sm flex items-center justify-center">
                <div className="w-4 h-0.5 bg-white rounded"></div>
              </div>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">App Name</h1>
              <p className="text-sm text-gray-600">Good morning, John!</p>
            </div>
          </div>
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
            <span className="text-white text-sm font-medium">J</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Action Buttons */}
        <div className="py-4">
          <div className="flex gap-3">
            <Link 
              to="/add-income"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl p-6 flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="font-semibold">Add Income</span>
            </Link>
            <Link 
              to="/add-expense"
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl p-6 flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
              <span className="font-semibold">Add Expense</span>
            </Link>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Balance</p>
                <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
              </div>
              <Wallet className="w-6 h-6 text-blue-100" />
            </div>
          </div>
        </div>

        {/* Income/Expense Stats */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-sm text-gray-600">Income (30d)</span>
            </div>
            <p className="text-xl font-bold text-gray-900">₹{totalIncome.toFixed(0)}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-sm text-gray-600">Expense (30d)</span>
            </div>
            <p className="text-xl font-bold text-gray-900">₹{totalExpenses.toFixed(0)}</p>
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
              <Link to="/expense-history" className="text-blue-500 text-sm font-medium">
                Show More
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentExpenses.map((expense) => {
                const categoryIcon = getCategoryIcon(expense.category);
                const IconComponent = categoryIcon.icon;
                return (
                  <div key={expense.id} className="flex items-center gap-3 p-2">
                    <div className={`w-10 h-10 rounded-full ${categoryIcon.bg} flex items-center justify-center`}>
                      <IconComponent className={`w-4 h-4 ${categoryIcon.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{expense.title}</p>
                      <p className="text-sm text-gray-600">{expense.category}</p>
                    </div>
                    <p className="font-semibold text-red-500">₹ {expense.amount}</p>
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
              <Link to="/income-history" className="text-blue-500 text-sm font-medium">
                Show More
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentIncome.map((income) => {
                const categoryIcon = getCategoryIcon(income.category);
                const IconComponent = categoryIcon.icon;
                return (
                  <div key={income.id} className="flex items-center gap-3 p-2">
                    <div className={`w-10 h-10 rounded-full ${categoryIcon.bg} flex items-center justify-center`}>
                      <IconComponent className={`w-4 h-4 ${categoryIcon.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{income.title}</p>
                      <p className="text-sm text-gray-600">{income.category}</p>
                    </div>
                    <p className="font-semibold text-green-500">₹ {income.amount}</p>
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

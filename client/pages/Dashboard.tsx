import { Link } from "react-router-dom";
import { Plus, Minus, TrendingUp, TrendingDown, Utensils, Bus, BookOpen, Home as HomeIcon, Target, BarChart3, User, Wallet } from "lucide-react";

const Dashboard = () => {
  // Mock data - will be replaced with state management
  const balance = 2847.50;
  const income = 3240;
  const expenses = 1892;

  const recentExpenses = [
    {
      id: 1,
      title: "Lunch at Cafe",
      category: "Food & Dining",
      amount: 25.50,
      icon: Utensils,
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      id: 2,
      title: "Bus Ticket",
      category: "Transportation",
      amount: 5.00,
      icon: Bus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Textbook",
      category: "Academic",
      amount: 89.99,
      icon: BookOpen,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const recentIncome = [
    {
      id: 1,
      title: "Part-time Job",
      category: "Employment",
      amount: 850.00,
      icon: Wallet,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      title: "Monthly Allowance",
      category: "Financial Support",
      amount: 500.00,
      icon: TrendingUp,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      id: 3,
      title: "Investment Returns",
      category: "Investments",
      amount: 125.50,
      icon: BarChart3,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">App Name</h1>
              <p className="text-sm text-gray-600">Good morning, John!</p>
            </div>
          </div>
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">J</span>
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
                <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
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
            <p className="text-xl font-bold text-gray-900">${income}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-sm text-gray-600">Expense (30d)</span>
            </div>
            <p className="text-xl font-bold text-gray-900">${expenses}</p>
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
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center gap-3 p-2">
                  <div className={`w-10 h-10 rounded-full ${expense.iconBg} flex items-center justify-center`}>
                    <expense.icon className={`w-4 h-4 ${expense.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{expense.title}</p>
                    <p className="text-sm text-gray-600">{expense.category}</p>
                  </div>
                  <p className="font-semibold text-red-500">₹ {expense.amount}</p>
                </div>
              ))}
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
              {recentIncome.map((income) => (
                <div key={income.id} className="flex items-center gap-3 p-2">
                  <div className={`w-10 h-10 rounded-full ${income.iconBg} flex items-center justify-center`}>
                    <income.icon className={`w-4 h-4 ${income.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{income.title}</p>
                    <p className="text-sm text-gray-600">{income.category}</p>
                  </div>
                  <p className="font-semibold text-green-500">₹ {income.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;

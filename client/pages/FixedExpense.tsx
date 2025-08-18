import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

interface FixedExpenseItem {
  id: string;
  title: string;
  amount: number;
  frequency: "Monthly" | "Weekly" | "Yearly";
  nextDate: string;
  isActive: boolean;
  category: string;
}

export default function FixedExpense() {
  const navigate = useNavigate();
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseItem[]>([
    {
      id: "1",
      title: "Rent",
      amount: 25000,
      frequency: "Monthly",
      nextDate: "2024-02-01",
      isActive: true,
      category: "Housing",
    },
    {
      id: "2",
      title: "Internet Bill",
      amount: 1500,
      frequency: "Monthly",
      nextDate: "2024-02-05",
      isActive: true,
      category: "Utilities",
    },
    {
      id: "3",
      title: "Gym Membership",
      amount: 2000,
      frequency: "Monthly",
      nextDate: "2024-02-10",
      isActive: false,
      category: "Health",
    },
    {
      id: "4",
      title: "Phone Bill",
      amount: 800,
      frequency: "Monthly",
      nextDate: "2024-02-15",
      isActive: true,
      category: "Utilities",
    },
  ]);

  const totalMonthlyExpenses = fixedExpenses
    .filter((item) => item.isActive)
    .reduce((sum, item) => sum + item.amount, 0);

  const toggleExpense = (id: string) => {
    setFixedExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Housing: "bg-blue-100 text-blue-600",
      Utilities: "bg-yellow-100 text-yellow-600",
      Health: "bg-green-100 text-green-600",
      Transport: "bg-purple-100 text-purple-600",
      Food: "bg-orange-100 text-orange-600",
    };
    return colors[category] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Fixed Expenses" />

      <div className="p-4 space-y-6 pb-20">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Monthly Fixed Expenses</h2>
          <p className="text-3xl font-bold">
            ₹{totalMonthlyExpenses.toLocaleString()}
          </p>
          <p className="text-red-100 text-sm mt-1">
            {fixedExpenses.filter((item) => item.isActive).length} active
            expenses
          </p>
        </div>

        {/* Add New Button */}
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border-2 border-dashed border-gray-200 hover:border-red-400 transition-colors">
          <div className="flex flex-col items-center text-gray-500 hover:text-red-600">
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="font-medium">Add New Fixed Expense</span>
          </div>
        </button>

        {/* Expense List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Your Fixed Expenses
          </h3>
          {fixedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-white rounded-xl p-4 shadow-sm border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {expense.title}
                    </h4>
                    <p className="text-2xl font-bold text-red-600">
                      ₹{expense.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{expense.frequency}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={expense.isActive}
                    onChange={() => toggleExpense(expense.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}
                >
                  {expense.category}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    expense.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {expense.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                Next payment: {expense.nextDate}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm">
                  Edit
                </button>
                <button className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-medium text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                ₹{totalMonthlyExpenses.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Expenses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {fixedExpenses.filter((item) => item.isActive).length}
              </p>
              <p className="text-sm text-gray-600">Active Expenses</p>
            </div>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h3 className="font-semibold text-gray-900 mb-4">By Category</h3>
          <div className="space-y-2">
            {Object.entries(
              fixedExpenses
                .filter((expense) => expense.isActive)
                .reduce(
                  (acc, expense) => {
                    acc[expense.category] =
                      (acc[expense.category] || 0) + expense.amount;
                    return acc;
                  },
                  {} as Record<string, number>,
                ),
            ).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}
                >
                  {category}
                </span>
                <span className="font-semibold">
                  ₹{amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

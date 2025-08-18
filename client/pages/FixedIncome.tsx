import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

interface FixedIncomeItem {
  id: string;
  title: string;
  amount: number;
  frequency: "Monthly" | "Weekly" | "Yearly";
  nextDate: string;
  isActive: boolean;
}

export default function FixedIncome() {
  const navigate = useNavigate();
  const [fixedIncomes, setFixedIncomes] = useState<FixedIncomeItem[]>([
    {
      id: "1",
      title: "Salary",
      amount: 50000,
      frequency: "Monthly",
      nextDate: "2024-02-01",
      isActive: true,
    },
    {
      id: "2",
      title: "Freelance Project",
      amount: 15000,
      frequency: "Monthly",
      nextDate: "2024-02-15",
      isActive: true,
    },
    {
      id: "3",
      title: "Investment Returns",
      amount: 2500,
      frequency: "Monthly",
      nextDate: "2024-02-05",
      isActive: false,
    },
  ]);

  const totalMonthlyIncome = fixedIncomes
    .filter((item) => item.isActive)
    .reduce((sum, item) => sum + item.amount, 0);

  const toggleIncome = (id: string) => {
    setFixedIncomes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Fixed Income" />

      <div className="p-4 space-y-6 pb-20">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Monthly Fixed Income</h2>
          <p className="text-3xl font-bold">
            ₹{totalMonthlyIncome.toLocaleString()}
          </p>
          <p className="text-green-100 text-sm mt-1">
            {fixedIncomes.filter((item) => item.isActive).length} active sources
          </p>
        </div>

        {/* Add New Button */}
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border-2 border-dashed border-gray-200 hover:border-green-400 transition-colors">
          <div className="flex flex-col items-center text-gray-500 hover:text-green-600">
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
            <span className="font-medium">Add New Fixed Income</span>
          </div>
        </button>

        {/* Income List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Your Fixed Income Sources
          </h3>
          {fixedIncomes.map((income) => (
            <div
              key={income.id}
              className="bg-white rounded-xl p-4 shadow-sm border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {income.title}
                    </h4>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{income.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{income.frequency}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={income.isActive}
                    onChange={() => toggleIncome(income.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Next payment: {income.nextDate}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    income.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {income.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
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
              <p className="text-2xl font-bold text-green-600">
                ₹{totalMonthlyIncome.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Expected Income</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {fixedIncomes.filter((item) => item.isActive).length}
              </p>
              <p className="text-sm text-gray-600">Active Sources</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Wallet,
  Monitor,
  TrendingUp,
  ShoppingBag,
  Gift,
} from "lucide-react";
import Header from "../components/Header";

const IncomeHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const incomes = [
    {
      id: 1,
      title: "Salary",
      category: "Employment",
      description: "Bank Transfer • HDFC Bank",
      note: "Monthly salary payment",
      amount: 45000,
      date: "Dec 1, 2024",
      icon: Wallet,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      title: "Web Development",
      category: "Freelance",
      description: "UPI • Google Pay",
      note: "Client project payment",
      amount: 15000,
      date: "Nov 28, 2024",
      icon: Monitor,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Stock Dividend",
      category: "Investment",
      description: "Bank Transfer • SBI",
      note: "Quarterly dividend payment",
      amount: 2500,
      date: "Nov 25, 2024",
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Online Store",
      category: "Business",
      description: "UPI • PhonePe",
      note: "Product sales revenue",
      amount: 8750,
      date: "Nov 22, 2024",
      icon: ShoppingBag,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: 5,
      title: "Birthday Gift",
      category: "Gift",
      description: "Cash",
      note: "Birthday money from family",
      amount: 5000,
      date: "Nov 20, 2024",
      icon: Gift,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  const totalIncome = 124500;
  const transactionCount = 142;

  const filteredIncomes = incomes.filter(
    (income) =>
      income.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      income.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Income History"
        rightContent={
          <button className="p-2 rounded-lg border border-gray-200 bg-white">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        }
      />

      <div className="px-4 pb-20">
        {/* Search Bar */}
        <div className="py-4 bg-white border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Income"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-lg font-semibold text-green-600">
                {transactionCount} transactions
              </p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredIncomes.map((income) => (
            <div
              key={income.id}
              className="bg-white rounded-xl shadow-sm border p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full ${income.iconBg} flex items-center justify-center mt-1`}
                >
                  <income.icon className={`w-4 h-4 ${income.iconColor}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {income.title}
                      </h3>
                      <p className="text-sm text-gray-600">{income.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        ₹{income.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{income.date}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-1">
                    {income.description}
                  </p>
                  <p className="text-sm text-gray-600">{income.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIncomes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No income found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeHistory;

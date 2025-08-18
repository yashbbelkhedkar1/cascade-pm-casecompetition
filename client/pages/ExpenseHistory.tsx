import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Utensils, Bus, ShoppingCart, Home as HomeIcon, Shirt } from "lucide-react";
import Header from "../components/Header";

const ExpenseHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const expenses = [
    {
      id: 1,
      title: "Restaurant Dinner",
      category: "Food • Restaurant",
      amount: 1250,
      paymentMethod: "UPI",
      date: "Today, 8:30 PM",
      tag: "Dining",
      icon: Utensils,
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      id: 2,
      title: "Petrol",
      category: "Transport • Fuel",
      amount: 2100,
      paymentMethod: "Cash",
      date: "Yesterday, 2:15 PM",
      tag: "Vehicle",
      icon: Bus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Grocery Shopping",
      category: "Food • Groceries",
      amount: 3450,
      paymentMethod: "UPI",
      date: "2 days ago, 11:30 AM",
      tag: "Weekly",
      icon: ShoppingCart,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      title: "Monthly Rent",
      category: "Housing • Rent",
      amount: 15000,
      paymentMethod: "UPI",
      date: "3 days ago, 9:00 AM",
      tag: "Monthly",
      icon: HomeIcon,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 5,
      title: "Clothing",
      category: "Shopping • Apparel",
      amount: 2780,
      paymentMethod: "Cash",
      date: "1 week ago, 6:45 PM",
      tag: "Fashion",
      icon: Shirt,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  const totalExpenses = 24580;
  const transactionCount = 142;

  const filteredExpenses = expenses.filter(expense =>
    expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Expense History"
        showBackButton={true}
        onBackClick={() => navigate("/")}
        rightContent={
          <button className="text-gray-600">
            <Filter className="w-5 h-5" />
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
              placeholder="Search expenses..."
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
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-lg font-semibold text-green-600">{transactionCount} transactions</p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${expense.iconBg} flex items-center justify-center`}>
                  <expense.icon className={`w-5 h-5 ${expense.iconColor}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{expense.title}</h3>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{expense.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{expense.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{expense.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{expense.date}</p>
                    <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                      {expense.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No expenses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;

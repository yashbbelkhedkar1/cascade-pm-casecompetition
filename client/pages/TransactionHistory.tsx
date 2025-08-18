import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: string;
  type: "sent" | "received";
  name: string;
  amount: number;
  time: string;
  status: "completed" | "pending" | "failed";
}

export default function TransactionHistory() {
  const navigate = useNavigate();
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "sent",
      name: "Coffee Shop",
      amount: 250,
      time: "2 mins ago",
      status: "completed"
    },
    {
      id: "2",
      type: "received",
      name: "John Doe",
      amount: 1200,
      time: "1 hour ago",
      status: "completed"
    },
    {
      id: "3",
      type: "sent",
      name: "Grocery Store",
      amount: 500,
      time: "3 hours ago",
      status: "completed"
    },
    {
      id: "4",
      type: "received",
      name: "Sarah Wilson",
      amount: 75,
      time: "1 day ago",
      status: "completed"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Transaction History</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="p-4">
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  transaction.type === "sent" 
                    ? "bg-red-100" 
                    : "bg-green-100"
                }`}>
                  {transaction.type === "sent" ? (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Transaction Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{transaction.name}</h3>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>

                {/* Amount and Status */}
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "sent" ? "text-red-600" : "text-green-600"
                  }`}>
                    {transaction.type === "sent" ? "-" : "+"}₹{transaction.amount}
                  </p>
                  <p className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : transaction.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className="w-full mt-6 py-4 border border-gray-200 rounded-2xl text-gray-600 font-medium hover:bg-gray-50 transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
}

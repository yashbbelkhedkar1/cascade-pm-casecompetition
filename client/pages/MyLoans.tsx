import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Loan {
  id: string;
  type: string;
  bank: string;
  category: string;
  emiAmount: number;
  tenure: string;
  principalAmount: number;
  remainingAmount: number;
  status: "Paid" | "Not Paid";
  nextDueDate?: string;
}

export default function MyLoans() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const loans: Loan[] = [
    {
      id: "1",
      type: "Education Loan",
      bank: "HDFC Bank",
      category: "Education Loan",
      emiAmount: 12500,
      tenure: "60 months",
      principalAmount: 500000,
      remainingAmount: 320000,
      status: "Paid"
    },
    {
      id: "2", 
      type: "Personal Loan",
      bank: "ICICI Bank",
      category: "Personal Loan",
      emiAmount: 8200,
      tenure: "36 months",
      principalAmount: 250000,
      remainingAmount: 185000,
      status: "Not Paid"
    },
    {
      id: "3",
      type: "Home Loan",
      bank: "SBI Bank", 
      category: "Other Loan",
      emiAmount: 25000,
      tenure: "240 months",
      principalAmount: 3500000,
      remainingAmount: 2850000,
      status: "Paid"
    }
  ];

  const filteredLoans = loans.filter(loan =>
    loan.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loan.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLoanIcon = (category: string) => {
    switch (category) {
      case "Education Loan":
        return "🎓";
      case "Personal Loan":
        return "👤";
      case "Other Loan":
        return "🏠";
      default:
        return "📄";
    }
  };

  const getBankLogo = (bank: string) => {
    if (bank.includes("HDFC")) return "HDFC";
    if (bank.includes("ICICI")) return "ICICI";
    if (bank.includes("SBI")) return "SBI";
    return bank.substring(0, 4).toUpperCase();
  };

  const getStatusColor = (status: string) => {
    return status === "Paid" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">My Loans</h1>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 pb-20">
        {filteredLoans.map((loan) => (
          <div key={loan.id} className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-xl">
                  {getLoanIcon(loan.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{loan.type}</h3>
                  <p className="text-sm text-gray-600">{loan.bank}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                  {loan.status}
                </span>
                <button className="p-1">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mb-3">
                {loan.category}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">EMI Amount</p>
                <p className="font-semibold text-gray-900">₹{loan.emiAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tenure</p>
                <p className="font-semibold text-gray-900">{loan.tenure}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Principal Amount</p>
                <p className="font-semibold text-gray-900">₹{(loan.principalAmount / 100000).toFixed(1)}L</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Remaining</p>
                <p className="font-semibold text-red-600">₹{(loan.remainingAmount / 100000).toFixed(1)}L</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Change Status
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
                </svg>
                Set Reminder
              </button>
            </div>
          </div>
        ))}

        {/* Add Loan Button */}
        <button
          onClick={() => navigate("/add-loan")}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Loan
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate("/loan-management")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button 
            onClick={() => navigate("/loan-categories")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-xs">Categories</span>
          </button>
          <button 
            onClick={() => navigate("/add-loan")}
            className="flex flex-col items-center py-2 px-3 text-blue-600"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xs">Add Loan</span>
          </button>
          <button 
            onClick={() => navigate("/loan-history")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}

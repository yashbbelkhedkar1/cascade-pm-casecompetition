import { useNavigate } from "react-router-dom";

interface LoanTransaction {
  id: string;
  type: "disbursement" | "payment" | "fee";
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
  reference: string;
  isCredit: boolean;
}

export default function LoanHistory() {
  const navigate = useNavigate();

  const transactions: LoanTransaction[] = [
    {
      id: "1",
      type: "disbursement", 
      title: "Loan Disbursement",
      subtitle: "Personal Loan #PL-2024-001",
      amount: 15000.00,
      date: "Jan 15, 2024",
      status: "Completed",
      reference: "TXN789123456",
      isCredit: true
    },
    {
      id: "2",
      type: "payment",
      title: "Monthly Payment", 
      subtitle: "Personal Loan #PL-2024-001",
      amount: 850.00,
      date: "Jan 10, 2024",
      status: "Completed",
      reference: "TXN789123455",
      isCredit: false
    },
    {
      id: "3",
      type: "fee",
      title: "Late Fee",
      subtitle: "Personal Loan #PL-2024-001", 
      amount: 25.00,
      date: "Dec 28, 2023",
      status: "Pending",
      reference: "TXN789123454",
      isCredit: false
    },
    {
      id: "4",
      type: "payment",
      title: "Monthly Payment",
      subtitle: "Personal Loan #PL-2024-001",
      amount: 850.00,
      date: "Dec 10, 2023", 
      status: "Completed",
      reference: "TXN789123453",
      isCredit: false
    }
  ];

  const getTransactionIcon = (type: string, isCredit: boolean) => {
    if (type === "disbursement") {
      return (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
      );
    } else if (type === "payment") {
      return (
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">Loan Transactions</h1>
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-4 space-y-4 pb-20">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-start">
              {getTransactionIcon(transaction.type, transaction.isCredit)}
              
              <div className="ml-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{transaction.title}</h3>
                    <p className="text-sm text-gray-600">{transaction.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.isCredit ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.isCredit ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                  <span className="text-xs text-gray-500">Ref: {transaction.reference}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
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
            className="flex flex-col items-center py-2 px-3 text-gray-400"
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
            className="flex flex-col items-center py-2 px-3 text-blue-600"
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

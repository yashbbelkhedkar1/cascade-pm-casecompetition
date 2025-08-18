import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [reminderDays, setReminderDays] = useState("1");
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "1",
      type: "Education Loan",
      bank: "HDFC Bank",
      category: "Education Loan",
      emiAmount: 12500,
      tenure: "60 months",
      principalAmount: 500000,
      remainingAmount: 320000,
      status: "Paid",
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
      status: "Not Paid",
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
      status: "Paid",
    },
  ]);

  const filteredLoans = loans.filter(
    (loan) =>
      loan.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.bank.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const getStatusColor = (status: string) => {
    return status === "Paid"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const handleChangeStatus = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowPaymentModal(true);
  };

  const handleSetReminder = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowReminderModal(true);
  };

  const updateLoanStatus = (newStatus: "Paid" | "Not Paid") => {
    if (selectedLoan) {
      setLoans((prev) =>
        prev.map((loan) =>
          loan.id === selectedLoan.id ? { ...loan, status: newStatus } : loan,
        ),
      );
      setShowPaymentModal(false);
      setSelectedLoan(null);
    }
  };

  const closeModals = () => {
    setShowPaymentModal(false);
    setShowReminderModal(false);
    setSelectedLoan(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="My Loans"
        rightContent={
          <div className="flex items-center gap-2">
            <button className="p-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="p-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                />
              </svg>
            </button>
          </div>
        }
      />

      {/* Content */}
      <div className="p-4 space-y-4 pb-20">
        {filteredLoans.map((loan) => (
          <div
            key={loan.id}
            className="bg-white rounded-xl p-4 shadow-sm border"
          >
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
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}
                >
                  {loan.status}
                </span>
                <button className="p-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
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
                <p className="font-semibold text-gray-900">
                  ₹{loan.emiAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tenure</p>
                <p className="font-semibold text-gray-900">{loan.tenure}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Principal Amount</p>
                <p className="font-semibold text-gray-900">
                  ₹{(loan.principalAmount / 100000).toFixed(1)}L
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Remaining</p>
                <p className="font-semibold text-red-600">
                  ₹{(loan.remainingAmount / 100000).toFixed(1)}L
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleChangeStatus(loan)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Change Status
              </button>
              <button
                onClick={() => handleSetReminder(loan)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex-1"
              >
                <svg
                  className="w-4 h-4"
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
          <svg
            className="w-5 h-5"
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
          Add Loan
        </button>
      </div>

      {/* Payment Status Modal */}
      {showPaymentModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Payment Status</h3>
              </div>
              <button
                onClick={closeModals}
                className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                {selectedLoan.type}
              </h4>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current Payment Status
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateLoanStatus("Paid")}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                      selectedLoan.status === "Paid"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Paid
                  </button>
                  <button
                    onClick={() => updateLoanStatus("Not Paid")}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                      selectedLoan.status === "Not Paid"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Not Paid
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Principal Amount</p>
                  <p className="font-semibold text-gray-900">
                    ₹{(selectedLoan.principalAmount / 100000).toFixed(1)}L
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Remaining</p>
                  <p className="font-semibold text-red-600">
                    ₹{(selectedLoan.remainingAmount / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeModals}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Change Status
              </button>
              <button
                onClick={() => handleSetReminder(selectedLoan)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex-1"
              >
                <svg
                  className="w-4 h-4"
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
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Settings Modal */}
      {showReminderModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-white"
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
                <h3 className="font-semibold text-gray-900">
                  Reminder Settings
                </h3>
              </div>
              <button
                onClick={closeModals}
                className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">
                      Set Payment Reminder
                    </span>
                    <p className="text-sm text-gray-600">
                      Get notified before payment due date
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={reminderEnabled}
                    onChange={(e) => setReminderEnabled(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Remind me before (days)
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {["1", "3", "5", "7"].map((days) => (
                    <button
                      key={days}
                      onClick={() => setReminderDays(days)}
                      className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                        reminderDays === days
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {days}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Custom days"
                  className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModals}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={closeModals}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                  Save Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => navigate("/loan-management")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/loan-categories")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span className="text-xs">Categories</span>
          </button>
          <button
            onClick={() => navigate("/add-loan")}
            className="flex flex-col items-center py-2 px-3 text-blue-600"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
            <span className="text-xs">Add Loan</span>
          </button>
          <button
            onClick={() => navigate("/loan-history")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}

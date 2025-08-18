import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AddLoan() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    loanName: "",
    bankName: "",
    loanCategory: "",
    principalAmount: "",
    remainingAmount: "",
    emiAmount: "",
    tenureMonths: "",
    paymentStatus: "Not Paid",
    allowStatusChange: true,
    setReminder: false,
    reminderDays: "1"
  });

  const loanCategories = [
    "Education Loan",
    "Personal Loan", 
    "Home Loan",
    "Car Loan",
    "Business Loan",
    "Other"
  ];

  const reminderDaysOptions = ["1", "3", "5", "7"];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.loanName || !formData.bankName || !formData.loanCategory) {
      alert("Please fill all required fields");
      return;
    }
    
    // Here you would typically save the loan data
    console.log("Adding loan:", formData);
    navigate("/my-loans");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Add New Loan"
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />

      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-medium">1</span>
            </div>
            <h3 className="font-semibold text-gray-900">Basic Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Name</label>
              <input
                type="text"
                value={formData.loanName}
                onChange={(e) => handleInputChange("loanName", e.target.value)}
                placeholder="Enter loan name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                placeholder="Enter bank name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Category</label>
              <select
                value={formData.loanCategory}
                onChange={(e) => handleInputChange("loanCategory", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select loan category</option>
                {loanCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">$</span>
            </div>
            <h3 className="font-semibold text-gray-900">Financial Details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.principalAmount}
                  onChange={(e) => handleInputChange("principalAmount", e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remaining Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.remainingAmount}
                  onChange={(e) => handleInputChange("remainingAmount", e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">EMI Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.emiAmount}
                  onChange={(e) => handleInputChange("emiAmount", e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months)</label>
              <input
                type="number"
                value={formData.tenureMonths}
                onChange={(e) => handleInputChange("tenureMonths", e.target.value)}
                placeholder="Enter tenure in months"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Payment Status</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Current Payment Status</label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleInputChange("paymentStatus", "Paid")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                    formData.paymentStatus === "Paid"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Paid
                  </div>
                </button>
                <button
                  onClick={() => handleInputChange("paymentStatus", "Not Paid")}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                    formData.paymentStatus === "Not Paid"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not Paid
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.allowStatusChange}
                  onChange={(e) => handleInputChange("allowStatusChange", e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                  formData.allowStatusChange 
                    ? "bg-blue-600 border-blue-600" 
                    : "border-gray-300"
                }`}>
                  {formData.allowStatusChange && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Allow Status Change</span>
                  <p className="text-sm text-gray-600">Enable quick status updates for this loan</p>
                </div>
              </label>
              <div className="flex items-center justify-end">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowStatusChange}
                    onChange={(e) => handleInputChange("allowStatusChange", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder Settings */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Reminder Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-lg p-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">Set Payment Reminder</span>
                  <p className="text-sm text-gray-600">Get notified before payment due date</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.setReminder}
                  onChange={(e) => handleInputChange("setReminder", e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>
            </div>

            {formData.setReminder && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Remind me before (days)</label>
                <div className="grid grid-cols-4 gap-3">
                  {reminderDaysOptions.map((days) => (
                    <button
                      key={days}
                      onClick={() => handleInputChange("reminderDays", days)}
                      className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                        formData.reminderDays === days
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
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
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-4 border border-gray-200 rounded-xl font-semibold text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Loan
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFixedIncome() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    subcategory: "",
    paymentMode: "",
    date: "",
    frequency: "One Time",
    notes: ""
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const categories = [
    "Salary",
    "Business",
    "Freelance", 
    "Investment",
    "Rental",
    "Interest",
    "Bonus",
    "Commission",
    "Pension",
    "Other"
  ];

  const subcategories = {
    "Salary": ["Monthly Salary", "Overtime", "Allowances", "Benefits"],
    "Business": ["Revenue", "Profit", "Sales", "Services"],
    "Freelance": ["Project Payment", "Consulting", "Design Work", "Writing"],
    "Investment": ["Stocks", "Mutual Funds", "Fixed Deposits", "Bonds"],
    "Rental": ["Property Rent", "Equipment Rent", "Vehicle Rent"],
    "Interest": ["Bank Interest", "Loan Interest", "Investment Returns"],
    "Bonus": ["Performance Bonus", "Annual Bonus", "Festival Bonus"],
    "Commission": ["Sales Commission", "Referral Bonus", "Affiliate"],
    "Pension": ["Government Pension", "Private Pension", "Retirement Fund"],
    "Other": ["Gift", "Refund", "Cashback", "Miscellaneous"]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveIncome = () => {
    // Validate required fields
    if (!formData.amount || !formData.category || !formData.paymentMode || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    // Here you would typically save the income data
    console.log("Saving fixed income:", formData);

    // Show success popup
    setShowSuccessPopup(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    navigate("/fixed-income");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-xl font-semibold">Add Fixed Income</h1>
          
          <button className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Subcategory
          </label>
          <div className="relative">
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange("subcategory", e.target.value)}
              disabled={!formData.category}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none disabled:bg-gray-100"
            >
              <option value="">Select Subcategory</option>
              {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Payment Mode <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => handleInputChange("paymentMode", "Cash")}
              className={`flex-1 py-3 px-4 rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                formData.paymentMode === "Cash"
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              <span className="text-green-600">💵</span>
              Cash
            </button>
            <button
              onClick={() => handleInputChange("paymentMode", "UPI")}
              className={`flex-1 py-3 px-4 rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                formData.paymentMode === "UPI"
                  ? "border-purple-500 bg-purple-50 text-purple-600"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              <span className="text-purple-600">📱</span>
              UPI
            </button>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Frequency <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => handleInputChange("frequency", "One Time")}
              className={`flex-1 py-3 px-4 rounded-xl border transition-colors ${
                formData.frequency === "One Time"
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              One Time
            </button>
            <button
              onClick={() => handleInputChange("frequency", "Recurrent")}
              className={`flex-1 py-3 px-4 rounded-xl border transition-colors ${
                formData.frequency === "Recurrent"
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              Recurrent
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Notes <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Add any additional notes..."
            rows={4}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-4 border border-gray-200 rounded-xl font-semibold text-gray-700 bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveIncome}
            disabled={!formData.amount || !formData.category || !formData.paymentMode || !formData.date}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              formData.amount && formData.category && formData.paymentMode && formData.date
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Income
          </button>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        title="Fixed Income Added Successfully!"
        message={`Your ${formData.subcategory || formData.category} fixed income of ₹${formData.amount} has been saved.`}
        onClose={handleSuccessClose}
      />
    </div>
  );
}

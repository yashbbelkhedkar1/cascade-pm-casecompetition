import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import SuccessPopup from "../components/SuccessPopup";

export default function AddFixedExpense() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  
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
    "Housing and Living Expenses",
    "Food and Dining", 
    "Academic and Educational Costs",
    "Transportation",
    "Personal",
    "Health Expenses",
    "Social and Entertainment",
    "Communication and Technology",
    "Financial Obligations & Miscellaneous",
    "Other Expenses"
  ];

  const subcategoriesByCategory = {
    "Housing and Living Expenses": ["Rent", "Electricity Bill", "Water Bill", "Gas Bill", "Household Supplies", "Furnishings", "Groceries", "Laundry"],
    "Food and Dining": ["Groceries", "Dining Out", "Special Diet"],
    "Academic and Educational Costs": ["Tuition Fees", "Application fees", "Lab fees", "Textbooks and Course Materials", "Academic Supplies", "Electronics"],
    "Transportation": ["Public Transport", "Taxi", "Fuel", "Parking fees", "Maintenance", "Insurance", "Bicycles Maintenance", "Monthly Pass"],
    "Personal": ["Clothing", "Footwear", "Gifts", "Personal Care"],
    "Health Expenses": ["Health insurance Premium", "Medications", "Gym Membership", "Medical Fees", "Insurance Premiums"],
    "Social and Entertainment": ["Movies", "Concerts", "Hobbies and Sports", "OTT Subscriptions", "Vacations"],
    "Communication and Technology": ["Mobile Phone Bills", "Internet Bill", "Accessories"],
    "Financial Obligations & Miscellaneous": ["Student loans", "Credit repayments", "EMIs", "Emergency Fund Savings"],
    "Other Expenses": ["Custom"]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset subcategory if category changes
    if (field === "category") {
      setFormData(prev => ({
        ...prev,
        subcategory: ""
      }));
    }
  };

  const handleSaveExpense = () => {
    // Validate required fields
    if (!formData.amount || !formData.category || !formData.subcategory || !formData.paymentMode || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    // Add to transactions
    addTransaction({
      type: "expense",
      title: formData.subcategory,
      category: formData.category,
      subcategory: formData.subcategory,
      amount: parseFloat(formData.amount),
      date: formData.date,
      note: formData.notes,
      isRecurring: formData.frequency === "Recurrent",
      paymentMethod: formData.paymentMode,
    });

    // Show success popup
    setShowSuccessPopup(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    navigate("/fixed-expense");
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-xl font-semibold">Add Fixed Expense</h1>
          
          <button className="w-10 h-10 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-lg text-gray-400"
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
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none text-gray-700"
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
            Subcategory <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange("subcategory", e.target.value)}
              disabled={!formData.category}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none disabled:bg-gray-100 text-gray-700"
            >
              <option value="">Select Subcategory</option>
              {formData.category && subcategoriesByCategory[formData.category as keyof typeof subcategoriesByCategory]?.map((sub) => (
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
              className={`flex-1 py-4 px-4 rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                formData.paymentMode === "Cash"
                  ? "border-gray-300 bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                formData.paymentMode === "Cash" ? "border-blue-500" : "border-gray-300"
              }`}>
                {formData.paymentMode === "Cash" && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="text-green-600 text-lg">💵</span>
              <span className="text-gray-700">Cash</span>
            </button>
            <button
              onClick={() => handleInputChange("paymentMode", "UPI")}
              className={`flex-1 py-4 px-4 rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                formData.paymentMode === "UPI"
                  ? "border-gray-300 bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                formData.paymentMode === "UPI" ? "border-blue-500" : "border-gray-300"
              }`}>
                {formData.paymentMode === "UPI" && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="text-blue-600 text-lg">📱</span>
              <span className="text-gray-700">UPI</span>
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
              placeholder="dd/mm/yyyy"
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-700"
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
              className={`flex-1 py-4 px-4 rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                formData.frequency === "One Time"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                formData.frequency === "One Time" ? "border-blue-500" : "border-gray-300"
              }`}>
                {formData.frequency === "One Time" && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className={formData.frequency === "One Time" ? "text-blue-600" : "text-gray-700"}>
                One Time
              </span>
            </button>
            <button
              onClick={() => handleInputChange("frequency", "Recurrent")}
              className={`flex-1 py-4 px-4 rounded-xl border transition-colors flex items-center justify-center gap-2 ${
                formData.frequency === "Recurrent"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                formData.frequency === "Recurrent" ? "border-blue-500" : "border-gray-300"
              }`}>
                {formData.frequency === "Recurrent" && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className={formData.frequency === "Recurrent" ? "text-blue-600" : "text-gray-700"}>
                Recurrent
              </span>
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
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white resize-none text-gray-700 placeholder-gray-400"
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
            onClick={handleSaveExpense}
            disabled={!formData.amount || !formData.category || !formData.subcategory || !formData.paymentMode || !formData.date}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              formData.amount && formData.category && formData.subcategory && formData.paymentMode && formData.date
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Expense
          </button>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        title="Fixed Expense Added Successfully!"
        message={`Your ${formData.subcategory || formData.category} fixed expense of ₹${formData.amount} has been saved.`}
        onClose={handleSuccessClose}
      />
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronDown, Upload } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";
import Header from "../components/Header";
import SuccessPopup from "../components/SuccessPopup";

const AddExpense = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [date, setDate] = useState("");
  const [isFixedExpense, setIsFixedExpense] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [note, setNote] = useState("");
  const [customExpenseName, setCustomExpenseName] = useState("");
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

  const subcategories: Record<string, string[]> = {
    "Housing and Living Expenses": [
      "Rent",
      "Electricity Bill",
      "Water Bill", 
      "Gas Bill",
      "Household Supplies",
      "Furnishings",
      "Groceries",
      "Laundry"
    ],
    "Food and Dining": [
      "Groceries",
      "Dining Out",
      "Special Diet"
    ],
    "Academic and Educational Costs": [
      "Tuition Fees",
      "Application fees",
      "Lab fees",
      "Textbooks and Course Materials",
      "Academic Supplies",
      "Electronics"
    ],
    "Transportation": [
      "Public Transport",
      "Taxi",
      "Fuel",
      "Parking fees",
      "Maintenance",
      "Insurance",
      "Bicycles Maintenance",
      "Monthly Pass"
    ],
    "Personal": [
      "Clothing",
      "Footwear",
      "Gifts",
      "Personal Care"
    ],
    "Health Expenses": [
      "Health insurance Premium",
      "Medications",
      "Gym Membership",
      "Medical Fees",
      "Insurance Premiums"
    ],
    "Social and Entertainment": [
      "Movies",
      "Concerts",
      "Hobbies and Sports",
      "OTT Subscriptions",
      "Vacations"
    ],
    "Communication and Technology": [
      "Mobile Phone Bills",
      "Internet Bill",
      "Accessories"
    ],
    "Financial Obligations & Miscellaneous": [
      "Student loans",
      "Credit repayments",
      "EMIs",
      "Emergency Fund Savings"
    ],
    "Other Expenses": [
      "Custom Expense"
    ]
  };

  const frequencyOptions = [
    "Daily",
    "Weekly", 
    "Monthly",
    "Quarterly",
    "Yearly"
  ];

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubcategory(""); // Reset subcategory when category changes
    setCustomExpenseName(""); // Reset custom name
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expenseTitle = subcategory === "Custom Expense" ? customExpenseName : (subcategory || category);
    
    addTransaction({
      type: "expense",
      title: expenseTitle,
      category,
      subcategory: subcategory === "Custom Expense" ? customExpenseName : subcategory,
      amount: parseFloat(amount),
      date,
      note,
      isRecurring: isFixedExpense,
      paymentMethod: "UPI",
      frequency: isFixedExpense ? frequency : undefined,
    });
    
    setShowSuccessPopup(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative">
      <Header
        title="Add Expense"
        showBackButton={true}
        onBackClick={() => navigate("/")}
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-[calc(100vh-80px)]"
      >
        <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {/* Amount Input */}
          <div className="text-center py-4">
            <label className="block text-sm text-gray-600 mb-2">
              Enter Amount
            </label>
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold text-gray-900">₹</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-3xl font-bold text-center bg-transparent border-none outline-none text-gray-400 placeholder-gray-400 w-32"
                required
              />
            </div>
            <div className="w-full h-px bg-gray-200 mt-4"></div>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="block text-base font-medium text-gray-700">
              Expense Category *
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Subcategory Selection */}
            <div className="relative">
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={!category}
                required
              >
                <option value="">Select Subcategory</option>
                {category && subcategories[category]?.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Custom Expense Name - Only show when "Custom Expense" is selected */}
            {subcategory === "Custom Expense" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Custom Expense Name *
                </label>
                <input
                  type="text"
                  value={customExpenseName}
                  onChange={(e) => setCustomExpenseName(e.target.value)}
                  placeholder="Enter expense name"
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Date (Optional)
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Fixed Expense Toggle */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">Fixed Expense</h3>
                <p className="text-sm text-gray-600">Set up recurring expense</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isFixedExpense}
                  onChange={(e) => setIsFixedExpense(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => setIsFixedExpense(!isFixedExpense)}
                  className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                    isFixedExpense ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      isFixedExpense ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Frequency Selection - Only show when Fixed Expense is enabled */}
            {isFixedExpense && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Frequency *
                </label>
                <div className="relative">
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full h-10 px-3 pr-8 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                    required={isFixedExpense}
                  >
                    <option value="">Select Frequency</option>
                    {frequencyOptions.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Note Field */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              rows={3}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Upload Receipt */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-600 mb-1">
              Upload Bill or Receipt
            </p>
            <p className="text-sm text-gray-400">Tap to upload image</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 px-4 py-4 bg-white">
          <div className="flex gap-3">
            <Link
              to="/"
              className="flex-1 h-12 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 h-12 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              Save Expense
            </button>
          </div>
        </div>
      </form>

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        title="Expense Added Successfully!"
        message={`Your ${subcategory === "Custom Expense" ? customExpenseName : (subcategory || category)} expense of ₹${amount} has been recorded.${isFixedExpense ? ` Fixed expense will be auto-deducted ${frequency.toLowerCase()}.` : ''}`}
        onClose={handleSuccessClose}
      />
    </div>
  );
};

export default AddExpense;

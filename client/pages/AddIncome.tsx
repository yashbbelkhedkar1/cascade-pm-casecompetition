import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronDown, Upload } from "lucide-react";
import { useTransactions } from "../context/TransactionContext";
import Header from "../components/Header";

const AddIncome = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [date, setDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [note, setNote] = useState("");

  const categories = [
    "Employment",
    "Business",
    "Investment",
    "Financial Support",
    "Gift",
    "Freelance",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      type: "income",
      title: `${category} Income`,
      category,
      subcategory,
      amount: parseFloat(amount),
      date,
      note,
      isRecurring,
      paymentMethod: "Bank Transfer" // Default for now
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-indigo-500 px-4 py-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white touch-manipulation">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-lg font-semibold text-white">Add Income</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100vh-80px)]">
        <div className="flex-1 px-4 py-6 space-y-6">
          {/* Amount Input */}
          <div className="text-center py-4">
            <label className="block text-sm text-gray-600 mb-2">Enter Amount</label>
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
              Income Category *
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            
            <div className="relative opacity-70">
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full h-12 px-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!category}
              >
                <option value="">Select Subcategory</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">Date</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-13 px-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Fixed Income Toggle */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Fixed Income</h3>
                <p className="text-sm text-gray-600">Recurring Income</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => setIsRecurring(!isRecurring)}
                  className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                    isRecurring ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      isRecurring ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
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
            <p className="font-medium text-gray-600 mb-1">Upload Bill or Receipt</p>
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
              className="flex-1 h-12 px-4 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Save Income
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddIncome;

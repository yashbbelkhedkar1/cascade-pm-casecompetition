import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessPopup from "../components/SuccessPopup";

export default function AddGoal() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    desiredDate: "",
    icon: "🎯"
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const goalIcons = [
    "🎯", "✈️", "🏠", "🚗", "💻", "📱", "🎓", "💍", "🛡️", "🎉", "💰", "🏖️"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateGoal = () => {
    // Validate required fields
    if (!formData.name || !formData.targetAmount || !formData.desiredDate) {
      alert("Please fill all required fields");
      return;
    }

    // Here you would typically save the goal data
    console.log("Creating goal:", formData);
    
    // Navigate back to goals list
    navigate("/goals");
  };

  const handleCancel = () => {
    navigate("/goals");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-xl font-semibold">Add New Goal</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Goal Icon Selection */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">{formData.icon}</span>
          </div>
          <p className="text-gray-600 mb-4">Choose an icon for your goal</p>
          
          <div className="grid grid-cols-6 gap-3 max-w-xs mx-auto">
            {goalIcons.map((icon) => (
              <button
                key={icon}
                onClick={() => handleInputChange("icon", icon)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                  formData.icon === icon
                    ? "bg-purple-100 border-2 border-purple-500"
                    : "bg-gray-100 border-2 border-transparent hover:bg-gray-200"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Goal Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Goal Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Save for Vacation"
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Target Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">Enter the total amount you want to save</p>
          </div>

          {/* Desired Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Target Date</label>
            <input
              type="date"
              value={formData.desiredDate}
              onChange={(e) => handleInputChange("desiredDate", e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
            />
            <p className="text-gray-500 text-sm mt-2">When do you want to achieve this goal?</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="flex-1 py-4 border border-gray-200 rounded-xl font-semibold text-gray-700 bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGoal}
            disabled={!formData.name || !formData.targetAmount || !formData.desiredDate}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              formData.name && formData.targetAmount && formData.desiredDate
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Create Goal
          </button>
        </div>
      </div>
    </div>
  );
}

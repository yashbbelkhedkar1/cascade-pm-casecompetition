import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  dueDate: string;
  icon: string;
  iconBg: string;
  progressColor: string;
  status: "active" | "reached";
}

const EditGoal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Get goal data from navigation state or use default
  const existingGoal: Goal = location.state?.goal || {
    id: id || "1",
    name: "Save for Vacation",
    target: 100000,
    saved: 30000,
    dueDate: "30/12/2025",
    icon: "✈️",
    iconBg: "bg-green-100",
    progressColor: "bg-blue-600",
    status: "active"
  };

  const [formData, setFormData] = useState({
    name: existingGoal.name,
    targetAmount: existingGoal.target.toString(),
    desiredDate: existingGoal.dueDate
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateGoal = () => {
    // Validate required fields
    if (!formData.name || !formData.targetAmount || !formData.desiredDate) {
      alert("Please fill all required fields");
      return;
    }

    // Here you would typically update the goal in your state management
    console.log("Updating goal:", formData);
    
    // Navigate back to goal details
    navigate(`/goal-details/${existingGoal.id}`, { 
      state: { 
        goal: {
          ...existingGoal,
          name: formData.name,
          target: parseFloat(formData.targetAmount),
          dueDate: formData.desiredDate
        }
      }
    });
  };

  const handleCancel = () => {
    navigate(-1);
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
          
          <h1 className="text-xl font-semibold">Edit Goal</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Goal Edit Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            {/* Target/Bullseye Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-purple-600 rounded-full flex items-center justify-center relative">
              {/* Outer rings */}
              <div className="absolute inset-2 border-4 border-white rounded-full"></div>
              <div className="absolute inset-4 border-4 border-white rounded-full"></div>
              {/* Center dot */}
              <div className="w-4 h-4 bg-white rounded-full"></div>
              {/* Pencil/Edit indicator */}
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center transform rotate-45">
                <svg className="w-4 h-4 text-white transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-gray-600">Edit your financial goal</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Goal Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Goal Name</label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
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
                className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">Enter the total cost of your goal</p>
          </div>

          {/* Desired Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Desired Date</label>
            <div className="relative">
              <input
                type="text"
                value={formData.desiredDate}
                onChange={(e) => handleInputChange("desiredDate", e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg bg-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
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
            onClick={handleUpdateGoal}
            disabled={!formData.name || !formData.targetAmount || !formData.desiredDate}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
              formData.name && formData.targetAmount && formData.desiredDate
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Update Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;

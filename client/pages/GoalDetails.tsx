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

const GoalDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [addAmount, setAddAmount] = useState("");

  // Get goal data from navigation state or use default
  const goal: Goal = location.state?.goal || {
    id: id || "1",
    name: "Save for Vacation",
    target: 50000,
    saved: 30000,
    dueDate: "December 2025",
    icon: "✈️",
    iconBg: "bg-green-100",
    progressColor: "bg-blue-600",
    status: "active"
  };

  const progressPercentage = Math.round((goal.saved / goal.target) * 100);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const handleAddAmount = () => {
    if (addAmount && parseFloat(addAmount) > 0) {
      // Here you would typically update the goal in your state management
      console.log(`Adding ₹${addAmount} to ${goal.name}`);
      setAddAmount("");
      // You could navigate back or show a success message
    }
  };

  const handleEditGoal = () => {
    navigate(`/edit-goal/${goal.id}`, { state: { goal } });
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
          
          <h1 className="text-xl font-semibold">Goal Details</h1>
          
          <button
            onClick={handleEditGoal}
            className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Goal Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white">{goal.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{goal.name}</h2>
          <p className="text-gray-600">Target: {goal.dueDate}</p>
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#3b82f6"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{progressPercentage}%</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600 mb-2">Goal Progress</p>
        </div>

        {/* Saved vs Target */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Saved</p>
              <p className="text-2xl font-bold text-gray-900">₹ {goal.saved.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Target</p>
              <p className="text-2xl font-bold text-gray-900">₹ {goal.target.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Add to Goal Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Add to Goal</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          <button
            onClick={handleAddAmount}
            disabled={!addAmount || parseFloat(addAmount) <= 0}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              addAmount && parseFloat(addAmount) > 0
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;

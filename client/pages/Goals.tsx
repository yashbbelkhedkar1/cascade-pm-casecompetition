import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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

const Goals = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "reached">("active");

  const goals: Goal[] = [
    {
      id: "1",
      name: "Save for Vacation",
      target: 50000,
      saved: 30000,
      dueDate: "Dec 2025",
      icon: "✈️",
      iconBg: "bg-blue-100",
      progressColor: "bg-blue-600",
      status: "active"
    },
    {
      id: "2", 
      name: "Emergency Fund",
      target: 100000,
      saved: 42000,
      dueDate: "Nov 2025",
      icon: "🛡️",
      iconBg: "bg-green-100", 
      progressColor: "bg-green-600",
      status: "active"
    },
    {
      id: "3",
      name: "New Laptop",
      target: 25000,
      saved: 8500,
      dueDate: "Mar 2026", 
      icon: "💻",
      iconBg: "bg-purple-100",
      progressColor: "bg-purple-600",
      status: "active"
    }
  ];

  const activeGoals = goals.filter(goal => goal.status === "active");
  const reachedGoals = goals.filter(goal => goal.status === "reached");

  const getProgressPercentage = (saved: number, target: number) => {
    return Math.round((saved / target) * 100);
  };

  const handleGoalClick = (goal: Goal) => {
    navigate(`/goal-details/${goal.id}`, { state: { goal } });
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header with purple background */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600">
        <Header 
          title="Goals" 
          rightContent={
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          }
        />
        
        {/* Tab Navigation */}
        <div className="px-4 pb-4">
          <div className="flex bg-white bg-opacity-20 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === "active"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-white"
              }`}
            >
              Active Goals
            </button>
            <button
              onClick={() => setActiveTab("reached")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === "reached"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-white"
              }`}
            >
              Reached Goals
            </button>
          </div>
        </div>
      </div>

      {/* Goals Content */}
      <div className="px-4 py-6 pb-20">
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => handleGoalClick(goal)}
                className="bg-white rounded-2xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${goal.iconBg} rounded-full flex items-center justify-center mr-3`}>
                      <span className="text-xl">{goal.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{goal.name}</h3>
                      <p className="text-gray-600 text-sm">Target: ₹{goal.target.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">₹ {goal.saved.toLocaleString()} / ₹ {goal.target.toLocaleString()}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${goal.progressColor}`}
                      style={{ width: `${getProgressPercentage(goal.saved, goal.target)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">{getProgressPercentage(goal.saved, goal.target)}% completed</span>
                    <span className="text-sm text-gray-600">Due: {goal.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reached" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Goals Reached Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Keep working on your active goals to see them here!
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/add-goal")}
        className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default Goals;

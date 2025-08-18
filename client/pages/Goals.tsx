import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";

const Goals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Goals" />

      <div className="px-4 py-6 pb-20">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Financial Goals
          </h2>
          <p className="text-gray-600 mb-6">
            Set and track your savings goals to achieve your dreams.
          </p>
          <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-600 transition-colors">
            Add Your First Goal
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Goals;

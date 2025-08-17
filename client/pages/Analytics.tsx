import BottomNavigation from "../components/BottomNavigation";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        </div>
      </div>

      <div className="px-4 py-6 pb-20">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Spending Analytics</h2>
          <p className="text-gray-600 mb-6">Get insights into your spending patterns and financial habits.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            View Reports
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Analytics;

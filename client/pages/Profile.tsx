import BottomNavigation from "../components/BottomNavigation";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="px-4 py-6 pb-20">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">J</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h2>
          <p className="text-gray-600 mb-6">Manage your account settings and preferences.</p>
          <button className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;

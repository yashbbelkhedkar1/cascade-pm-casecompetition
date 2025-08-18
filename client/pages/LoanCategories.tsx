import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function LoanCategories() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "education",
      name: "Education Loan",
      description: "Study abroad & domestic education",
      rateFrom: "9.5%",
      offers: 15,
      icon: "🎓",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "skill",
      name: "Skill Development",
      description: "Courses & training programs",
      rateFrom: "8.9%",
      offers: 12,
      icon: "💻",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "personal",
      name: "Personal Loan",
      description: "For personal expenses & needs",
      rateFrom: "10.5%",
      offers: 25,
      icon: "👤",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "government",
      name: "Government Loan",
      description: "Subsidized & government schemes",
      rateFrom: "7.5%",
      offers: 8,
      icon: "🏛️",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "other",
      name: "Other Loans",
      description: "Business, home & vehicle loans",
      rateFrom: "9.0%",
      offers: 18,
      icon: "⋯",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "education") {
      navigate("/education-loans");
    } else {
      // For other categories, show a placeholder or implement similar pages
      navigate(`/loans/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Loan Categories"
        rightContent={
          <button className="p-2">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5"
              />
            </svg>
          </button>
        }
      />

      <div className="p-4">
        {/* Browse Categories Header */}
        <h2 className="text-lg font-semibold mb-6 text-gray-900">
          Browse Categories
        </h2>

        {/* Categories List */}
        <div className="space-y-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="w-full bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div
                    className={`w-14 h-14 ${category.bgColor} rounded-xl flex items-center justify-center mr-4`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">
                        <span className="text-purple-600 font-medium">
                          From {category.rateFrom}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500">
                        • {category.offers} offers
                      </span>
                    </div>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 ml-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Special Offers */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Special Offers</h3>
          <div className="flex gap-4 overflow-x-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white min-w-[280px]">
              <h4 className="text-lg font-semibold mb-1">
                Education Loan at 6.5%
              </h4>
              <p className="text-purple-100 text-sm mb-3">
                Special rate for engineering students
              </p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm">
                Apply Now
              </button>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-4 text-white min-w-[280px]">
              <h4 className="text-lg font-semibold mb-1">Skill Development</h4>
              <p className="text-green-100 text-sm mb-3">
                0% interest for first 6 months
              </p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => navigate("/loan-management")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/loan-categories")}
            className="flex flex-col items-center py-2 px-3 text-blue-600"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span className="text-xs">Categories</span>
          </button>
          <button
            onClick={() => navigate("/add-loan")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-xs">Add Loan</span>
          </button>
          <button
            onClick={() => navigate("/loan-history")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg
              className="w-5 h-5 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}

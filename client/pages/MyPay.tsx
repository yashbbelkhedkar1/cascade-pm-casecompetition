import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function MyPay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header with Back Button */}
      <div className="flex items-center p-4">
        <button onClick={() => navigate("/")} className="mr-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-6 pb-6">
        {/* Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">MyPay</h1>
      <p className="text-gray-600 text-center mb-12">Choose a screen to explore</p>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => navigate("/kyc")}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <span className="text-2xl">🔒</span>
          View KYC Screen
        </button>

        <button
          onClick={() => navigate("/upi")}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-green-700 transition-colors"
        >
          <span className="text-2xl">💳</span>
          View UPI Screen
        </button>
      </div>

      {/* Footer */}
      <div className="mt-16 flex items-center gap-2 text-gray-500 text-sm">
        <span className="text-lg">✨</span>
        <span>Experience modern fintech design with seamless animations</span>
      </div>
      </div>
    </div>
  );
}

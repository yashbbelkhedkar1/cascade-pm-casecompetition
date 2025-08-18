import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BiometricSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("enable");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [authenticationStatus, setAuthenticationStatus] = useState("");

  if (currentStep === "enable") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg relative">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">Enable biometric authentication?</h1>
        <p className="text-gray-600 text-center mb-12 px-4">
          Use your fingerprint or face to quickly and securely access your account
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => setCurrentStep("choose")}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Yes, Enable Biometric
          </button>

          <button
            onClick={() => navigate("/pin-entry")}
            className="w-full bg-white border border-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            No, Use PIN Instead
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm px-4">
            You can change this setting later in security preferences
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === "choose") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="flex items-center p-6">
          <button onClick={() => setCurrentStep("enable")}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">Choose your preferred method</h1>
          <p className="text-gray-600 text-center mb-12">Select how you'd like to authenticate</p>

          {/* Method Options */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => setSelectedMethod("face")}
              className={`w-full p-6 rounded-2xl border-2 transition-all ${
                selectedMethod === "face"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">Face ID</h3>
                  <p className="text-gray-500">Use your face to unlock</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedMethod("fingerprint")}
              className={`w-full p-6 rounded-2xl border-2 transition-all ${
                selectedMethod === "fingerprint"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">Fingerprint</h3>
                  <p className="text-gray-500">Use your fingerprint to unlock</p>
                </div>
              </div>
            </button>
          </div>

          {/* Setup Button */}
          <button
            onClick={() => setCurrentStep("authenticate")}
            disabled={!selectedMethod}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
              selectedMethod
                ? "bg-gray-800 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Set Up Biometric
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === "authenticate") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="flex items-center p-6">
          <button onClick={() => setCurrentStep("choose")}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 flex flex-col items-center justify-center min-h-[80vh]">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">Welcome back</h1>
          <p className="text-gray-600 text-center mb-12">
            Use {selectedMethod === "face" ? "Face ID" : "Fingerprint"} to access your account
          </p>

          {/* Biometric Icon */}
          <div className="mb-8">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
              selectedMethod === "face" 
                ? "bg-gradient-to-br from-blue-400 to-cyan-400" 
                : "bg-gradient-to-br from-purple-500 to-blue-500"
            }`}>
              {selectedMethod === "face" ? (
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              )}
            </div>
          </div>

          {/* Authentication Status */}
          {authenticationStatus === "failed" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-center text-red-800">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {selectedMethod === "face" ? "Face" : "Fingerprint"} authentication failed
            </div>
          )}

          {/* Action Buttons */}
          <div className="w-full max-w-sm space-y-4">
            <button
              onClick={() => {
                // Simulate authentication failure for demo
                setAuthenticationStatus("failed");
                setTimeout(() => setAuthenticationStatus(""), 3000);
              }}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all ${
                selectedMethod === "face"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              Use {selectedMethod === "face" ? "Face ID" : "Fingerprint"}
            </button>

            <div className="text-center text-gray-500 text-sm">or</div>

            <button
              onClick={() => navigate("/pin-entry")}
              className="w-full bg-white border border-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Use PIN Instead
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Having trouble? <button className="text-blue-600 underline">Contact support</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

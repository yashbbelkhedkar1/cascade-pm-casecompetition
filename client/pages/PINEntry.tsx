import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PINEntry() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const maxPinLength = 6;

  const handleNumberClick = (num: string) => {
    if (pin.length < maxPinLength) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === maxPinLength) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  useEffect(() => {
    if (pin.length === maxPinLength) {
      handleSubmit();
    }
  }, [pin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center p-6">
        <button onClick={() => navigate(-1)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="ml-4 text-lg font-semibold">Enter PIN</h2>
      </div>

      <div className="px-6 pb-6 flex flex-col items-center justify-center min-h-[80vh]">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-3">Enter your PIN</h1>
        <p className="text-gray-600 text-center mb-12">Enter your PIN to access your account</p>

        {/* PIN Dots */}
        <div className="flex gap-4 mb-12">
          {[...Array(maxPinLength)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                index < pin.length
                  ? isSuccess
                    ? "bg-green-500"
                    : "bg-green-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-6 max-w-xs w-full mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="w-20 h-20 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-2xl font-semibold text-gray-900 hover:bg-gray-50 active:scale-95"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex items-center gap-6 max-w-xs w-full">
          <div className="w-20 h-20"></div> {/* Spacer */}
          
          <button
            onClick={() => handleNumberClick("0")}
            className="w-20 h-20 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-2xl font-semibold text-gray-900 hover:bg-gray-50 active:scale-95"
          >
            0
          </button>

          {pin.length === maxPinLength ? (
            <button
              onClick={handleSubmit}
              className="w-20 h-20 bg-green-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white active:scale-95"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleBackspace}
              disabled={pin.length === 0}
              className={`w-20 h-20 rounded-2xl transition-all duration-200 flex items-center justify-center ${
                pin.length === 0
                  ? "bg-gray-100 text-gray-300"
                  : "bg-white shadow-sm hover:shadow-md text-gray-600 hover:bg-gray-50 active:scale-95"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
            </button>
          )}
        </div>

        {/* Success Animation */}
        {isSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900">Access Granted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

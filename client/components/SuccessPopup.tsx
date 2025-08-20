import { useEffect } from "react";

interface SuccessPopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  autoCloseDelay?: number; // in milliseconds, default 3000
}

export default function SuccessPopup({ 
  isOpen, 
  title, 
  message, 
  onClose, 
  autoCloseDelay = 3000 
}: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Popup Content */}
        <div 
          className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Icon */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            
            <p className="text-gray-600 text-sm">
              {message}
            </p>
          </div>

          {/* OK Button */}
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
}

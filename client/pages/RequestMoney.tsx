import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RequestMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [selectedContact, setSelectedContact] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="text-lg font-semibold">Request Money</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Contact</label>
          <select
            value={selectedContact}
            onChange={(e) => setSelectedContact(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Choose a contact</option>
            <option value="john">John Doe</option>
            <option value="sarah">Sarah Wilson</option>
            <option value="mike">Mike Johnson</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to request"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why are you requesting money?"
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none bg-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 bg-white"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium">
            Request ₹{amount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}

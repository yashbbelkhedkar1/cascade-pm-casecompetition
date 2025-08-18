import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("manual");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");

  const contacts = [
    { name: "John Doe", upi: "john@paytm", last: "2 days ago", color: "bg-blue-500" },
    { name: "Sarah Wilson", upi: "sarah@gpay", last: "1 week ago", color: "bg-pink-500" },
    { name: "Mike Johnson", upi: "mike@phonepe", last: "2 weeks ago", color: "bg-blue-500" },
  ];

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
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-lg font-semibold">Send Money</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("manual")}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "manual" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "contacts" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
          >
            From Contacts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {activeTab === "manual" ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Recipient UPI ID or Phone</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter UPI ID or phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Note (Optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center text-white font-medium mr-4`}>
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.upi}</p>
                    <p className="text-xs text-gray-400">Last paid: {contact.last}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 bg-white"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium">
            Send ₹{amount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}

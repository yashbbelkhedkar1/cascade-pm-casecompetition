import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UPIScreen() {
  const navigate = useNavigate();
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [showRequestMoney, setShowRequestMoney] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  if (showSendMoney) {
    return <SendMoneyModal onClose={() => setShowSendMoney(false)} />;
  }

  if (showRequestMoney) {
    return <RequestMoneyModal onClose={() => setShowRequestMoney(false)} />;
  }

  if (showContacts) {
    return <RecentContactsModal onClose={() => setShowContacts(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="relative">
          <button className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
            </svg>
          </button>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">3</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1">My UPI</h1>
        <p className="text-gray-600 mb-8">Quick payments made easy</p>

        {/* UPI ID Card */}
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl p-6 mb-8 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Your UPI ID</p>
              <p className="text-xl font-semibold">aswani@mypay</p>
            </div>
            <button className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => setShowSendMoney(true)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Send Money</h3>
            <p className="text-gray-500 text-sm">UPI ID, Phone, QR</p>
          </button>

          <button 
            onClick={() => setShowRequestMoney(true)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Request Money</h3>
            <p className="text-gray-500 text-sm">From contacts</p>
          </button>

          <button className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Scan &amp; Pay</h3>
            <p className="text-gray-500 text-sm">Camera QR scan</p>
          </button>

          <button className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">My QR Code</h3>
            <p className="text-gray-500 text-sm">Show &amp; share</p>
          </button>
        </div>

        {/* Recent Contacts */}
        <button 
          onClick={() => setShowContacts(true)}
          className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center"
        >
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Recent Contacts</h3>
            <p className="text-gray-500 text-sm">Quick access to frequent payees</p>
          </div>
          <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SendMoneyModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("manual");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-semibold">Send Money</span>
          </div>
          <button onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
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

        {/* Content */}
        <div className="p-4 space-y-4">
          {activeTab === "manual" ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Recipient UPI ID or Phone</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter UPI ID or phone number"
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Note (Optional)</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note"
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          ) : (
            <div className="space-y-3">
              {[
                { name: "John Doe", upi: "john@paytm", last: "2 days ago", color: "bg-blue-500" },
                { name: "Sarah Wilson", upi: "sarah@gpay", last: "1 week ago", color: "bg-pink-500" },
                { name: "Mike Johnson", upi: "mike@phonepe", last: "2 weeks ago", color: "bg-blue-500" },
              ].map((contact, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className={`w-10 h-10 ${contact.color} rounded-full flex items-center justify-center text-white font-medium mr-3`}>
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.upi}</p>
                    <p className="text-xs text-gray-400">Last paid: {contact.last}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700"
            >
              Cancel
            </button>
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium">
              Send ₹{amount || 0}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestMoneyModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [selectedContact, setSelectedContact] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <span className="font-semibold">Request Money</span>
          </div>
          <button onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Contact</label>
            <select
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
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
              className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you requesting money?"
              rows={3}
              className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700"
            >
              Cancel
            </button>
            <button className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium">
              Request ₹{amount || 0}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentContactsModal({ onClose }: { onClose: () => void }) {
  const contacts = [
    { name: "John Doe", upi: "john@paytm", last: "2 days ago", color: "bg-blue-500" },
    { name: "Sarah Wilson", upi: "sarah@gpay", last: "1 week ago", color: "bg-pink-500" },
    { name: "Mike Johnson", upi: "mike@phonepe", last: "2 weeks ago", color: "bg-blue-500" },
    { name: "Emma Davis", upi: "emma@paytm", last: "3 weeks ago", color: "bg-purple-500" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-semibold">Recent Contacts</span>
          </div>
          <button onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
              <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center text-white font-medium mr-4`}>
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.upi}</p>
                <p className="text-xs text-gray-400">Last paid: {contact.last}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

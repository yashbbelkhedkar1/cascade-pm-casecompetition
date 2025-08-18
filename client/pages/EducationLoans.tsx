import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoanOffer {
  id: string;
  bank: string;
  logo: string;
  type: string;
  interestRate: string;
  maxAmount: string;
  processingFee: string;
  tenure: string;
  featured?: boolean;
}

export default function EducationLoans() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("rate");
  const [searchQuery, setSearchQuery] = useState("");

  const loanOffers: LoanOffer[] = [
    {
      id: "1",
      bank: "HDFC Bank",
      logo: "HDFC",
      type: "Education Loan",
      interestRate: "9.5% p.a.",
      maxAmount: "₹20 Lakhs",
      processingFee: "₹5,000",
      tenure: "15 Years"
    },
    {
      id: "2", 
      bank: "State Bank of India",
      logo: "SBI",
      type: "Student Loan",
      interestRate: "8.85% p.a.",
      maxAmount: "₹30 Lakhs",
      processingFee: "₹10,000",
      tenure: "20 Years"
    },
    {
      id: "3",
      bank: "Axis Bank", 
      logo: "AXIS",
      type: "Education Loan",
      interestRate: "9.15% p.a.",
      maxAmount: "₹75 Lakhs",
      processingFee: "₹7,500",
      tenure: "18 Years"
    }
  ];

  const featuredOffer = {
    title: "Special Education Loan",
    description: "Get up to ₹50L at lowest rates",
    rate: "8.5% p.a.",
    badge: "LIMITED TIME"
  };

  const filteredOffers = loanOffers.filter(offer =>
    offer.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Education Loans</h1>
          </div>
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search banks or loan types"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Featured Offer */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">FEATURED OFFERS</h3>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {featuredOffer.badge}
              </div>
            </div>
            <h4 className="text-lg font-semibold mb-1">{featuredOffer.title}</h4>
            <p className="text-blue-100 text-sm mb-2">{featuredOffer.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{featuredOffer.rate}</span>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm">
                View
              </button>
            </div>
          </div>
        </div>

        {/* Sort Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            ALL LOANS ({filteredOffers.length})
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white text-blue-600"
            >
              <option value="rate">Rate</option>
              <option value="amount">Amount</option>
              <option value="tenure">Tenure</option>
            </select>
          </div>
        </div>

        {/* Loan Offers List */}
        <div className="space-y-4 pb-20">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xs font-bold text-gray-600">{offer.logo}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{offer.bank}</h4>
                    <p className="text-sm text-gray-600">{offer.type}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                  <p className="font-semibold text-green-600">{offer.interestRate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Max Amount</p>
                  <p className="font-semibold text-gray-900">{offer.maxAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Processing Fee</p>
                  <p className="font-semibold text-gray-900">{offer.processingFee}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tenure</p>
                  <p className="font-semibold text-gray-900">{offer.tenure}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium">
                  Apply Now
                </button>
                <button className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate("/loan-management")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button 
            onClick={() => navigate("/loan-categories")}
            className="flex flex-col items-center py-2 px-3 text-blue-600"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-xs">Categories</span>
          </button>
          <button 
            onClick={() => navigate("/add-loan")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xs">Add Loan</span>
          </button>
          <button 
            onClick={() => navigate("/loan-history")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}

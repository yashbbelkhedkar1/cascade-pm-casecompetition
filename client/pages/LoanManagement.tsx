import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function LoanManagement() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("2024-01-15");

  // Sample data
  const loanStats = {
    totalLoans: 8,
    monthlyEMI: 15000,
    paidEMIs: 24,
    unpaidEMIs: 3
  };

  const loans = [
    {
      id: "1",
      bank: "HDFC Bank",
      type: "Home Loan",
      emiAmount: 45000,
      dueDate: "15 Jan",
      status: "Paid"
    },
    {
      id: "2", 
      bank: "HDFC Bank",
      type: "Home Loan",
      emiAmount: 45000,
      dueDate: "15 Jan",
      status: "Paid"
    }
  ];

  const calendar = [
    { date: 1, status: "" },
    { date: 2, status: "" },
    { date: 3, status: "paid" },
    { date: 4, status: "" },
    { date: 5, status: "paid" },
    { date: 6, status: "" },
    { date: 7, status: "" },
    { date: 8, status: "" },
    { date: 9, status: "" },
    { date: 10, status: "" },
    { date: 11, status: "" },
    { date: 12, status: "unpaid" },
    { date: 13, status: "" },
    { date: 14, status: "" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Loan Management"
        rightContent={
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 0-15 0v5" />
            </svg>
          </button>
        }
      />

      <div className="p-4 space-y-6">
        {/* Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between">
          <span className="text-gray-600">Filter by date</span>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <button className="p-2 bg-blue-600 text-white rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100 text-sm">Total Loans</span>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.79 4 8.5 4s8.5-1.79 8.5-4V7M4 7c0 2.21 3.79 4 8.5 4s8.5-1.79 8.5-4M4 7c0-2.21 3.79-4 8.5-4s8.5 1.79 8.5 4" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold">{loanStats.totalLoans}</p>
          </div>

          <div className="bg-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100 text-sm">Monthly EMI</span>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold">₹{(loanStats.monthlyEMI / 1000)}K</p>
          </div>

          <div className="bg-orange-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-100 text-sm">Paid EMIs</span>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold">{loanStats.paidEMIs}</p>
          </div>

          <div className="bg-red-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-100 text-sm">Unpaid EMIs</span>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold">{loanStats.unpaidEMIs}</p>
          </div>
        </div>

        {/* Payment Calendar */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Payment Calendar</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
              <div key={idx} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendar.map((day, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                  day.status === "paid"
                    ? "bg-green-100 text-green-600"
                    : day.status === "unpaid"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {day.date}
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Special Offers</h3>
          <div className="flex gap-4 overflow-x-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white min-w-[280px]">
              <h4 className="text-lg font-semibold mb-1">Education Loan at 6.5%</h4>
              <p className="text-purple-100 text-sm mb-3">Special rate for engineering students</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm">
                Apply Now
              </button>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-4 text-white min-w-[280px]">
              <h4 className="text-lg font-semibold mb-1">Skill Development</h4>
              <p className="text-green-100 text-sm mb-3">0% interest for first 6 months</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Your Loans */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Loans</h3>
            <button 
              onClick={() => navigate("/my-loans")}
              className="text-blue-600 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {loans.map((loan) => (
              <div key={loan.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{loan.bank}</h4>
                      <p className="text-sm text-gray-600">{loan.type}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {loan.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">EMI Amount</p>
                    <p className="font-semibold">₹{loan.emiAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Due Date</p>
                    <p className="font-semibold">{loan.dueDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button 
            onClick={() => navigate("/loan-management")}
            className="flex flex-col items-center py-2 px-3 text-blue-600"
          >
            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button 
            onClick={() => navigate("/loan-categories")}
            className="flex flex-col items-center py-2 px-3 text-gray-400"
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

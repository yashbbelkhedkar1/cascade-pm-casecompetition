import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  X,
  Calendar,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import Header from "../components/Header";
import { useTransactions, DateFilter, FilterOptions } from "../context/TransactionContext";

const IncomeHistory = () => {
  const navigate = useNavigate();
  const { getFilteredTransactions, getTotalByDateFilter } = useTransactions();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("monthly");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" });

  // Income category options based on user requirements
  const incomeCategories = [
    "Allowance and Financial Support",
    "Employment Income",
    "Business and Entrepreneurial Income", 
    "Financial Investments and Passive Income",
    "Government and Institutional Aid",
    "Miscellaneous Income",
    "Other Income Sources"
  ];

  const subcategoriesByCategory = {
    "Allowance and Financial Support": ["Parental Allowance", "Family Support", "Scholarships and Grants", "Stipends"],
    "Employment Income": ["Part-time Jobs", "Internships (Paid)", "Freelancing", "Gig Income"],
    "Business and Entrepreneurial Income": ["Campus-based Businesses", "Online Selling", "Tutoring or Coaching"],
    "Financial Investments and Passive Income": ["Dividends", "Interest"],
    "Government and Institutional Aid": ["Subsidies or Benefits"],
    "Miscellaneous Income": ["Rebates and Cashback", "Refunds"],
    "Other Income Sources": ["Custom"]
  };

  // Build filter options
  const filterOptions: Partial<FilterOptions> = {
    searchQuery: searchQuery || undefined,
    category: selectedCategory || undefined,
    dateFilter,
    customDateRange: dateFilter === "custom" && customDateRange.start && customDateRange.end ? customDateRange : undefined,
    sortBy,
    sortOrder,
  };

  // Get filtered transactions
  const filteredIncome = useMemo(() => {
    return getFilteredTransactions("income", filterOptions);
  }, [getFilteredTransactions, filterOptions]);

  // Get total for current filter
  const totalIncome = useMemo(() => {
    return getTotalByDateFilter("income", dateFilter, filterOptions.customDateRange);
  }, [getTotalByDateFilter, dateFilter, filterOptions.customDateRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setDateFilter("monthly");
    setSortBy("date");
    setSortOrder("desc");
    setCustomDateRange({ start: "", end: "" });
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    dateFilter !== "monthly",
    sortBy !== "date" || sortOrder !== "desc"
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      <Header
        title="Income History"
        showBackButton={true}
        onBackClick={() => navigate("/")}
        rightContent={
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="relative p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        }
      />

      <div className="px-4 pb-20">
        {/* Search Bar */}
        <div className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search income by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg border p-4 mb-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filters & Sorting</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Clear All
              </button>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Today</option>
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
                <option value="custom">Custom Period</option>
              </select>
            </div>

            {/* Custom Date Range */}
            {dateFilter === "custom" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {incomeCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sorting Options */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="desc">
                    {sortBy === "date" ? "Newest → Oldest" : "High → Low"}
                  </option>
                  <option value="asc">
                    {sortBy === "date" ? "Oldest → Newest" : "Low → High"}
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {dateFilter === "daily" ? "Today" : 
                 dateFilter === "weekly" ? "This Week" : 
                 dateFilter === "monthly" ? "This Month" : "Custom Period"}
              </p>
              <p className="text-lg font-semibold text-green-600">
                {filteredIncome.length} transactions
              </p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredIncome.map((income) => (
            <div
              key={income.id}
              className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <span className="text-green-600 font-semibold text-sm">₹</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {income.title}
                      </h3>
                      <p className="text-sm text-gray-600">{income.category}</p>
                      {income.subcategory && (
                        <p className="text-xs text-gray-500">• {income.subcategory}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        ₹{income.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(income.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {income.paymentMethod && (
                    <p className="text-xs text-gray-400 mb-1">
                      {income.paymentMethod}
                    </p>
                  )}
                  
                  {income.note && (
                    <p className="text-sm text-gray-600">
                      {income.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIncome.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No income found</p>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeHistory;

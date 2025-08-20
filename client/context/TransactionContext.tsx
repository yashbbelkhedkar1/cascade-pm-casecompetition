import { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
  id: string;
  type: "income" | "expense";
  title: string;
  category: string;
  subcategory?: string;
  amount: number;
  date: string;
  paymentMethod?: string;
  note?: string;
  isRecurring: boolean;
  iconName?: string;
}

export type DateFilter = "daily" | "weekly" | "monthly" | "custom";
export type SortBy = "date" | "amount";
export type SortOrder = "asc" | "desc";

export interface FilterOptions {
  dateFilter: DateFilter;
  customDateRange?: { start: string; end: string };
  category?: string;
  subcategory?: string;
  searchQuery?: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

interface TransactionContextType {
  transactions: Transaction[];
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  getRecentTransactions: (type: "income" | "expense", limit?: number) => Transaction[];
  getFilteredTransactions: (type: "income" | "expense", filters: Partial<FilterOptions>) => Transaction[];
  getTotalByDateFilter: (type: "income" | "expense", dateFilter: DateFilter, customRange?: { start: string; end: string }) => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Date utility functions
const getDateRangeForFilter = (filter: DateFilter, customRange?: { start: string; end: string }) => {
  const now = new Date();
  let startDate: Date;
  let endDate = new Date(now);

  switch (filter) {
    case "daily":
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "weekly":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      break;
    case "monthly":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "custom":
      if (customRange) {
        startDate = new Date(customRange.start);
        endDate = new Date(customRange.end);
      } else {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return { startDate, endDate };
};

const isDateInRange = (date: string, startDate: Date, endDate: Date) => {
  const transactionDate = new Date(date);
  return transactionDate >= startDate && transactionDate <= endDate;
};

// Sample initial data
const initialTransactions: Transaction[] = [
  // Recent Income
  {
    id: "inc-1",
    type: "income",
    title: "Part-time Job",
    category: "Employment Income",
    subcategory: "Part-time Jobs",
    amount: 850.00,
    date: "2024-12-15",
    paymentMethod: "Bank Transfer",
    note: "Monthly part-time salary",
    isRecurring: true,
  },
  {
    id: "inc-2",
    type: "income",
    title: "Monthly Allowance",
    category: "Allowance and Financial Support",
    subcategory: "Parental Allowance",
    amount: 500.00,
    date: "2024-12-10",
    paymentMethod: "Cash",
    note: "Monthly allowance from parents",
    isRecurring: true,
  },
  {
    id: "inc-3",
    type: "income",
    title: "Stock Dividend",
    category: "Financial Investments and Passive Income",
    subcategory: "Dividends",
    amount: 125.50,
    date: "2024-12-08",
    paymentMethod: "Bank Transfer",
    note: "Quarterly dividend payment",
    isRecurring: false,
  },
  {
    id: "inc-4",
    type: "income",
    title: "Freelance Project",
    category: "Employment Income",
    subcategory: "Freelancing",
    amount: 1200.00,
    date: "2024-12-05",
    paymentMethod: "UPI",
    note: "Web development project",
    isRecurring: false,
  },
  {
    id: "inc-5",
    type: "income",
    title: "Tutoring",
    category: "Business and Entrepreneurial Income",
    subcategory: "Tutoring or Coaching",
    amount: 300.00,
    date: "2024-12-03",
    paymentMethod: "Cash",
    note: "Math tutoring session",
    isRecurring: false,
  },
  // Recent Expenses
  {
    id: "exp-1",
    type: "expense",
    title: "Restaurant Dinner",
    category: "Food and Dining",
    subcategory: "Dining Out",
    amount: 450.00,
    date: "2024-12-15",
    paymentMethod: "UPI",
    note: "Dinner with friends",
    isRecurring: false,
  },
  {
    id: "exp-2",
    type: "expense",
    title: "Bus Pass",
    category: "Transportation",
    subcategory: "Public Transport",
    amount: 150.00,
    date: "2024-12-14",
    paymentMethod: "UPI",
    note: "Monthly bus pass",
    isRecurring: true,
  },
  {
    id: "exp-3",
    type: "expense",
    title: "Textbook",
    category: "Academic and Educational Costs",
    subcategory: "Textbooks and Course Materials",
    amount: 890.00,
    date: "2024-12-12",
    paymentMethod: "UPI",
    note: "Computer Science textbook",
    isRecurring: false,
  },
  {
    id: "exp-4",
    type: "expense",
    title: "Grocery Shopping",
    category: "Food and Dining",
    subcategory: "Groceries",
    amount: 650.00,
    date: "2024-12-10",
    paymentMethod: "Cash",
    note: "Weekly groceries",
    isRecurring: false,
  },
  {
    id: "exp-5",
    type: "expense",
    title: "Monthly Rent",
    category: "Housing and Living Expenses",
    subcategory: "Rent",
    amount: 5000.00,
    date: "2024-12-01",
    paymentMethod: "Bank Transfer",
    note: "Room rent",
    isRecurring: true,
  },
  {
    id: "exp-6",
    type: "expense",
    title: "Phone Bill",
    category: "Communication and Technology",
    subcategory: "Mobile Phone Bills",
    amount: 299.00,
    date: "2024-12-01",
    paymentMethod: "UPI",
    note: "Monthly mobile plan",
    isRecurring: true,
  },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `${transaction.type}-${Date.now()}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getRecentTransactions = (type: "income" | "expense", limit = 5) => {
    return transactions
      .filter(t => t.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  const getFilteredTransactions = (type: "income" | "expense", filters: Partial<FilterOptions>) => {
    let filtered = transactions.filter(t => t.type === type);

    // Date filtering
    if (filters.dateFilter) {
      const { startDate, endDate } = getDateRangeForFilter(filters.dateFilter, filters.customDateRange);
      filtered = filtered.filter(t => isDateInRange(t.date, startDate, endDate));
    }

    // Category filtering
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Subcategory filtering
    if (filters.subcategory) {
      filtered = filtered.filter(t => t.subcategory === filters.subcategory);
    }

    // Search query filtering
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        (t.subcategory && t.subcategory.toLowerCase().includes(query)) ||
        (t.note && t.note.toLowerCase().includes(query))
      );
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (filters.sortBy === "date") {
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
        } else if (filters.sortBy === "amount") {
          aValue = a.amount;
          bValue = b.amount;
        }

        if (filters.sortOrder === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    return filtered;
  };

  const getTotalByDateFilter = (type: "income" | "expense", dateFilter: DateFilter, customRange?: { start: string; end: string }) => {
    const { startDate, endDate } = getDateRangeForFilter(dateFilter, customRange);
    return transactions
      .filter(t => t.type === type && isDateInRange(t.date, startDate, endDate))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const value = {
    transactions,
    balance,
    totalIncome,
    totalExpenses,
    addTransaction,
    deleteTransaction,
    getRecentTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}

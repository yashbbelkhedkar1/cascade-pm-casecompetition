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

interface TransactionContextType {
  transactions: Transaction[];
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  getRecentTransactions: (type: "income" | "expense", limit?: number) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Sample initial data
const initialTransactions: Transaction[] = [
  // Income
  {
    id: "inc-1",
    type: "income",
    title: "Part-time Job",
    category: "Employment",
    amount: 850.00,
    date: "2024-01-15",
    paymentMethod: "Bank Transfer",
    note: "Monthly part-time salary",
    isRecurring: true,
  },
  {
    id: "inc-2",
    type: "income",
    title: "Monthly Allowance",
    category: "Financial Support",
    amount: 500.00,
    date: "2024-01-10",
    paymentMethod: "Cash",
    note: "Monthly allowance from parents",
    isRecurring: true,
  },
  {
    id: "inc-3",
    type: "income",
    title: "Investment Returns",
    category: "Investments",
    amount: 125.50,
    date: "2024-01-08",
    paymentMethod: "Bank Transfer",
    note: "Stock dividends",
    isRecurring: false,
  },
  // Expenses
  {
    id: "exp-1",
    type: "expense",
    title: "Lunch at Cafe",
    category: "Food & Dining",
    amount: 25.50,
    date: "2024-01-15",
    paymentMethod: "UPI",
    note: "Lunch with friends",
    isRecurring: false,
  },
  {
    id: "exp-2",
    type: "expense",
    title: "Bus Ticket",
    category: "Transportation",
    amount: 5.00,
    date: "2024-01-14",
    paymentMethod: "Cash",
    note: "Daily commute",
    isRecurring: false,
  },
  {
    id: "exp-3",
    type: "expense",
    title: "Textbook",
    category: "Academic",
    amount: 89.99,
    date: "2024-01-12",
    paymentMethod: "UPI",
    note: "Course material",
    isRecurring: false,
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

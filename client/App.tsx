import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";
import ExpenseHistory from "./pages/ExpenseHistory";
import IncomeHistory from "./pages/IncomeHistory";
import Goals from "./pages/Goals";
import Analytics from "./pages/Analytics";
import SpendingAnalysis from "./pages/SpendingAnalysis";
import CashflowAnalysis from "./pages/CashflowAnalysis";
import GroupExpenses from "./pages/GroupExpenses";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MyPay from "./pages/MyPay";
import KYCScreen from "./pages/KYCScreen";
import UPIScreen from "./pages/UPIScreen";
import BiometricSetup from "./pages/BiometricSetup";
import PINEntry from "./pages/PINEntry";
import SplitExpenses from "./pages/SplitExpenses";
import TransactionHistory from "./pages/TransactionHistory";
import SendMoney from "./pages/SendMoney";
import RequestMoney from "./pages/RequestMoney";
import WalletAI from "./pages/WalletAI";
import PaymentReminders from "./pages/PaymentReminders";

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/expense-history" element={<ExpenseHistory />} />
            <Route path="/income-history" element={<IncomeHistory />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/spending-analysis" element={<SpendingAnalysis />} />
            <Route path="/cashflow-analysis" element={<CashflowAnalysis />} />
            <Route path="/group-expenses" element={<GroupExpenses />} />
            <Route path="/mypay" element={<MyPay />} />
            <Route path="/kyc" element={<KYCScreen />} />
            <Route path="/upi" element={<UPIScreen />} />
            <Route path="/biometric-setup" element={<BiometricSetup />} />
            <Route path="/pin-entry" element={<PINEntry />} />
            <Route path="/split-expenses" element={<SplitExpenses />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/request-money" element={<RequestMoney />} />
            <Route path="/wallet-ai" element={<WalletAI />} />
            <Route path="/payment-reminders" element={<PaymentReminders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TransactionProvider>
  );
}

export default App;

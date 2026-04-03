import React from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/SummaryCard";
import TrendChart from "../components/TrendChart";
import CategoryChart from "../components/CategoryChart";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";

export default function Dashboard() {
  const { darkMode, getSummary } = useApp();
  const summary = getSummary();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      <div>
        <h1
          className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Dashboard
        </h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Welcome back! Here&apos;s your financial overview.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Income"
          amount={summary.income}
          type="income"
          icon={TrendingUp}
          trend={12.5}
        />
        <SummaryCard
          title="Total Expenses"
          amount={summary.expense}
          type="expense"
          icon={TrendingDown}
          trend={-5.2}
        />
        <SummaryCard
          title="Balance"
          amount={summary.balance}
          type="balance"
          icon={DollarSign}
          trend={summary.balance > 0 ? 8.1 : -8.1}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart />
        <CategoryChart />
      </div>
      <div>
        <h2
          className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Recent Transactions
        </h2>
        <TransactionList compact={true} />
      </div>
      <AddTransaction />
    </div>
  );
}

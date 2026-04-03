import React from "react";
import { Download } from "lucide-react";
import { useApp } from "../context/AppContext";
import FilterBar from "../components/FilterBar";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import { exportToJSON, exportToCSV } from "../utils/helpers";

export default function TransactionsPage() {
  const { darkMode, getFilteredTransactions } = useApp();
  const transactions = getFilteredTransactions();

  const handleExport = (format) => {
    if (format === "json") {
      exportToJSON(transactions, "transactions.json");
    } else if (format === "csv") {
      exportToCSV(transactions, "transactions.csv");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Transactions
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage and view all your transactions
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("json")}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Download size={18} />
            JSON
          </button>
          <button
            onClick={() => handleExport("csv")}
            className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
          >
            <Download size={18} />
            CSV
          </button>
        </div>
      </div>
      <FilterBar />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            All Transactions ({transactions.length})
          </h2>
        </div>
        <TransactionList transactions={transactions} />
      </div>
      <AddTransaction />
    </div>
  );
}

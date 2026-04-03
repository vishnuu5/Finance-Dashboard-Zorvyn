import React, { useMemo } from "react";
import { AlertCircle, TrendingUp, TrendingDown, Target } from "lucide-react";
import { useApp } from "../context/AppContext";
import TrendChart from "../components/TrendChart";
import CategoryChart from "../components/CategoryChart";
import { formatCurrency } from "../utils/helpers";

export default function InsightsPage() {
  const { darkMode, transactions, getSummary, getCategoryBreakdown } = useApp();
  const summary = getSummary();
  const categoryBreakdown = getCategoryBreakdown();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const avgDailyExpense = expenses.length > 0 ? summary.expense / 30 : 0;
    const largestExpense =
      expenses.length > 0 ? Math.max(...expenses.map((t) => t.amount)) : 0;
    const topCategory = categoryBreakdown[0] || null;

    return {
      avgDailyExpense,
      largestExpense,
      topCategory,
      totalTransactions: transactions.length,
      savingsRate:
        summary.income > 0 ? (summary.balance / summary.income) * 100 : 0,
    };
  }, [transactions, summary, categoryBreakdown]);

  const InsightCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border rounded-lg p-6 shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}
          >
            {title}
          </p>
          <p
            className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            {value}
          </p>
          {subtext && (
            <p
              className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-500"}`}
            >
              {subtext}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      <div>
        <h1
          className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Financial Insights
        </h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Get detailed analysis of your spending patterns and financial health
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard
          title="Average Daily Expense"
          value={formatCurrency(insights.avgDailyExpense)}
          icon={TrendingDown}
          color="bg-red-500"
          subtext="Over last 30 days"
        />
        <InsightCard
          title="Largest Expense"
          value={formatCurrency(insights.largestExpense)}
          icon={AlertCircle}
          color="bg-orange-500"
          subtext="Single transaction"
        />
        <InsightCard
          title="Savings Rate"
          value={`${insights.savingsRate.toFixed(1)}%`}
          icon={TrendingUp}
          color="bg-green-500"
          subtext="% of income saved"
        />
        <InsightCard
          title="Total Transactions"
          value={insights.totalTransactions}
          icon={Target}
          color="bg-primary-500"
          subtext="All time"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart />
        <CategoryChart />
      </div>
      {insights.topCategory && (
        <div
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border rounded-lg p-6 shadow-sm`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Top Spending Category
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {insights.topCategory.name}
              </p>
              <p
                className={`text-3xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                {formatCurrency(insights.topCategory.value)}
              </p>
            </div>
            <div
              className={`h-24 w-24 rounded-full flex items-center justify-center font-bold text-xl ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {((insights.topCategory.value / summary.expense) * 100).toFixed(
                0,
              )}
              %
            </div>
          </div>
        </div>
      )}
      <div
        className={`${darkMode ? "bg-gradient-to-r from-primary-900/50 to-accent-900/50 border-primary-700" : "bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200"} border rounded-lg p-6`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${darkMode ? "text-primary-300" : "text-primary-900"}`}
        >
          Smart Recommendations
        </h2>
        <ul
          className={`space-y-3 text-sm ${darkMode ? "text-primary-100" : "text-primary-800"}`}
        >
          <li>
            ✓ Your spending is{" "}
            {insights.savingsRate > 20 ? "healthy" : "above average"}. Keep
            tracking!
          </li>
          <li>
            ✓ Focus on {insights.topCategory?.name || "discretionary"} spending
            for maximum savings.
          </li>
          <li>
            ✓ Set a daily budget of{" "}
            {formatCurrency(insights.avgDailyExpense * 0.85)} to increase
            savings.
          </li>
          <li>
            ✓ Review and categorize transactions regularly for better insights.
          </li>
        </ul>
      </div>
    </div>
  );
}

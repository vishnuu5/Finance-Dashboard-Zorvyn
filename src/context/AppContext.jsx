import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem("userRole");
    return saved || "viewer";
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : generateMockTransactions();
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState("30days");

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem("userRole", userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const switchRole = (role) => setUserRole(role);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      ...transaction,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || transaction.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getSummary = () => {
    const filtered = getFilteredTransactions();
    const income = filtered
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filtered
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      income,
      expense,
      balance: income - expense,
    };
  };

  const getCategoryBreakdown = () => {
    const filtered = getFilteredTransactions();
    const breakdown = {};
    filtered
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
      });
    return Object.entries(breakdown).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  };

  const getTrendData = () => {
    const days = 30;
    const trendData = {};
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      trendData[dateStr] = { income: 0, expense: 0 };
    }

    transactions.forEach((t) => {
      if (trendData[t.date]) {
        if (t.type === "income") {
          trendData[t.date].income += t.amount;
        } else {
          trendData[t.date].expense += t.amount;
        }
      }
    });

    return Object.entries(trendData).map(([date, data]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      income: data.income,
      expense: data.expense,
    }));
  };

  const value = {
    darkMode,
    toggleDarkMode,
    userRole,
    switchRole,
    transactions,
    addTransaction,
    deleteTransaction,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    dateRange,
    setDateRange,
    getSummary,
    getFilteredTransactions,
    getCategoryBreakdown,
    getTrendData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

function generateMockTransactions() {
  const categories = {
    expense: ["Food", "Transport", "Entertainment", "Utilities", "Shopping"],
    income: ["Salary", "Freelance", "Bonus", "Investment"],
  };

  const transactions = [];
  const today = new Date();

  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    const dateStr = date.toISOString().split("T")[0];

    const isIncome = Math.random() > 0.85;
    const type = isIncome ? "income" : "expense";
    const categoryList = categories[type];
    const category =
      categoryList[Math.floor(Math.random() * categoryList.length)];

    transactions.push({
      id: i + 1,
      date: dateStr,
      description: `${category} transaction`,
      category,
      type,
      amount:
        type === "income"
          ? Math.floor(Math.random() * 5000) + 1000
          : Math.floor(Math.random() * 500) + 10,
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

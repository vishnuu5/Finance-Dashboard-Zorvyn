import React from "react";
import { Search } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function FilterBar() {
  const {
    darkMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const categories = [
    "all",
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Salary",
    "Freelance",
    "Bonus",
    "Investment",
  ];

  return (
    <div
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border rounded-lg p-6 shadow-sm mb-6`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
      >
        Filters
      </h3>
      <div className="mb-6">
        <label
          htmlFor="search"
          className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Search Transactions
        </label>
        <div className="relative">
          <Search
            size={18}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            id="search"
            type="text"
            placeholder="Search by description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="category"
          className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

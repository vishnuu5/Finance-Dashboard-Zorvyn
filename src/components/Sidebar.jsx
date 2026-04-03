import React, { useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Sidebar({ currentPage, setCurrentPage }) {
  const { darkMode, userRole } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      requiresAdmin: false,
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: DollarSign,
      requiresAdmin: false,
    },
    {
      id: "insights",
      label: "Insights",
      icon: TrendingUp,
      requiresAdmin: false,
    },
  ];

  const availableMenuItems = menuItems.filter(
    (item) => !item.requiresAdmin || userRole === "admin",
  );

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-28 left-4 z-40 p-2 bg-primary-500 text-white rounded-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside
        className={`${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform fixed md:static top-24 left-0 h-[calc(100vh-6rem)] md:h-auto w-64 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-r shadow-lg md:shadow-none z-30 md:z-0`}
      >
        <nav className="p-6 space-y-2">
          {availableMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? `bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-lg`
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        {userRole === "admin" && (
          <div
            className={`mx-6 p-4 rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-blue-50 border-blue-200"
            } border`}
          >
            <p
              className={`text-xs font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"}`}
            >
              ADMIN MODE
            </p>
            <p
              className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              You have access to all features
            </p>
          </div>
        )}
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20 top-24"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

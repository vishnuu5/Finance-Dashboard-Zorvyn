import React from "react";
import { Sun, Moon, LogOut, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Header() {
  const { darkMode, toggleDarkMode, userRole, switchRole } = useApp();

  const roles = [
    { id: "viewer", label: "Viewer" },
    { id: "admin", label: "Admin" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b shadow-sm`}
    >
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <h1
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Finance Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 shrink-0">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => switchRole(role.id)}
                  className={`px-2 py-1 sm:px-3 rounded text-xs sm:text-sm font-medium transition-colors ${
                    userRole === role.id
                      ? "bg-primary-500 text-white"
                      : darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-accent-500 to-primary-600 rounded-full flex items-center justify-center shrink-0">
                <User size={16} className="text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-[11px] sm:text-xs font-medium truncate ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {userRole === "admin" ? "Administrator" : "Viewer"}
                </span>
              </div>
            </div>
            <button
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

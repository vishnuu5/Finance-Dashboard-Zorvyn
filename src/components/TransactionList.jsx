import React from 'react'
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatCurrency, formatDate } from '../utils/helpers'

export default function TransactionList({ transactions = null, onDelete = null, compact = false }) {
  const { darkMode, getFilteredTransactions, deleteTransaction } = useApp()
  const displayTransactions = transactions || getFilteredTransactions()

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id)
    } else {
      deleteTransaction(id)
    }
  }

  if (displayTransactions.length === 0) {
    return (
      <div
        className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-8`}
      >
        <div className="text-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <TrendingDown className={darkMode ? 'text-gray-400' : 'text-gray-400'} size={24} />
          </div>
          <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            No transactions found
          </p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Add your first transaction to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden shadow-sm`}
    >
      <div className={`overflow-x-auto ${compact ? 'max-h-96' : ''}`}>
        <table className="w-full">
          <thead>
            <tr
              className={`${
                darkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              } border-b`}
            >
              <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Date
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Description
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Category
              </th>
              <th className={`px-6 py-3 text-right text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Amount
              </th>
              {!compact && (
                <th className={`px-6 py-3 text-center text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {(compact ? displayTransactions.slice(0, 5) : displayTransactions).map((transaction) => (
              <tr
                key={transaction.id}
                className={`${
                  darkMode
                    ? 'border-gray-700 hover:bg-gray-700/50'
                    : 'border-gray-200 hover:bg-gray-50'
                } border-b transition-colors`}
              >
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formatDate(transaction.date)}
                </td>
                <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {transaction.description}
                </td>
                <td className={`px-6 py-4 text-sm`}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'income'
                        ? darkMode
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-green-100 text-green-700'
                        : darkMode
                          ? 'bg-red-900/30 text-red-400'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {transaction.category}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 text-sm font-semibold text-right ${
                    transaction.type === 'income'
                      ? darkMode
                        ? 'text-green-400'
                        : 'text-green-600'
                      : darkMode
                        ? 'text-red-400'
                        : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </td>
                {!compact && (
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className={`p-2 rounded transition-colors ${
                        darkMode
                          ? 'text-red-400 hover:bg-red-900/30'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      aria-label="Delete transaction"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {compact && displayTransactions.length > 5 && (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} px-6 py-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing 5 of {displayTransactions.length} transactions
          </p>
        </div>
      )}
    </div>
  )
}

import React from 'react'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { formatCurrency } from '../utils/helpers'
import { useApp } from '../context/AppContext'

export default function SummaryCard({ title, amount, type, icon: Icon, trend = 0 }) {
  const { darkMode } = useApp()

  const getTrendColor = () => {
    if (trend === 0) return darkMode ? 'text-gray-400' : 'text-gray-600'
    return trend > 0
      ? darkMode
        ? 'text-green-400'
        : 'text-green-600'
      : darkMode
        ? 'text-red-400'
        : 'text-red-600'
  }

  const getGradientBg = () => {
    switch (type) {
      case 'income':
        return 'from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30'
      case 'expense':
        return 'from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30'
      default:
        return 'from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30'
    }
  }

  return (
    <div
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}
          >
            {title}
          </p>
          <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatCurrency(amount)}
          </p>
          {trend !== 0 && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${getTrendColor()}`}>
              {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{Math.abs(trend).toFixed(1)}% from last period</span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg bg-gradient-to-br ${getGradientBg()}`}
        >
          <Icon size={28} className={`${
            type === 'income'
              ? 'text-green-600 dark:text-green-400'
              : type === 'expense'
                ? 'text-red-600 dark:text-red-400'
                : 'text-primary-600 dark:text-primary-400'
          }`} />
        </div>
      </div>
    </div>
  )
}

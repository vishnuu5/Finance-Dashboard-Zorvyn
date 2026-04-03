import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function AddTransaction() {
  const { darkMode, addTransaction, userRole } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    category: 'Food',
    type: 'expense',
    amount: '',
  })

  const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping']
  const incomeCategories = ['Salary', 'Freelance', 'Bonus', 'Investment']

  const categories =
    formData.type === 'income' ? incomeCategories : expenseCategories

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.description && formData.amount) {
      addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      })
      setFormData({
        description: '',
        category: 'Food',
        type: 'expense',
        amount: '',
      })
      setIsOpen(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'type') {
        updated.category = value === 'income' ? 'Salary' : 'Food'
      }
      return updated
    })
  }

  if (userRole !== 'admin') {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 hover:scale-110"
      >
        <Plus size={24} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto`}
          >
            <div
              className={`flex items-center justify-between ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              } border-b px-6 py-4 sticky top-0`}
            >
              <h2
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Add Transaction
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded transition-colors ${
                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="type"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description..."
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 placeholder-gray-400'
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 placeholder-gray-400'
                  }`}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-accent-700 transition-all"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

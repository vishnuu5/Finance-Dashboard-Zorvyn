import React, { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'

function AppContent() {
  const { darkMode } = useApp()
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 overflow-auto">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'transactions' && <TransactionsPage />}
            {currentPage === 'insights' && <InsightsPage />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

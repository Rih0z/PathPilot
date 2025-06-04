import React, { useState } from 'react'
import { Header } from '@components/Header'
import { LandingPage } from '@pages/LandingPage'
import { MainApp } from '@pages/MainApp'
import { DataImportPage } from '@pages/DataImportPage'
import { UserDashboard } from '@pages/UserDashboard'
import { UserDataProvider, useUserData } from '@contexts/UserDataContext'

type ViewType = 'landing' | 'app' | 'import' | 'dashboard'

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('landing')
  const { hasUserData, setUserData } = useUserData()

  const handleImportComplete = (userData: any) => {
    setUserData(userData)
    setCurrentView('dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <Header 
        onNavigate={(view) => setCurrentView(view as ViewType)} 
        currentView={currentView}
        hasUserData={hasUserData}
      />
      <main>
        {currentView === 'landing' && (
          <div id="home">
            <LandingPage onStartApp={() => setCurrentView('app')} />
          </div>
        )}
        {currentView === 'app' && (
          <MainApp onNavigateToImport={() => setCurrentView('import')} />
        )}
        {currentView === 'import' && (
          <DataImportPage 
            onBack={() => setCurrentView(hasUserData ? 'dashboard' : 'app')}
            onImportComplete={handleImportComplete}
          />
        )}
        {currentView === 'dashboard' && (
          <UserDashboard 
            onEdit={() => setCurrentView('import')}
          />
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <UserDataProvider>
      <AppContent />
    </UserDataProvider>
  )
}

export default App
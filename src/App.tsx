import React, { useState } from 'react'
import { Header } from '@components/Header'
import { LandingPage } from '@pages/LandingPage'
import { MainApp } from '@pages/MainApp'

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <Header onNavigate={setCurrentView} currentView={currentView} />
      <main>
        {currentView === 'landing' ? (
          <div id="home">
            <LandingPage onStartApp={() => setCurrentView('app')} />
          </div>
        ) : (
          <MainApp />
        )}
      </main>
    </div>
  )
}

export default App
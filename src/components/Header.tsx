import React from 'react'
import { 
  FaRocket, 
  FaHome, 
  FaCog, 
  FaQuestion, 
  FaPlay, 
  FaUser,
  FaDownload,
  FaChartLine
} from 'react-icons/fa'

interface HeaderProps {
  onNavigate: (view: 'landing' | 'app' | 'import' | 'dashboard') => void
  currentView: 'landing' | 'app' | 'import' | 'dashboard'
  hasUserData: boolean
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, hasUserData }) => {
  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'landing') {
      onNavigate('landing')
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const getNavigationButtons = () => {
    if (currentView === 'landing') {
      return (
        <>
          <button 
            onClick={() => scrollToSection('home')}
            className="text-white hover:text-amber-200 font-medium transition-colors"
          >
            ホーム
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-white hover:text-amber-200 font-medium transition-colors"
          >
            機能
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-white hover:text-amber-200 font-medium transition-colors"
          >
            使い方
          </button>
        </>
      )
    }

    return (
      <>
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-white hover:text-amber-200 font-medium transition-colors"
        >
          <FaHome />
          ホーム
        </button>
        
        {currentView !== 'app' && (
          <button 
            onClick={() => onNavigate('app')}
            className="text-white hover:text-amber-200 font-medium transition-colors"
          >
            アプリ
          </button>
        )}

        {hasUserData && (
          <>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 font-medium transition-colors ${
                currentView === 'dashboard' 
                  ? 'text-amber-200' 
                  : 'text-white hover:text-amber-200'
              }`}
            >
              <FaChartLine />
              ダッシュボード
            </button>
          </>
        )}
        
        <button 
          onClick={() => onNavigate('import')}
          className={`flex items-center gap-2 font-medium transition-colors ${
            currentView === 'import' 
              ? 'text-amber-200' 
              : 'text-white hover:text-amber-200'
          }`}
        >
          <FaDownload />
          データインポート
        </button>
      </>
    )
  }

  const getActionButton = () => {
    if (hasUserData) {
      return (
        <button 
          onClick={() => onNavigate('dashboard')}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <FaUser className="text-sm" />
          マイページ
        </button>
      )
    }

    if (currentView === 'landing') {
      return (
        <button 
          onClick={() => onNavigate('app')}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <FaPlay className="text-sm" />
          今すぐ開始
        </button>
      )
    }

    return (
      <button 
        onClick={() => onNavigate('import')}
        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <FaDownload className="text-sm" />
        データ取得
      </button>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center gap-3 text-white text-xl font-black cursor-pointer hover:text-amber-200 transition-colors"
            onClick={() => onNavigate('landing')}
          >
            <FaRocket className="text-2xl" />
            PathPilot
            {hasUserData && (
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {getNavigationButtons()}
            {getActionButton()}
          </div>
          
          {/* Mobile menu button (simplified for this demo) */}
          <div className="md:hidden">
            {getActionButton()}
          </div>
        </div>
      </div>
    </nav>
  )
}
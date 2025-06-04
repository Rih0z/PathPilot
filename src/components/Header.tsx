import React from 'react'
import { FaRocket, FaHome, FaCog, FaQuestion, FaPlay } from 'react-icons/fa'

interface HeaderProps {
  onNavigate: (view: 'landing' | 'app') => void
  currentView: 'landing' | 'app'
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const scrollToSection = (sectionId: string) => {
    if (currentView === 'app') {
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
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {currentView === 'landing' ? (
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
            ) : (
              <button 
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2 text-white hover:text-amber-200 font-medium transition-colors"
              >
                <FaHome />
                ホームに戻る
              </button>
            )}
            
            <button 
              onClick={() => onNavigate('app')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FaPlay className="text-sm" />
              今すぐ開始
            </button>
          </div>
          
          {/* Mobile menu button (simplified for this demo) */}
          <div className="md:hidden">
            <button 
              onClick={() => onNavigate('app')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              開始
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
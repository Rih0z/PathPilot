import React from 'react'
import { 
  FaRocket, 
  FaLightbulb, 
  FaBolt, 
  FaBullseye, 
  FaChartBar,
  FaCheckCircle,
  FaPlay
} from 'react-icons/fa'

interface LandingPageProps {
  onStartApp: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApp }) => {
  const showDemo = () => {
    alert(`PathPilotデモ

AI就活パイロットの主要機能

1. 希望体験生成 - 具体的な成功イメージを提供
2. 成功パターンマッチング - 最適な戦略を提案  
3. パーソナライズプロンプト - あなた専用のAIプロンプト

下のアプリケーションで実際に体験できます！`)
  }

  const tryHopeGeneration = () => {
    onStartApp()
    // Note: In a real app, you might want to pass additional state to navigate to specific view
  }

  const trySuccessPattern = () => {
    onStartApp()
  }

  const tryPromptGeneration = () => {
    onStartApp()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="text-white pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-5xl font-black mb-6 font-['Poppins'] bg-gradient-to-r from-white via-amber-200 to-orange-300 bg-clip-text text-transparent">
                AI就活パイロット
              </h1>
              <p className="text-lg lg:text-xl mb-8 opacity-90">
                あなたのClaude・ChatGPTを最大活用。<br />
                最適化プロンプトで就職活動を戦略的にナビゲート。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={onStartApp}
                  className="btn-primary text-lg px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  無料で始める
                </button>
                <button 
                  onClick={showDemo}
                  className="btn-secondary text-lg px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  デモを見る
                </button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  完全無料
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  登録不要
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  即座に利用可能
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up">
              <div className="card bg-white/95 backdrop-blur-lg p-8 rounded-3xl text-gray-900 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <FaBullseye className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-blue-900">PathPilotの特徴</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FaLightbulb className="text-amber-500 text-lg" />
                      <strong className="text-blue-900">希望体験生成</strong>
                    </div>
                    <small className="text-gray-600 block ml-6">
                      「内定をもらえるかも」という具体的な希望を提供
                    </small>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FaBolt className="text-green-500 text-lg" />
                      <strong className="text-blue-900">成功パターンマッチング</strong>
                    </div>
                    <small className="text-gray-600 block ml-6">
                      過去の成功事例から最適な戦略を提案
                    </small>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FaBullseye className="text-red-500 text-lg" />
                      <strong className="text-blue-900">パーソナライズプロンプト</strong>
                    </div>
                    <small className="text-gray-600 block ml-6">
                      あなた専用の最適化されたAIプロンプトを生成
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">主要機能</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              PathPilotは、あなたのAIを最大限活用して就職活動を成功に導く包括的なプラットフォームです
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaLightbulb className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">希望体験生成</h3>
              <p className="text-gray-600 mb-6">
                「もしかしたら内定をもらえるかも」という具体的な希望体験を生成し、モチベーションを維持します。
              </p>
              <button 
                onClick={tryHopeGeneration}
                className="btn-primary w-full rounded-xl py-3 font-semibold"
              >
                体験してみる
              </button>
            </div>
            
            <div className="card bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaBolt className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">成功パターンマッチング</h3>
              <p className="text-gray-600 mb-6">
                過去の成功事例を分析し、あなたに最適な就活戦略とアクションプランを提案します。
              </p>
              <button 
                onClick={trySuccessPattern}
                className="btn-primary w-full rounded-xl py-3 font-semibold"
              >
                パターンを見る
              </button>
            </div>
            
            <div className="card bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaBullseye className="text-red-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">パーソナライズプロンプト</h3>
              <p className="text-gray-600 mb-6">
                あなたの性格、スキル、目標に合わせて最適化されたAIプロンプトを自動生成します。
              </p>
              <button 
                onClick={tryPromptGeneration}
                className="btn-primary w-full rounded-xl py-3 font-semibold"
              >
                プロンプトを生成
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">使い方</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              3つの簡単なステップで、AI powered就活を始められます
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">情報を入力</h3>
              <p className="opacity-80">
                現在の状況、希望職種、スキルなどの基本情報を入力してください。
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">プロンプトを取得</h3>
              <p className="opacity-80">
                あなた専用に最適化されたAIプロンプトを生成し、コピーできます。
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">AIで実行</h3>
              <p className="opacity-80">
                Claude・ChatGPTにプロンプトを貼り付けて、高品質な就活支援を受けられます。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
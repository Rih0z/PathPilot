import React, { useState } from 'react'
import { 
  FaRocket, 
  FaLightbulb, 
  FaBolt, 
  FaBullseye,
  FaChartBar,
  FaArrowLeft,
  FaSpinner,
  FaCopy
} from 'react-icons/fa'

interface AppView {
  id: string
  name: string
}

const API_BASE = 'https://pathpilot.riho-dare.workers.dev'

export const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('welcome')
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [results, setResults] = useState<Record<string, any>>({})

  const views: Record<string, AppView> = {
    welcome: { id: 'welcome', name: 'ホーム' },
    hope: { id: 'hope', name: '希望体験生成' },
    success: { id: 'success', name: '成功パターン' },
    prompt: { id: 'prompt', name: 'プロンプト生成' },
    stats: { id: 'stats', name: '統計情報' }
  }

  const setLoadingState = (key: string, value: boolean) => {
    setLoading(prev => ({ ...prev, [key]: value }))
  }

  const setResult = (key: string, value: any) => {
    setResults(prev => ({ ...prev, [key]: value }))
  }

  const generateHope = async () => {
    setLoadingState('hope', true)
    try {
      const response = await fetch(`${API_BASE}/api/public/demo/hope-experience`, {
        method: 'POST'
      })
      const data = await response.json()
      setResult('hope', data)
    } catch (error) {
      setResult('hope', { error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoadingState('hope', false)
    }
  }

  const analyzeSuccess = async () => {
    setLoadingState('success', true)
    try {
      const response = await fetch(`${API_BASE}/api/public/demo/success-patterns`)
      const data = await response.json()
      setResult('success', data)
    } catch (error) {
      setResult('success', { error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoadingState('success', false)
    }
  }

  const generatePrompt = async () => {
    setLoadingState('prompt', true)
    try {
      const response = await fetch(`${API_BASE}/api/public/demo/prompt`, {
        method: 'POST'
      })
      const data = await response.json()
      setResult('prompt', data)
    } catch (error) {
      setResult('prompt', { error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoadingState('prompt', false)
    }
  }

  const loadStats = async () => {
    setLoadingState('stats', true)
    try {
      const response = await fetch(`${API_BASE}/api/public/demo/stats`)
      const data = await response.json()
      setResult('stats', data)
    } catch (error) {
      setResult('stats', { error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoadingState('stats', false)
    }
  }

  const copyPrompt = () => {
    const content = results.prompt?.data?.prompt?.content || ''
    navigator.clipboard.writeText(content).then(() => {
      alert('プロンプトをクリップボードにコピーしました！\n\nClaude・ChatGPTに貼り付けてご利用ください。')
    })
  }

  return (
    <section className="section bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">PathPilot アプリケーション</h2>
          <p className="text-gray-600">今すぐ無料でAI就活パイロットを体験してください</p>
        </div>
        
        <div className="card bg-white rounded-3xl shadow-xl p-10 max-w-4xl mx-auto">
          {/* Welcome View */}
          {currentView === 'welcome' && (
            <div>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FaRocket className="text-blue-600 text-3xl" />
                  <h3 className="text-2xl font-bold text-blue-900">PathPilotへようこそ</h3>
                </div>
                <p className="text-gray-600">どの機能から始めますか？</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setCurrentView('hope')}
                  className="btn-primary p-6 rounded-2xl text-left hover:transform hover:scale-105 transition-all duration-300"
                >
                  <FaLightbulb className="text-3xl mb-3 text-white" />
                  <div className="text-lg font-semibold text-white">希望体験を生成する</div>
                </button>
                
                <button 
                  onClick={() => setCurrentView('success')}
                  className="btn-primary p-6 rounded-2xl text-left hover:transform hover:scale-105 transition-all duration-300"
                >
                  <FaBolt className="text-3xl mb-3 text-white" />
                  <div className="text-lg font-semibold text-white">成功パターンを見る</div>
                </button>
                
                <button 
                  onClick={() => setCurrentView('prompt')}
                  className="btn-primary p-6 rounded-2xl text-left hover:transform hover:scale-105 transition-all duration-300"
                >
                  <FaBullseye className="text-3xl mb-3 text-white" />
                  <div className="text-lg font-semibold text-white">プロンプトを生成する</div>
                </button>
                
                <button 
                  onClick={() => setCurrentView('stats')}
                  className="btn-secondary p-6 rounded-2xl text-left hover:transform hover:scale-105 transition-all duration-300"
                >
                  <FaChartBar className="text-3xl mb-3 text-blue-900" />
                  <div className="text-lg font-semibold text-blue-900">統計情報を見る</div>
                </button>
              </div>
            </div>
          )}

          {/* Hope Generation View */}
          {currentView === 'hope' && (
            <div>
              <div className="mb-6">
                <button 
                  onClick={() => setCurrentView('welcome')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                  <FaArrowLeft />
                  戻る
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <FaLightbulb className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-blue-900">希望体験生成</h3>
                </div>
                <p className="text-gray-600 text-sm">あなたの現在の状況に基づいて、具体的な希望体験を生成します。</p>
              </div>
              
              {results.hope && (
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-blue-900 mb-3">生成された希望体験</h4>
                  {results.hope.success ? (
                    <div>
                      <p className="text-blue-800 font-medium mb-4">{results.hope.data.message}</p>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-amber-400">
                        <strong className="flex items-center gap-2 text-blue-900 mb-2">
                          <FaLightbulb className="text-amber-500" />
                          あなたの希望体験:
                        </strong>
                        <em className="text-gray-700">
                          "3ヶ月後、理想的な企業から内定通知を受け取り、新しいキャリアへの一歩を踏み出している自分を想像してみてください。この瞬間の達成感と希望に満ちた気持ちを、今から具体的に描いていきましょう。"
                        </em>
                      </div>
                      <p className="text-gray-600 text-sm mt-3">{results.hope.data.note}</p>
                    </div>
                  ) : (
                    <p className="text-red-600">エラー: {results.hope.error}</p>
                  )}
                </div>
              )}
              
              <button 
                onClick={generateHope} 
                disabled={loading.hope}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading.hope ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    生成中...
                  </>
                ) : (
                  '希望体験を生成する'
                )}
              </button>
            </div>
          )}

          {/* Success Patterns View */}
          {currentView === 'success' && (
            <div>
              <div className="mb-6">
                <button 
                  onClick={() => setCurrentView('welcome')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                  <FaArrowLeft />
                  戻る
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <FaBolt className="text-green-600 text-2xl" />
                  <h3 className="text-xl font-bold text-blue-900">成功パターン分析</h3>
                </div>
                <p className="text-gray-600 text-sm">類似プロフィールの成功パターンを分析します。</p>
              </div>
              
              {results.success && (
                <div className="bg-green-50 p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-green-800 mb-3">成功パターン分析結果</h4>
                  {results.success.success ? (
                    <div>
                      <p className="text-green-700 font-medium mb-4">{results.success.data.message}</p>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                        <strong className="flex items-center gap-2 text-green-800 mb-2">
                          <FaBolt className="text-green-600" />
                          推奨戦略:
                        </strong>
                        <ul className="list-disc pl-6 space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            LinkedInプロフィールの最適化 (成功率+30%)
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            業界特化型のスキル習得 (平均内定期間-2週間)
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-600">✓</span>
                            ネットワーキングイベント参加 (紹介経由率+45%)
                          </li>
                        </ul>
                      </div>
                      <p className="text-gray-600 text-sm mt-3">{results.success.data.note}</p>
                    </div>
                  ) : (
                    <p className="text-red-600">エラー: {results.success.error}</p>
                  )}
                </div>
              )}
              
              <button 
                onClick={analyzeSuccess} 
                disabled={loading.success}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading.success ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    分析中...
                  </>
                ) : (
                  '成功パターンを分析する'
                )}
              </button>
            </div>
          )}

          {/* Prompt Generation View */}
          {currentView === 'prompt' && (
            <div>
              <div className="mb-6">
                <button 
                  onClick={() => setCurrentView('welcome')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                  <FaArrowLeft />
                  戻る
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <FaBullseye className="text-red-600 text-2xl" />
                  <h3 className="text-xl font-bold text-blue-900">パーソナライズプロンプト生成</h3>
                </div>
                <p className="text-gray-600 text-sm">あなた専用の最適化されたAIプロンプトを生成します。</p>
              </div>
              
              {results.prompt && (
                <div className="bg-red-50 p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-red-800 mb-3">生成されたプロンプト</h4>
                  {results.prompt.success ? (
                    <div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap mb-3">
                        {results.prompt.data.prompt.content}
                      </div>
                      <button 
                        onClick={copyPrompt}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <FaCopy />
                        プロンプトをコピー
                      </button>
                    </div>
                  ) : (
                    <p className="text-red-600">エラー: {results.prompt.error}</p>
                  )}
                </div>
              )}
              
              <button 
                onClick={generatePrompt} 
                disabled={loading.prompt}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading.prompt ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    生成中...
                  </>
                ) : (
                  'プロンプトを生成する'
                )}
              </button>
            </div>
          )}

          {/* Stats View */}
          {currentView === 'stats' && (
            <div>
              <div className="mb-6">
                <button 
                  onClick={() => setCurrentView('welcome')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                  <FaArrowLeft />
                  戻る
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <FaChartBar className="text-blue-600 text-2xl" />
                  <h3 className="text-xl font-bold text-blue-900">PathPilot統計情報</h3>
                </div>
                <p className="text-gray-600 text-sm">プラットフォームの利用統計をご覧ください。</p>
              </div>
              
              {results.stats && results.stats.success && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-900">{results.stats.data.total_users}</div>
                    <div className="text-sm text-gray-600">総利用者数</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-700">{results.stats.data.success_rate}</div>
                    <div className="text-sm text-gray-600">成功率</div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-amber-700">{results.stats.data.average_time_to_offer}</div>
                    <div className="text-sm text-gray-600">平均内定期間</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-red-700">{results.stats.data.satisfaction_score}/5.0</div>
                    <div className="text-sm text-gray-600">満足度</div>
                  </div>
                </div>
              )}
              
              <button 
                onClick={loadStats} 
                disabled={loading.stats}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading.stats ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    読み込み中...
                  </>
                ) : (
                  '統計情報を読み込む'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
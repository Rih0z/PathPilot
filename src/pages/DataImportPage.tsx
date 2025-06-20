import React, { useState } from 'react'
import { 
  FaDownload,
  FaUpload,
  FaCopy,
  FaCheck,
  FaArrowLeft,
  FaUser,
  FaClipboard,
  FaFileImport,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa'

interface DataImportPageProps {
  onBack: () => void
  onImportComplete: (userData: any) => void
}

interface UserData {
  basicInfo: {
    name: string
    age: number
    education: string
    currentStatus: string
  }
  jobSearchInfo: {
    targetIndustries: string[]
    targetPositions: string[]
    preferredSalary: string
    preferredLocation: string
    startDate: string
  }
  experience: {
    workHistory: any[]
    skills: string[]
    certifications: string[]
    projects: any[]
  }
  currentActivity: {
    applicationsSubmitted: number
    interviewsScheduled: number
    offers: number
    platforms: string[]
    lastActivity: string
  }
  challenges: {
    mainConcerns: string[]
    blockers: string[]
    support: string[]
  }
  additionalInfo: {
    screenshots: string[]
    documents: string[]
    notes: string
  }
}

export const DataImportPage: React.FC<DataImportPageProps> = ({ onBack, onImportComplete }) => {
  const [step, setStep] = useState<'prompt' | 'import' | 'review'>('prompt')
  const [promptCopied, setPromptCopied] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [parsedData, setParsedData] = useState<UserData | null>(null)
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const dataImportPrompt = `# PathPilot就活データ分析システム

あなたは就職活動支援の専門AIアシスタントです。ユーザーの現在の就活状況を詳細に分析し、構造化されたJSONデータとして出力してください。

## 📋 情報収集手順

### 1. 基本情報の確認
以下の情報を順番に質問してください：

**個人情報**
- お名前（ニックネーム可）
- 年齢
- 最終学歴（大学名・学部・卒業年）
- 現在の状況（学生/社会人/転職活動中等）

**希望条件**
- 希望業界（複数選択可）
- 希望職種（複数選択可）
- 希望年収レンジ
- 勤務地の希望
- 入社希望時期

### 2. 経験・スキルの詳細
**職歴・経験**
- これまでの職歴（アルバイト含む）
- 保有スキル（技術スキル、ソフトスキル）
- 資格・認定
- 主要なプロジェクト経験

### 3. 現在の就活状況
**活動状況**
- これまでの応募企業数
- 面接の予定・実施回数
- 内定・オファーの状況
- 利用している就活サービス・プラットフォーム
- 最後に就活活動をした日

### 4. 課題・悩みの把握
**現在の課題**
- 就活で最も困っていること
- 解決したい具体的な問題
- 必要だと感じているサポート

### 5. 追加情報の収集
**補足資料**
- スクリーンショット（求人サイト、応募状況、面接スケジュール等）の内容説明
- 履歴書・職務経歴書の概要
- その他の関連資料
- 追加で伝えたいこと

## 🎯 重要な指示

1. **段階的な質問**: 一度にすべてを聞かず、カテゴリごとに分けて質問してください
2. **詳細な掘り下げ**: 表面的な回答ではなく、具体的な詳細を引き出してください
3. **資料の活用**: 提供されたスクリーンショットや資料を詳細に分析してください
4. **確認の徹底**: すべての情報が収集できたか最終確認してください

## 📤 最終出力フォーマット

すべての情報収集が完了したら、以下のJSON形式で出力してください：

\`\`\`json
{
  "basicInfo": {
    "name": "ユーザー名",
    "age": 25,
    "education": "○○大学○○学部 2023年卒",
    "currentStatus": "転職活動中"
  },
  "jobSearchInfo": {
    "targetIndustries": ["IT", "コンサルティング"],
    "targetPositions": ["プロダクトマネージャー", "戦略コンサルタント"],
    "preferredSalary": "500-700万円",
    "preferredLocation": "東京都内",
    "startDate": "2024年4月"
  },
  "experience": {
    "workHistory": [
      {
        "company": "A株式会社",
        "position": "営業職",
        "duration": "2023年4月-現在",
        "achievements": ["売上目標120%達成", "新規開拓20社"]
      }
    ],
    "skills": ["プロジェクト管理", "データ分析", "プレゼンテーション"],
    "certifications": ["TOEIC 850点", "簿記2級"],
    "projects": [
      {
        "name": "新サービス企画",
        "description": "社内新規事業の企画・立案",
        "impact": "売上500万円増加"
      }
    ]
  },
  "currentActivity": {
    "applicationsSubmitted": 15,
    "interviewsScheduled": 3,
    "offers": 0,
    "platforms": ["リクナビ", "マイナビ", "ビズリーチ"],
    "lastActivity": "2024年1月15日"
  },
  "challenges": {
    "mainConcerns": ["面接での自己アピール", "企業研究の深さ"],
    "blockers": ["時間不足", "情報収集の効率性"],
    "support": ["面接対策", "企業分析サポート"]
  },
  "additionalInfo": {
    "screenshots": ["求人サイトの応募状況画面", "面接スケジュール"],
    "documents": ["履歴書", "職務経歴書"],
    "notes": "特に製品企画の仕事に興味があり、ユーザー視点を活かした仕事をしたい"
  },
  "analysis": {
    "strengths": ["営業経験による顧客理解", "目標達成力"],
    "improvementAreas": ["技術スキル", "業界知識"],
    "recommendations": ["IT業界研究の深化", "プロダクト管理スキル習得"],
    "matchingScore": 75,
    "nextActions": ["面接対策強化", "ポートフォリオ作成"]
  }
}
\`\`\`

## 開始

「こんにちは！PathPilotの就活データ分析を始めましょう。まずは基本的な情報から教えてください。お名前（ニックネーム可）と現在の状況を教えてもらえますか？」

と言って、情報収集を開始してください。ユーザーが情報を提供したら、上記の手順に従って段階的に詳細を収集し、最終的にJSONで出力してください。`

  const copyPrompt = () => {
    navigator.clipboard.writeText(dataImportPrompt).then(() => {
      setPromptCopied(true)
      setTimeout(() => setPromptCopied(false), 3000)
    })
  }

  const processJsonInput = () => {
    setIsProcessing(true)
    setError('')
    
    try {
      const parsed = JSON.parse(jsonInput)
      
      // データ構造の検証
      if (!parsed.basicInfo || !parsed.jobSearchInfo || !parsed.experience) {
        throw new Error('必要なデータ構造が不足しています')
      }
      
      setParsedData(parsed)
      setStep('review')
    } catch (err) {
      setError('JSONの形式が正しくありません。もう一度確認してください。')
    } finally {
      setIsProcessing(false)
    }
  }

  const confirmImport = () => {
    if (parsedData) {
      onImportComplete(parsedData)
    }
  }

  const renderPromptStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FaFileImport className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">データインポート</h2>
        <p className="text-gray-600">AIツールを使用して現在の就活状況を分析し、データをインポートします</p>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <FaClipboard />
          手順
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>下記のプロンプトをコピーして、Claude・Gemini・ChatGPT等のAIツールに貼り付け</li>
          <li>AIの質問に従って、現在の就活状況を詳しく入力</li>
          <li>スクリーンショット（求人サイト、応募状況等）があれば一緒に送信</li>
          <li>AIが出力するJSONデータをコピー</li>
          <li>次のステップでJSONを貼り付けてインポート完了</li>
        </ol>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-900">データ収集プロンプト</h4>
          <button
            onClick={copyPrompt}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              promptCopied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {promptCopied ? <FaCheck /> : <FaCopy />}
            {promptCopied ? 'コピー完了' : 'プロンプトをコピー'}
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg border text-sm font-mono max-h-60 overflow-y-auto">
          {dataImportPrompt}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
        >
          <FaArrowLeft />
          戻る
        </button>
        <button
          onClick={() => setStep('import')}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <FaUpload />
          JSONをインポート
        </button>
      </div>
    </div>
  )

  const renderImportStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FaUpload className="text-4xl text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">JSONデータのインポート</h2>
        <p className="text-gray-600">AIツールから出力されたJSONデータを貼り付けてください</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          JSONデータ
        </label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"basicInfo": {"name": "...", ...}} の形式で貼り付けてください'
          className="w-full h-64 p-4 border border-gray-300 rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <FaExclamationTriangle className="text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setStep('prompt')}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
        >
          <FaArrowLeft />
          戻る
        </button>
        <button
          onClick={processJsonInput}
          disabled={!jsonInput || isProcessing}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? <FaSpinner className="animate-spin" /> : <FaCheck />}
          {isProcessing ? '処理中...' : 'データを解析'}
        </button>
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FaUser className="text-4xl text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">データ確認</h2>
        <p className="text-gray-600">インポートされたデータを確認してください</p>
      </div>

      {parsedData && (
        <div className="space-y-4">
          {/* 基本情報 */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold text-blue-900 mb-4">基本情報</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">名前:</span>
                <span className="ml-2 font-medium">{parsedData.basicInfo.name}</span>
              </div>
              <div>
                <span className="text-gray-600">年齢:</span>
                <span className="ml-2 font-medium">{parsedData.basicInfo.age}歳</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">学歴:</span>
                <span className="ml-2 font-medium">{parsedData.basicInfo.education}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">現在の状況:</span>
                <span className="ml-2 font-medium">{parsedData.basicInfo.currentStatus}</span>
              </div>
            </div>
          </div>

          {/* 希望条件 */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold text-blue-900 mb-4">希望条件</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">希望業界:</span>
                <span className="ml-2 font-medium">{parsedData.jobSearchInfo.targetIndustries.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-600">希望職種:</span>
                <span className="ml-2 font-medium">{parsedData.jobSearchInfo.targetPositions.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-600">希望年収:</span>
                <span className="ml-2 font-medium">{parsedData.jobSearchInfo.preferredSalary}</span>
              </div>
            </div>
          </div>

          {/* 現在の活動状況 */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold text-blue-900 mb-4">現在の活動状況</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">応募企業数:</span>
                <span className="ml-2 font-medium">{parsedData.currentActivity.applicationsSubmitted}社</span>
              </div>
              <div>
                <span className="text-gray-600">面接予定:</span>
                <span className="ml-2 font-medium">{parsedData.currentActivity.interviewsScheduled}件</span>
              </div>
              <div>
                <span className="text-gray-600">内定数:</span>
                <span className="ml-2 font-medium">{parsedData.currentActivity.offers}件</span>
              </div>
              <div>
                <span className="text-gray-600">利用プラットフォーム:</span>
                <span className="ml-2 font-medium">{parsedData.currentActivity.platforms.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* AI分析結果 */}
          {(parsedData as any).analysis && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border">
              <h3 className="font-bold text-blue-900 mb-4">AI分析結果</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">マッチング度:</span>
                  <span className="ml-2 font-medium text-lg">{(parsedData as any).analysis.matchingScore}%</span>
                </div>
                <div>
                  <span className="text-gray-600">強み:</span>
                  <span className="ml-2 font-medium">{(parsedData as any).analysis.strengths.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-600">改善エリア:</span>
                  <span className="ml-2 font-medium">{(parsedData as any).analysis.improvementAreas.join(', ')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setStep('import')}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
        >
          <FaArrowLeft />
          戻る
        </button>
        <button
          onClick={confirmImport}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          <FaDownload />
          データをインポート
        </button>
      </div>
    </div>
  )

  return (
    <section className="section bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-white rounded-3xl shadow-xl p-8">
            {step === 'prompt' && renderPromptStep()}
            {step === 'import' && renderImportStep()}
            {step === 'review' && renderReviewStep()}
          </div>
        </div>
      </div>
    </section>
  )
}
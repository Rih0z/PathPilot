import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, UserCheck, RefreshCw, Target, TrendingUp, Brain, Camera, CheckCircle } from 'lucide-react';
import type { UserType, UserContext, Application } from '@/types';
import { dashboardTexts } from '@/constants';

interface DashboardProps {
  userType: UserType;
  userContext: UserContext;
  applicationData: Application[];
  hopeScore: number;
  loading: boolean;
  activeCompany: Application | null;
  generatedPrompt: string;
  onEditProfile: () => void;
  onHopeScoreUpdate: (delta: number) => void;
  onLoadingChange: (loading: boolean) => void;
  onPromptGenerated: (prompt: string) => void;
  onActiveCompanyChange: (company: Application | null) => void;
}

// PathPilot UI/UX完全実装仕様書準拠のダッシュボード画面（S003）
const Dashboard: React.FC<DashboardProps> = ({ 
  userType, 
  userContext, 
  applicationData, 
  hopeScore, 
  loading, 
  activeCompany, 
  generatedPrompt, 
  onEditProfile, 
  onHopeScoreUpdate, 
  onLoadingChange, 
  onPromptGenerated, 
  onActiveCompanyChange 
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // 希望スコア更新
  const handleRefreshHope = () => {
    onHopeScoreUpdate(Math.floor(Math.random() * 20) - 10);
  };

  // プロンプト生成
  const generatePrompt = (type: string) => {
    onLoadingChange(true);
    setTimeout(() => {
      const samplePrompt = `# ${userContext.targetJob}への転職対策プロンプト\n\n## あなたのプロフィール\n- 現在: ${userContext.currentJob || '学生'}\n- 目標: ${userContext.targetJob}\n\n## 具体的なアクション計画\n1. 企業研究の深堀り\n2. 面接対策の準備\n3. 自己分析の強化\n\nこのプロンプトをClaude/GPTで実行してください。`;
      onPromptGenerated(samplePrompt);
      onLoadingChange(false);
    }, 1500);
  };

  // プロンプトコピー
  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // 進捗テキスト取得
  const getProgressText = () => {
    if (hopeScore < 50) return dashboardTexts.hopeSection.progressText[0];
    if (hopeScore < 70) return dashboardTexts.hopeSection.progressText[1];
    if (hopeScore < 90) return dashboardTexts.hopeSection.progressText[2];
    return dashboardTexts.hopeSection.progressText[3];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">{dashboardTexts.header.title}</h1>
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {dashboardTexts.header.badge[userType] || dashboardTexts.header.badge.student}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {userType === 'career' 
                  ? dashboardTexts.header.hopeLabel.career 
                  : dashboardTexts.header.hopeLabel.student
                }
              </p>
              <p className="text-2xl font-bold text-blue-600">{hopeScore}%</p>
            </div>
            <Heart className={`w-8 h-8 ${hopeScore > 70 ? 'text-red-500' : 'text-gray-400'}`} />
            <button
              onClick={onEditProfile}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              title={dashboardTexts.header.profileEditTooltip}
            >
              <UserCheck className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 希望セクション */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold">
                {userType === 'career' 
                  ? dashboardTexts.hopeSection.title.career
                  : dashboardTexts.hopeSection.title.student
                }
              </h2>
              <button
                onClick={handleRefreshHope}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center hover:bg-white/30 transition-all"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                {dashboardTexts.hopeSection.refreshButton}
              </button>
            </div>
            
            {/* プログレスバー */}
            <div className="mb-6">
              <div className="bg-white/20 rounded-full h-6 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-1000"
                  style={{ width: `${hopeScore}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${hopeScore}%` }}
                />
              </div>
              <p className="mt-2 text-white/90">{getProgressText()}</p>
            </div>

            {/* 統計カード */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Target className="w-6 h-6 mr-2" />
                  <h3 className="font-semibold">
                    {userType === 'career' 
                      ? dashboardTexts.hopeSection.statsCards.applications.title.career.replace('{count}', applicationData.length.toString())
                      : dashboardTexts.hopeSection.statsCards.applications.title.student.replace('{count}', applicationData.length.toString())
                    }
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  {userType === 'career' 
                    ? dashboardTexts.hopeSection.statsCards.applications.subtitle.career
                    : dashboardTexts.hopeSection.statsCards.applications.subtitle.student
                  }
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  <h3 className="font-semibold">
                    {dashboardTexts.hopeSection.statsCards.successRate.title.replace('{rate}', '72')}
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  {dashboardTexts.hopeSection.statsCards.successRate.subtitle}
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  <h3 className="font-semibold">
                    {userType === 'career' 
                      ? dashboardTexts.hopeSection.statsCards.target.title.career.replace('{salary}', userContext.targetSalary || '600')
                      : dashboardTexts.hopeSection.statsCards.target.title.student
                    }
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  {dashboardTexts.hopeSection.statsCards.target.subtitle}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* メインコンテンツグリッド */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* プロンプト生成 */}
          <motion.section 
            className="bg-white rounded-3xl p-6 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">{dashboardTexts.promptGenerator.title}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => generatePrompt('screenshot')}
                className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <Camera className="w-6 h-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-sm">{dashboardTexts.promptGenerator.buttons.screenshot.title}</h4>
                <p className="text-xs text-gray-600">{dashboardTexts.promptGenerator.buttons.screenshot.subtitle}</p>
              </button>
              
              <button
                onClick={() => generatePrompt('hope')}
                className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all group"
              >
                <Heart className="w-6 h-6 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-sm">{dashboardTexts.promptGenerator.buttons.hope.title}</h4>
                <p className="text-xs text-gray-600">{dashboardTexts.promptGenerator.buttons.hope.subtitle}</p>
              </button>
              
              <button
                onClick={() => generatePrompt('selfAnalysis')}
                className="p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
              >
                <Brain className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-sm">{dashboardTexts.promptGenerator.buttons.selfAnalysis.title}</h4>
                <p className="text-xs text-gray-600">{dashboardTexts.promptGenerator.buttons.selfAnalysis.subtitle}</p>
              </button>
              
              <button
                onClick={() => generatePrompt('hopeCareer')}
                className="p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all group"
              >
                <Target className="w-6 h-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-sm">{dashboardTexts.promptGenerator.buttons.hopeCareer.title}</h4>
                <p className="text-xs text-gray-600">{dashboardTexts.promptGenerator.buttons.hopeCareer.subtitle}</p>
              </button>
            </div>

            {/* 生成されたプロンプト */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">{dashboardTexts.promptGenerator.loading}</p>
              </div>
            )}

            {generatedPrompt && !loading && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">生成されたプロンプト</h4>
                  <button
                    onClick={copyPrompt}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      copiedPrompt ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {copiedPrompt ? 'コピー済み' : dashboardTexts.promptGenerator.copyButton}
                  </button>
                </div>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {generatedPrompt}
                </pre>
              </div>
            )}
          </motion.section>

          {/* 応募パイプライン */}
          <motion.section 
            className="bg-white rounded-3xl p-6 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              {userType === 'career' 
                ? dashboardTexts.pipeline.title.career
                : dashboardTexts.pipeline.title.student
              }
            </h3>
            
            <div className="space-y-4">
              {applicationData.map((app, index) => (
                <div key={app.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{app.company}</h4>
                      <p className="text-sm text-gray-600">{app.position}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.urgency === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.urgency === 'high' 
                          ? dashboardTexts.pipeline.urgencyBadge.high
                          : dashboardTexts.pipeline.urgencyBadge.medium
                        }
                      </span>
                      <span className="text-sm font-medium text-blue-600">{app.probability}%</span>
                    </div>
                  </div>
                  
                  {/* ステージプログレス */}
                  <div className="flex space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((stage) => (
                      <div
                        key={stage}
                        className={`w-8 h-2 rounded-full ${
                          stage <= app.stage ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {dashboardTexts.pipeline.nextActionPrefix}{app.nextAction}
                    </span>
                    <button 
                      onClick={() => generatePrompt('interview')}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {dashboardTexts.pipeline.actionButton}
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all">
                {userType === 'career' 
                  ? dashboardTexts.pipeline.addButton.career
                  : dashboardTexts.pipeline.addButton.student
                }
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
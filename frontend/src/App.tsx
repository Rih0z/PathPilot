import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ViewType, UserType, UserContext, Application, GlobalState } from '@/types';
import { initialUserContext, studentApplicationData, careerApplicationData } from '@/constants';

// Components
import { UserTypeSelection, OnboardingForm, Dashboard } from '@/components';

// PathPilot UI/UX完全実装仕様書準拠のアプリケーション
const App: React.FC = () => {
  // グローバル状態管理
  const [globalState, setGlobalState] = useState<GlobalState>({
    currentView: 'userType',
    userType: '',
    userContext: initialUserContext,
    applicationData: [],
    hopeScore: 45,
    loading: false,
    activeCompany: null,
    generatedPrompt: ''
  });

  // ユーザータイプ変更ハンドラー
  const handleUserTypeChange = (newType: UserType) => {
    setGlobalState(prev => ({
      ...prev,
      userType: newType,
      currentView: 'onboarding',
      // ユーザータイプに応じたデータクリア
      userContext: {
        ...prev.userContext,
        // 転職者選択時は学生フィールドをクリア
        ...(newType === 'career' && {
          university: '',
          major: '',
          graduationYear: '',
          internExperience: ''
        }),
        // 学生・新卒選択時は転職者フィールドをクリア
        ...(newType !== 'career' && {
          currentJob: '',
          experience: ''
        })
      },
      // 応募データを初期化
      applicationData: newType === 'career' ? careerApplicationData : studentApplicationData
    }));
  };

  // ビュー変更ハンドラー
  const handleViewChange = (view: ViewType) => {
    setGlobalState(prev => ({
      ...prev,
      currentView: view
    }));
  };

  // ユーザーコンテキスト更新ハンドラー
  const handleUserContextUpdate = (updates: Partial<UserContext>) => {
    setGlobalState(prev => ({
      ...prev,
      userContext: {
        ...prev.userContext,
        ...updates
      }
    }));
  };

  // 希望スコア更新ハンドラー
  const updateHopeScore = (delta: number = 10) => {
    setGlobalState(prev => ({
      ...prev,
      hopeScore: Math.min(Math.max(prev.hopeScore + delta, 0), 95)
    }));
  };

  // ローディング状態更新
  const setLoading = (loading: boolean) => {
    setGlobalState(prev => ({
      ...prev,
      loading
    }));
  };

  // プロンプト生成
  const setGeneratedPrompt = (prompt: string) => {
    setGlobalState(prev => ({
      ...prev,
      generatedPrompt: prompt
    }));
  };

  // アクティブ企業設定
  const setActiveCompany = (company: Application | null) => {
    setGlobalState(prev => ({
      ...prev,
      activeCompany: company
    }));
  };

  // 画面遷移アニメーション
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  // 現在のビューに基づいてコンポーネントをレンダリング
  const renderCurrentView = () => {
    switch (globalState.currentView) {
      case 'userType':
        return (
          <UserTypeSelection
            onUserTypeSelect={handleUserTypeChange}
            selectedType={globalState.userType}
          />
        );
      
      case 'onboarding':
        return (
          <OnboardingForm
            userType={globalState.userType}
            userContext={globalState.userContext}
            onUserContextUpdate={handleUserContextUpdate}
            onBack={() => handleViewChange('userType')}
            onComplete={() => handleViewChange('dashboard')}
          />
        );
      
      case 'dashboard':
        return (
          <Dashboard
            userType={globalState.userType}
            userContext={globalState.userContext}
            applicationData={globalState.applicationData}
            hopeScore={globalState.hopeScore}
            loading={globalState.loading}
            activeCompany={globalState.activeCompany}
            generatedPrompt={globalState.generatedPrompt}
            onEditProfile={() => handleViewChange('onboarding')}
            onHopeScoreUpdate={updateHopeScore}
            onLoadingChange={setLoading}
            onPromptGenerated={setGeneratedPrompt}
            onActiveCompanyChange={setActiveCompany}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="App min-h-screen"
      {...pageTransition}
    >
      {renderCurrentView()}
    </motion.div>
  );
};

export default App;
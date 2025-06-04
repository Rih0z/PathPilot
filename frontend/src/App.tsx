import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animationUtils } from '@/utils';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));

// Loading component with psychological comfort
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
    <motion.div
      className="text-center"
      {...animationUtils.entrance.fadeInUp}
    >
      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
        <motion.div
          className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <h2 className="text-lg font-medium text-neutral-900 mb-2">
        PathPilot を準備中...
      </h2>
      <p className="text-neutral-600">
        あなたの就活成功をサポートする準備をしています
      </p>
    </motion.div>
  </div>
);

// 404 Page with helpful guidance
const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
    <motion.div 
      className="card max-w-md w-full p-8 text-center"
      {...animationUtils.entrance.scaleIn}
    >
      <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29.82-5.877 2.172M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 mb-3">
        迷子になってしまいましたね
      </h1>
      <p className="text-neutral-600 mb-6">
        お探しのページが見つかりません。<br />
        ホームに戻って、新しい就活の旅を始めましょう。
      </p>
      <motion.a
        href="/"
        className="btn-primary w-full inline-block"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ホームに戻る
      </motion.a>
    </motion.div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Landing and Authentication */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            {/* Main Application */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* 404 Handler */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
};

export default App;
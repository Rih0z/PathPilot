import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles, Users, TrendingUp, Heart } from 'lucide-react';
import { animationUtils, psychologyUtils, cn } from '@/utils';
import type { OnboardingStep, OnboardingResponse, QuestionOption } from '@/types';

// With-style onboarding steps with psychological triggers
const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: '🎉 PathPilotへようこそ！',
    subtitle: '2万人以上が就活成功を実現',
    question: 'まず、あなたのお名前を教えてください',
    type: 'text',
    psychological_trigger: 'reciprocity',
    progress_weight: 10,
    validation: { required: true, min_length: 1 },
  },
  {
    id: 'current_situation',
    title: '現在の状況について',
    subtitle: 'あなたに最適なサポートを提供するために',
    question: 'あなたの現在の状況を選んでください',
    type: 'card-select',
    psychological_trigger: 'social_proof',
    progress_weight: 20,
    options: [
      {
        id: 'student',
        label: '大学生・大学院生',
        description: '就活を始めたばかり、または準備中',
        icon: '🎓',
        value: 'student',
        psychological_appeal: 'belonging',
        color: 'bg-blue-50 border-blue-200 text-blue-900',
      },
      {
        id: 'recent_grad',
        label: '既卒・第二新卒',
        description: '卒業後の就職活動、転職活動',
        icon: '🚀',
        value: 'recent_grad',
        psychological_appeal: 'growth',
        color: 'bg-purple-50 border-purple-200 text-purple-900',
      },
      {
        id: 'career_change',
        label: 'キャリアチェンジ',
        description: '異業種・異職種への転職',
        icon: '🔄',
        value: 'career_change',
        psychological_appeal: 'aspiration',
        color: 'bg-green-50 border-green-200 text-green-900',
      },
      {
        id: 'skill_up',
        label: 'スキルアップ転職',
        description: '同業界でのステップアップ',
        icon: '📈',
        value: 'skill_up',
        psychological_appeal: 'status',
        color: 'bg-orange-50 border-orange-200 text-orange-900',
      },
    ],
  },
  {
    id: 'experience_level',
    title: 'あなたの経験',
    subtitle: '経験に合わせたアドバイスをお届け',
    question: '職歴・経験年数を教えてください',
    type: 'slider',
    psychological_trigger: 'authority',
    progress_weight: 30,
    validation: { min_value: 0, max_value: 20 },
  },
  {
    id: 'target_role',
    title: '理想の未来',
    subtitle: '9割の人が6ヶ月以内に目標達成',
    question: 'どのような職種を目指していますか？',
    type: 'text',
    psychological_trigger: 'commitment',
    progress_weight: 45,
    validation: { required: true, min_length: 2 },
  },
  {
    id: 'stress_level',
    title: '現在の気持ち',
    subtitle: 'あなたの状況に合わせてサポートします',
    question: '就活に対するストレスレベルはいかがですか？',
    type: 'card-select',
    psychological_trigger: 'curiosity',
    progress_weight: 60,
    options: [
      {
        id: 'low_stress',
        label: '😌 リラックス',
        description: 'まだ余裕があり、計画的に進めたい',
        value: 0.2,
        psychological_appeal: 'safety',
        color: 'bg-green-50 border-green-200 text-green-900',
      },
      {
        id: 'medium_stress',
        label: '😐 普通',
        description: '少し不安だが、前向きに取り組める',
        value: 0.5,
        psychological_appeal: 'belonging',
        color: 'bg-blue-50 border-blue-200 text-blue-900',
      },
      {
        id: 'high_stress',
        label: '😰 不安',
        description: 'かなり心配で、サポートが欲しい',
        value: 0.8,
        psychological_appeal: 'safety',
        color: 'bg-orange-50 border-orange-200 text-orange-900',
      },
    ],
  },
  {
    id: 'goals',
    title: 'あなたの目標',
    subtitle: '具体的な目標で成功率が3倍向上',
    question: '理想の年収や働き方を教えてください',
    type: 'multi-select',
    psychological_trigger: 'commitment',
    progress_weight: 80,
    options: [
      { id: 'salary_400', label: '年収400万円以上', value: 400, psychological_appeal: 'aspiration' },
      { id: 'salary_600', label: '年収600万円以上', value: 600, psychological_appeal: 'aspiration' },
      { id: 'salary_800', label: '年収800万円以上', value: 800, psychological_appeal: 'status' },
      { id: 'remote', label: 'リモートワーク', value: 'remote', psychological_appeal: 'safety' },
      { id: 'flexible', label: 'フレックス制度', value: 'flexible', psychological_appeal: 'safety' },
      { id: 'growth', label: '成長できる環境', value: 'growth', psychological_appeal: 'growth' },
    ],
  },
  {
    id: 'completion',
    title: '🎊 プロファイル完成！',
    subtitle: 'あなた専用のAIパイロットが準備できました',
    question: 'PathPilotがあなたの就活成功をサポートします',
    type: 'single-select',
    psychological_trigger: 'reciprocity',
    progress_weight: 100,
  },
];

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<OnboardingResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const step = onboardingSteps[currentStep];
  const progress = psychologyUtils.calculateProgressWeight(currentStep + 1, onboardingSteps.length);
  const isLastStep = currentStep === onboardingSteps.length - 1;

  // Handle answer change
  const handleAnswerChange = (value: any) => {
    setCurrentAnswer(value);
    
    // Validate answer
    if (step.validation) {
      const isRequired = step.validation.required && (!value || value.toString().trim() === '');
      const isTooShort = step.validation.min_length && value && value.length < step.validation.min_length;
      setIsValid(!isRequired && !isTooShort);
    } else {
      setIsValid(true);
    }
  };

  // Handle next step
  const handleNext = () => {
    if (!isValid) return;

    const response: OnboardingResponse = {
      step_id: step.id,
      answer: currentAnswer,
      timestamp: new Date().toISOString(),
      time_spent: Date.now() - startTime,
    };

    setResponses([...responses, response]);
    
    if (isLastStep) {
      // Complete onboarding
      console.log('Onboarding completed:', [...responses, response]);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      setCurrentStep(currentStep + 1);
      setCurrentAnswer(null);
      setIsValid(false);
      setStartTime(Date.now());
    }
  };

  // Handle back step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const previousResponse = responses[currentStep - 1];
      setCurrentAnswer(previousResponse?.answer || null);
      setIsValid(true);
    }
  };

  // Render different input types
  const renderInput = () => {
    switch (step.type) {
      case 'text':
        return (
          <motion.div {...animationUtils.entrance.slideInRight}>
            <input
              type="text"
              placeholder="例: 田中 太郎"
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="input-field-large text-center"
              autoFocus
            />
          </motion.div>
        );

      case 'card-select':
        return (
          <motion.div 
            className="grid grid-cols-1 gap-4"
            variants={animationUtils.stagger.container}
            initial="initial"
            animate="animate"
          >
            {step.options?.map((option) => (
              <motion.button
                key={option.id}
                variants={animationUtils.stagger.item}
                onClick={() => handleAnswerChange(option.value)}
                className={cn(
                  'p-6 rounded-2xl border-2 text-left transition-all duration-200 hover-lift',
                  currentAnswer === option.value 
                    ? 'border-primary-500 bg-primary-50 shadow-medium' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300 shadow-soft'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      {option.label}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {option.description}
                    </p>
                  </div>
                  {currentAnswer === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        );

      case 'slider':
        return (
          <motion.div {...animationUtils.entrance.fadeInUp} className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {currentAnswer || 0}年
              </div>
              <p className="text-neutral-600">
                {currentAnswer === 0 ? '新卒・未経験' : `${currentAnswer}年の実務経験`}
              </p>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={currentAnswer || 0}
              onChange={(e) => handleAnswerChange(parseInt(e.target.value))}
              className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-neutral-500">
              <span>0年</span>
              <span>15年+</span>
            </div>
          </motion.div>
        );

      case 'multi-select':
        return (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            variants={animationUtils.stagger.container}
            initial="initial"
            animate="animate"
          >
            {step.options?.map((option) => {
              const isSelected = Array.isArray(currentAnswer) 
                ? currentAnswer.includes(option.value)
                : false;
              
              return (
                <motion.button
                  key={option.id}
                  variants={animationUtils.stagger.item}
                  onClick={() => {
                    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                    const updated = isSelected
                      ? current.filter(v => v !== option.value)
                      : [...current, option.value];
                    handleAnswerChange(updated);
                  }}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all duration-200',
                    isSelected
                      ? 'border-accent-500 bg-accent-50 shadow-medium'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 shadow-soft'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-900">
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/30">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200/50">
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={cn(
              'p-2 rounded-full transition-colors duration-200',
              currentStep === 0 
                ? 'text-neutral-300 cursor-not-allowed' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-sm font-medium text-neutral-900">
            {currentStep + 1} / {onboardingSteps.length}
          </div>
          
          <div className="w-9 h-9" /> {/* Spacer */}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl font-bold text-neutral-900 mb-3">
                {step.title}
              </h1>
              {step.subtitle && (
                <p className="text-neutral-600 mb-8">
                  {step.subtitle}
                </p>
              )}
              <h2 className="text-xl font-medium text-neutral-800 mb-8">
                {step.question}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Input Area */}
          <div className="mb-12">
            {renderInput()}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={handleNext}
            disabled={!isValid}
            className={cn(
              'w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2',
              isValid
                ? 'btn-primary'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            )}
            whileHover={isValid ? { scale: 1.02 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
          >
            <span>{isLastStep ? 'はじめる' : '次へ'}</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Social Proof */}
          {currentStep > 0 && (
            <motion.div
              {...animationUtils.entrance.fadeInUp}
              className="text-center mt-8 p-4 bg-white/50 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-center space-x-6 text-sm text-neutral-600">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>2万人が利用中</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>平均3.2ヶ月で内定</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>満足度98%</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
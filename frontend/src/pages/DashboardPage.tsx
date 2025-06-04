import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Target, TrendingUp, Calendar, Clock, 
  Star, Award, ArrowRight, RefreshCw, Heart,
  User, Briefcase, MapPin, DollarSign, CheckCircle,
  Play, Pause, MoreVertical, Bell
} from 'lucide-react';
import { animationUtils, psychologyUtils, apiUtils, dateUtils, cn } from '@/utils';
import type { HopeExperience, User as UserType, Action } from '@/types';

// Mock data for development - replace with API calls
const mockUser: UserType = {
  id: "user_123",
  email: "user@example.com",
  profile: {
    name: "田中 美咲",
    current_role: "大学4年生",
    experience_years: 0,
    target_role: "ソフトウェアエンジニア",
    target_industry: "IT・テクノロジー",
    skills: ["JavaScript", "React", "Python"],
    education: "○○大学 情報工学部"
  },
  contexts: {
    emotional_state: {
      stress_level: 0.6,
      motivation_level: "medium",
      confidence_level: 0.7,
      last_updated: new Date().toISOString()
    },
    goals: {
      target_salary: 5000000,
      location_preference: "東京",
      work_style: "hybrid",
      timeline: "3ヶ月以内"
    }
  },
  subscription: {
    tier: "free",
    phase: "2",
    usage_limits: {
      daily_prompts: 5,
      daily_recommendations: 3,
      monthly_applications: 10,
      ai_analysis_credits: 20
    }
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const mockHopeExperience: HopeExperience = {
  hope_statement: "あなたは3ヶ月後、某大手IT企業から年収550万円の内定を獲得し、理想のエンジニアキャリアをスタートさせています。新卒らしい柔軟性と学習意欲が高く評価され、先輩エンジニアからも「将来有望な新人」として期待されています。",
  success_probability: "85%の確率で内定獲得が期待できます",
  similar_success_story: {
    id: "success_456",
    similarity_score: 0.92,
    key_similarities: [
      "同じ情報工学部出身",
      "JavaScriptとReactのスキル保有",
      "新卒でエンジニア職志望",
      "東京での就職希望"
    ],
    success_path: {
      key_actions: [
        "ポートフォリオサイトの作成と継続的な改善",
        "LeetCode問題を毎日2-3問解いてアルゴリズム力向上",
        "GitHubに個人プロジェクトを公開",
        "技術ブログで学習過程を発信",
        "企業研究を深めて志望動機を明確化"
      ],
      timeline: "3ヶ月",
      obstacles_overcome: [
        "技術面接での緊張を克服",
        "ポートフォリオの差別化",
        "企業選びの迷い"
      ],
      critical_moments: [
        "1次面接でのポートフォリオプレゼン",
        "技術面接でのライブコーディング",
        "最終面接での将来ビジョン共有"
      ]
    },
    concrete_outcomes: {
      offer_received: true,
      salary_achieved: 5500000,
      timeline_to_offer: 87,
      company_name: "某大手IT企業"
    }
  },
  next_action: {
    id: "action_123",
    description: "GitHubプロフィールの充実とポートフォリオリポジトリの整理",
    priority: "high",
    estimated_time: "2時間",
    expected_impact: "技術力の証明と採用担当者への印象向上"
  },
  evidence_preview: "同様の背景を持つ127人中108人が目標達成。特にポートフォリオと技術ブログを組み合わせた場合の成功率は94%です。",
  confidence_boost_expected: 0.85
};

// Header with user greeting and motivation
const DashboardHeader: React.FC<{ user: UserType }> = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "おはようございます";
    if (hour < 18) return "こんにちは";
    return "こんばんは";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "今日も一歩ずつ、理想の未来に近づいています",
      "あなたの努力は必ず実を結びます",
      "新しい可能性が待っています",
      "今日が人生を変える日になるかもしれません"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white p-6 rounded-2xl mb-8"
      {...animationUtils.entrance.fadeInUp}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <motion.h1 
            className="text-2xl lg:text-3xl font-bold mb-2"
            {...animationUtils.entrance.slideInRight}
          >
            {getGreeting()}、{user.profile.name}さん
          </motion.h1>
          <motion.p 
            className="text-primary-100 text-lg"
            {...animationUtils.entrance.slideInRight}
            transition={{ delay: 0.1 }}
          >
            {getMotivationalMessage()}
          </motion.p>
        </div>
        
        <motion.div 
          className="flex items-center space-x-4"
          {...animationUtils.entrance.scaleIn}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-300">
              {Math.round((1 - user.contexts.emotional_state.stress_level) * 100)}%
            </div>
            <div className="text-sm text-primary-200">コンディション</div>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-hope" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Hope Experience Card - main feature
const HopeExperienceCard: React.FC<{ hopeExperience: HopeExperience }> = ({ hopeExperience }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="card p-8 bg-gradient-to-br from-white via-accent-50/30 to-hope/5 border border-accent-200/50 mb-8"
      {...animationUtils.entrance.fadeInUp}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-hope rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">あなたの希望体験</h2>
            <p className="text-neutral-600">AI生成 • 更新: {dateUtils.formatRelative(new Date())}</p>
          </div>
        </div>
        
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreVertical className="w-5 h-5 text-neutral-600" />
        </motion.button>
      </div>

      {/* Hope Statement */}
      <motion.div 
        className="bg-white rounded-xl p-6 mb-6 border border-neutral-200"
        {...animationUtils.entrance.scaleIn}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-hope/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Star className="w-4 h-4 text-hope fill-current" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-neutral-900 mb-3">3ヶ月後のあなた</h3>
            <p className="text-neutral-700 leading-relaxed text-lg">
              {hopeExperience.hope_statement}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Success Probability */}
      <motion.div 
        className="grid md:grid-cols-2 gap-6 mb-6"
        variants={animationUtils.stagger.container}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          variants={animationUtils.stagger.item}
          className="bg-success-50 border border-success-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="w-6 h-6 text-success-600" />
            <h4 className="font-semibold text-success-900">成功確率</h4>
          </div>
          <div className="text-2xl font-bold text-success-700 mb-2">85%</div>
          <p className="text-success-600 text-sm">{hopeExperience.success_probability}</p>
        </motion.div>

        <motion.div 
          variants={animationUtils.stagger.item}
          className="bg-primary-50 border border-primary-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Award className="w-6 h-6 text-primary-600" />
            <h4 className="font-semibold text-primary-900">類似成功例</h4>
          </div>
          <div className="text-2xl font-bold text-primary-700 mb-2">
            {Math.round(hopeExperience.similar_success_story.similarity_score * 100)}%
          </div>
          <p className="text-primary-600 text-sm">あなたとの類似度</p>
        </motion.div>
      </motion.div>

      {/* Expandable Evidence */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-50 rounded-xl p-6 mb-6"
          >
            <h4 className="font-semibold text-neutral-900 mb-4">詳細な根拠データ</h4>
            <p className="text-neutral-700 mb-4">{hopeExperience.evidence_preview}</p>
            
            <div className="space-y-3">
              <h5 className="font-medium text-neutral-800">類似点:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hopeExperience.similar_success_story.key_similarities.map((similarity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    <span className="text-sm text-neutral-700">{similarity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.button
        className="w-full btn-primary flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>詳細な成功パスを確認</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

// Next Actions Card
const NextActionsCard: React.FC<{ action: Action }> = ({ action }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-700';
      case 'medium': return 'border-accent-200 bg-accent-50 text-accent-700';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-700';
      default: return 'border-neutral-200 bg-neutral-50 text-neutral-700';
    }
  };

  return (
    <motion.div 
      className="card p-6 mb-6"
      {...animationUtils.entrance.fadeInUp}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-neutral-900">今日のアクション</h3>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getPriorityColor(action.priority)
        )}>
          {action.priority === 'high' ? '高優先度' : action.priority === 'medium' ? '中優先度' : '低優先度'}
        </div>
      </div>

      <div className="bg-neutral-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <motion.button
            onClick={() => setIsCompleted(!isCompleted)}
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-200",
              isCompleted 
                ? "bg-success-500 border-success-500" 
                : "border-neutral-300 hover:border-success-400"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isCompleted && (
              <motion.svg 
                className="w-4 h-4 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.3 }}
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </motion.svg>
            )}
          </motion.button>

          <div className="flex-1">
            <h4 className={cn(
              "font-medium mb-2 transition-all duration-200",
              isCompleted ? "text-neutral-500 line-through" : "text-neutral-900"
            )}>
              {action.description}
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>所要時間: {action.estimated_time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>期待効果: {action.expected_impact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-success-50 border border-success-200 rounded-xl p-4"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <span className="text-success-800 font-medium">素晴らしい！次のアクションが準備されました</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Quick Stats Dashboard
const QuickStatsCard: React.FC<{ user: UserType }> = ({ user }) => {
  const stats = [
    {
      icon: Target,
      label: "目標達成率",
      value: "76%",
      change: "+12%",
      color: "text-success-600 bg-success-50"
    },
    {
      icon: Calendar,
      label: "活動日数",
      value: "23日",
      change: "継続中",
      color: "text-primary-600 bg-primary-50"
    },
    {
      icon: TrendingUp,
      label: "成長スコア",
      value: "850",
      change: "+45",
      color: "text-accent-600 bg-accent-50"
    },
    {
      icon: Heart,
      label: "モチベーション",
      value: user.contexts.emotional_state.motivation_level === 'high' ? '高' : user.contexts.emotional_state.motivation_level === 'medium' ? '中' : '低',
      change: "安定",
      color: "text-hope bg-hope/10"
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      variants={animationUtils.stagger.container}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={animationUtils.stagger.item}
          className="card p-4"
        >
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.color)}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
          <div className="text-sm text-neutral-600 mb-1">{stat.label}</div>
          <div className="text-xs text-success-600">{stat.change}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main Dashboard Component
const DashboardPage: React.FC = () => {
  const [user] = useState(mockUser);
  const [hopeExperience] = useState(mockHopeExperience);
  const [isLoading, setIsLoading] = useState(false);

  const refreshHopeExperience = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-8">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-neutral-900">PathPilot</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={refreshHopeExperience}
                disabled={isLoading}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RefreshCw className={cn("w-5 h-5 text-neutral-600", isLoading && "animate-spin")} />
              </motion.button>
              
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200">
                <Bell className="w-5 h-5 text-neutral-600" />
              </button>
              
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200">
                <User className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <DashboardHeader user={user} />
          <QuickStatsCard user={user} />
          <HopeExperienceCard hopeExperience={hopeExperience} />
          <NextActionsCard action={hopeExperience.next_action} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
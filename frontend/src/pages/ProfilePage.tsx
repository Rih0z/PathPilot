import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Briefcase, MapPin, DollarSign, 
  Edit, Save, X, Settings, Star, TrendingUp,
  Calendar, Clock, Award, Target, Heart,
  ChevronRight, Sparkles, Shield, Bell
} from 'lucide-react';
import { animationUtils, psychologyUtils, validationUtils, cn } from '@/utils';
import type { User as UserType, UserPreferences } from '@/types';

// Mock user data
const mockUser: UserType = {
  id: "user_123",
  email: "tanaka.misaki@example.com",
  profile: {
    name: "田中 美咲",
    current_role: "大学4年生",
    experience_years: 0,
    target_role: "ソフトウェアエンジニア",
    target_industry: "IT・テクノロジー",
    skills: ["JavaScript", "React", "Python", "Git"],
    education: "○○大学 情報工学部"
  },
  contexts: {
    emotional_state: {
      stress_level: 0.4,
      motivation_level: "high",
      confidence_level: 0.8,
      last_updated: new Date().toISOString()
    },
    goals: {
      target_salary: 5500000,
      location_preference: "東京",
      work_style: "hybrid",
      timeline: "3ヶ月以内"
    },
    preferences: {
      communication_style: "encouraging",
      prompt_length: "medium",
      feedback_type: "gentle",
      privacy_level: "open"
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
  created_at: "2024-01-15T00:00:00Z",
  updated_at: new Date().toISOString()
};

// Profile Header Component
const ProfileHeader: React.FC<{ user: UserType }> = ({ user }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-primary-900 to-primary-700 text-white rounded-2xl p-8 mb-8"
      {...animationUtils.entrance.fadeInUp}
    >
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Avatar */}
        <motion.div 
          className="relative"
          {...animationUtils.entrance.scaleIn}
          transition={{ delay: 0.1 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-accent-400 to-hope rounded-full flex items-center justify-center text-3xl font-bold">
            {user.profile.name.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-current" />
          </div>
        </motion.div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            {...animationUtils.entrance.slideInRight}
            transition={{ delay: 0.2 }}
          >
            {user.profile.name}
          </motion.h1>
          <motion.p 
            className="text-primary-100 text-lg mb-4"
            {...animationUtils.entrance.slideInRight}
            transition={{ delay: 0.3 }}
          >
            {user.profile.current_role} → {user.profile.target_role}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm"
            {...animationUtils.entrance.slideInRight}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary-200" />
              <span className="text-primary-100">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary-200" />
              <span className="text-primary-100">{user.contexts.goals.location_preference}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-primary-200" />
              <span className="text-primary-100">開始: 2024年1月</span>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-2 gap-4 text-center"
          {...animationUtils.entrance.scaleIn}
          transition={{ delay: 0.5 }}
        >
          <div>
            <div className="text-2xl font-bold text-accent-300">850</div>
            <div className="text-sm text-primary-200">成長スコア</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-hope">23</div>
            <div className="text-sm text-primary-200">活動日数</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Editable Profile Section
const EditableProfileSection: React.FC<{ user: UserType; onSave: (data: any) => void }> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.profile.name,
    target_role: user.profile.target_role,
    target_industry: user.profile.target_industry,
    skills: user.profile.skills?.join(', ') || '',
    education: user.profile.education || ''
  });

  const handleSave = () => {
    const updatedData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
    };
    onSave(updatedData);
    setIsEditing(false);
  };

  return (
    <motion.div 
      className="card p-6 mb-8"
      {...animationUtils.entrance.fadeInUp}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">プロフィール情報</h2>
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors duration-200",
            isEditing 
              ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200" 
              : "bg-primary-100 text-primary-700 hover:bg-primary-200"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          <span>{isEditing ? 'キャンセル' : '編集'}</span>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">お名前</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">目標職種</label>
                <input
                  type="text"
                  value={formData.target_role}
                  onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">希望業界</label>
                <input
                  type="text"
                  value={formData.target_industry}
                  onChange={(e) => setFormData({ ...formData, target_industry: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">学歴</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">スキル（カンマ区切り）</label>
              <textarea
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="input-field resize-none h-24"
                placeholder="JavaScript, React, Python, Git..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
              >
                キャンセル
              </button>
              <motion.button
                onClick={handleSave}
                className="btn-primary px-6 py-2 flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4" />
                <span>保存</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="viewing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">基本情報</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-700">{user.profile.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-700">{user.profile.target_role}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-700">{user.profile.target_industry}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-neutral-900 mb-2">スキル・経験</h3>
                <div className="flex flex-wrap gap-2">
                  {user.profile.skills?.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {user.profile.education && (
                  <p className="text-neutral-600 text-sm mt-3">{user.profile.education}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Goals and Preferences Section
const GoalsSection: React.FC<{ user: UserType }> = ({ user }) => {
  const formatSalary = (salary: number) => {
    return `${Math.floor(salary / 10000)}万円`;
  };

  const getWorkStyleLabel = (style: string) => {
    const labels = {
      'office': 'オフィス勤務',
      'remote': 'リモートワーク',
      'hybrid': 'ハイブリッド'
    };
    return labels[style as keyof typeof labels] || style;
  };

  return (
    <motion.div 
      className="card p-6 mb-8"
      {...animationUtils.entrance.fadeInUp}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">目標設定</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-accent-50 rounded-xl">
          <DollarSign className="w-8 h-8 text-accent-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-accent-700">
            {formatSalary(user.contexts.goals.target_salary)}
          </div>
          <div className="text-sm text-accent-600">目標年収</div>
        </div>

        <div className="text-center p-4 bg-primary-50 rounded-xl">
          <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <div className="text-lg font-bold text-primary-700">
            {user.contexts.goals.location_preference}
          </div>
          <div className="text-sm text-primary-600">希望勤務地</div>
        </div>

        <div className="text-center p-4 bg-success-50 rounded-xl">
          <Briefcase className="w-8 h-8 text-success-600 mx-auto mb-3" />
          <div className="text-lg font-bold text-success-700">
            {getWorkStyleLabel(user.contexts.goals.work_style)}
          </div>
          <div className="text-sm text-success-600">働き方</div>
        </div>

        <div className="text-center p-4 bg-hope/10 rounded-xl">
          <Clock className="w-8 h-8 text-hope mx-auto mb-3" />
          <div className="text-lg font-bold text-hope">
            {user.contexts.goals.timeline}
          </div>
          <div className="text-sm text-hope">目標期限</div>
        </div>
      </div>
    </motion.div>
  );
};

// Emotional State and Wellness Section
const WellnessSection: React.FC<{ user: UserType }> = ({ user }) => {
  const getStressLevelLabel = (level: number) => {
    if (level < 0.3) return { label: '低', color: 'text-success-600', bg: 'bg-success-50' };
    if (level < 0.7) return { label: '中', color: 'text-accent-600', bg: 'bg-accent-50' };
    return { label: '高', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getMotivationColor = (level: string) => {
    const colors = {
      'low': 'text-red-600 bg-red-50',
      'medium': 'text-accent-600 bg-accent-50',
      'high': 'text-success-600 bg-success-50'
    };
    return colors[level as keyof typeof colors] || colors.medium;
  };

  const stressLevel = getStressLevelLabel(user.contexts.emotional_state.stress_level);

  return (
    <motion.div 
      className="card p-6 mb-8"
      {...animationUtils.entrance.fadeInUp}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">コンディション</h2>
        <div className="text-sm text-neutral-500">
          最終更新: {new Date(user.contexts.emotional_state.last_updated).toLocaleDateString('ja-JP')}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={cn("text-center p-6 rounded-xl", stressLevel.bg)}>
          <Heart className={cn("w-8 h-8 mx-auto mb-3", stressLevel.color)} />
          <div className={cn("text-2xl font-bold mb-1", stressLevel.color)}>
            {stressLevel.label}
          </div>
          <div className={cn("text-sm", stressLevel.color)}>ストレスレベル</div>
          <div className="mt-3 w-full bg-white rounded-full h-2">
            <div 
              className="bg-current h-2 rounded-full transition-all duration-500"
              style={{ width: `${user.contexts.emotional_state.stress_level * 100}%` }}
            />
          </div>
        </div>

        <div className={cn("text-center p-6 rounded-xl", getMotivationColor(user.contexts.emotional_state.motivation_level))}>
          <TrendingUp className="w-8 h-8 mx-auto mb-3" />
          <div className="text-2xl font-bold mb-1">
            {user.contexts.emotional_state.motivation_level === 'high' ? '高' : 
             user.contexts.emotional_state.motivation_level === 'medium' ? '中' : '低'}
          </div>
          <div className="text-sm">モチベーション</div>
        </div>

        <div className="text-center p-6 bg-primary-50 rounded-xl">
          <Target className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-primary-700 mb-1">
            {Math.round(user.contexts.emotional_state.confidence_level * 100)}%
          </div>
          <div className="text-sm text-primary-600">自信レベル</div>
          <div className="mt-3 w-full bg-white rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${user.contexts.emotional_state.confidence_level * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Subscription and Usage Section
const SubscriptionSection: React.FC<{ user: UserType }> = ({ user }) => {
  const usagePercentage = (used: number, limit: number) => (used / limit) * 100;

  return (
    <motion.div 
      className="card p-6"
      {...animationUtils.entrance.fadeInUp}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">利用状況</h2>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          user.subscription.tier === 'premium' 
            ? "bg-hope/20 text-hope" 
            : "bg-neutral-100 text-neutral-600"
        )}>
          {user.subscription.tier === 'premium' ? 'プレミアム' : 'フリー'}プラン
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">日次プロンプト</span>
            <span className="text-sm font-medium text-neutral-900">
              3/{user.subscription.usage_limits.daily_prompts}
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${usagePercentage(3, user.subscription.usage_limits.daily_prompts)}%` }}
            />
          </div>
        </div>

        <div className="bg-neutral-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">推奨事項</span>
            <span className="text-sm font-medium text-neutral-900">
              2/{user.subscription.usage_limits.daily_recommendations}
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div 
              className="bg-accent-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${usagePercentage(2, user.subscription.usage_limits.daily_recommendations)}%` }}
            />
          </div>
        </div>

        <div className="bg-neutral-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">月次応募</span>
            <span className="text-sm font-medium text-neutral-900">
              7/{user.subscription.usage_limits.monthly_applications}
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div 
              className="bg-success-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${usagePercentage(7, user.subscription.usage_limits.monthly_applications)}%` }}
            />
          </div>
        </div>

        <div className="bg-neutral-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-neutral-600">AI分析</span>
            <span className="text-sm font-medium text-neutral-900">
              12/{user.subscription.usage_limits.ai_analysis_credits}
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div 
              className="bg-hope h-2 rounded-full transition-all duration-500"
              style={{ width: `${usagePercentage(12, user.subscription.usage_limits.ai_analysis_credits)}%` }}
            />
          </div>
        </div>
      </div>

      {user.subscription.tier === 'free' && (
        <motion.div 
          className="mt-6 bg-gradient-to-r from-accent-50 to-hope/10 border border-accent-200 rounded-xl p-6"
          {...animationUtils.entrance.scaleIn}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-accent-900 mb-2">プレミアムで更なる成長を</h3>
              <p className="text-accent-700 text-sm">
                無制限のAI分析、高度な成功パターン解析、専属メンターサポート
              </p>
            </div>
            <motion.button
              className="btn-primary px-6 py-3 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>アップグレード</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Profile Page Component
const ProfilePage: React.FC = () => {
  const [user, setUser] = useState(mockUser);

  const handleProfileSave = (data: any) => {
    setUser(prev => ({
      ...prev,
      profile: { ...prev.profile, ...data },
      updated_at: new Date().toISOString()
    }));
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
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200">
                <Settings className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200">
                <Bell className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <ProfileHeader user={user} />
          <EditableProfileSection user={user} onSave={handleProfileSave} />
          <GoalsSection user={user} />
          <WellnessSection user={user} />
          <SubscriptionSection user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
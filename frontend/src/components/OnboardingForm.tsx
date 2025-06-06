import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Smile, Frown } from 'lucide-react';
import type { UserType, UserContext } from '@/types';
import { onboardingTexts, fieldValidators } from '@/constants';

interface OnboardingFormProps {
  userType: UserType;
  userContext: UserContext;
  onUserContextUpdate: (updates: Partial<UserContext>) => void;
  onBack: () => void;
  onComplete: () => void;
}

// PathPilot UI/UX完全実装仕様書準拠のオンボーディング画面（S002）
const OnboardingForm: React.FC<OnboardingFormProps> = ({ 
  userType, 
  userContext, 
  onUserContextUpdate, 
  onBack, 
  onComplete 
}) => {
  // バリデーション状態
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // フィールド更新ハンドラー
  const handleFieldChange = (field: keyof UserContext, value: string | number) => {
    onUserContextUpdate({ [field]: value });
    
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // バリデーション実行
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // 共通必須フィールド
    if (!userContext.targetJob.trim()) {
      newErrors.targetJob = '必須項目です';
    }
    
    // ユーザータイプ別の必須フィールド
    if (userType === 'career') {
      if (!userContext.currentJob.trim()) {
        newErrors.currentJob = '必須項目です';
      }
      if (!userContext.experience.trim()) {
        newErrors.experience = '必須項目です';
      } else if (!fieldValidators.experience(userContext.experience)) {
        newErrors.experience = '0-50の数値で入力してください';
      }
    } else {
      if (!userContext.university.trim()) {
        newErrors.university = '必須項目です';
      }
      if (!userContext.major.trim()) {
        newErrors.major = '必須項目です';
      }
      if (!userContext.graduationYear.trim()) {
        newErrors.graduationYear = '必須項目です';
      } else if (!fieldValidators.graduationYear(userContext.graduationYear)) {
        newErrors.graduationYear = '有効な卒業年を入力してください';
      }
    }
    
    // 給与のバリデーション
    if (userContext.targetSalary && !fieldValidators.targetSalary(userContext.targetSalary)) {
      newErrors.targetSalary = '有効な金額を入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信ハンドラー
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete();
    }
  };

  // バリデーション状態の更新
  useEffect(() => {
    const commonValid = userContext.targetJob.trim() !== '';
    
    let typeSpecificValid = false;
    if (userType === 'career') {
      typeSpecificValid = userContext.currentJob.trim() !== '' && 
                         userContext.experience.trim() !== '';
    } else {
      typeSpecificValid = userContext.university.trim() !== '' && 
                         userContext.major.trim() !== '' && 
                         userContext.graduationYear.trim() !== '';
    }
    
    setIsValid(commonValid && typeSpecificValid);
  }, [userType, userContext]);

  // ストレスレベルのテキスト取得
  const getStressLevelText = (level: number) => {
    if (level <= 2) return onboardingTexts.stressLevelText[0];
    if (level === 3) return onboardingTexts.stressLevelText[1];
    return onboardingTexts.stressLevelText[2];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* 戻るボタン */}
        <button
          onClick={() => {
            onBack();
          }}
          className="mb-6 text-gray-600 hover:text-gray-800 flex items-center group"
        >
          <ChevronRight className="w-5 h-5 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>{onboardingTexts.backButton}</span>
        </button>

        {/* ヘッダー */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {onboardingTexts.title[userType] || onboardingTexts.title.student}
          </h1>
          <p className="text-xl text-gray-600">{onboardingTexts.subtitle}</p>
          <p className="text-lg text-blue-600 font-semibold mt-2">{onboardingTexts.subsubtitle}</p>
        </motion.div>

        {/* フォーム */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* 学生・新卒用フィールド */}
          {userType !== 'career' && (
            <>
              {/* 学校名 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {onboardingTexts.labels.university} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userContext.university}
                  onChange={(e) => handleFieldChange('university', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.university ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={onboardingTexts.placeholders.university}
                />
                {errors.university && (
                  <p className="text-red-500 text-sm mt-1">{errors.university}</p>
                )}
              </div>

              {/* 学部・学科・専攻 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {onboardingTexts.labels.major} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userContext.major}
                  onChange={(e) => handleFieldChange('major', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.major ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={onboardingTexts.placeholders.major}
                />
                {errors.major && (
                  <p className="text-red-500 text-sm mt-1">{errors.major}</p>
                )}
              </div>

              {/* 卒業予定年 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {onboardingTexts.labels.graduationYear} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={userContext.graduationYear}
                  onChange={(e) => handleFieldChange('graduationYear', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.graduationYear ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={onboardingTexts.placeholders.graduationYear}
                />
                {errors.graduationYear && (
                  <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>
                )}
              </div>

              {/* インターン経験 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {onboardingTexts.labels.internExperience}
                </label>
                <textarea
                  value={userContext.internExperience}
                  onChange={(e) => handleFieldChange('internExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  rows={3}
                  placeholder={onboardingTexts.placeholders.internExperience}
                />
              </div>
            </>
          )}

          {/* 転職者用フィールド */}
          {userType === 'career' && (
            <>
              {/* 現在の職種 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {onboardingTexts.labels.currentJob} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={userContext.currentJob}
                  onChange={(e) => handleFieldChange('currentJob', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.currentJob ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={onboardingTexts.placeholders.currentJob}
                />
                {errors.currentJob && (
                  <p className="text-red-500 text-sm mt-1">{errors.currentJob}</p>
                )}
              </div>

              {/* 経験年数 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  {onboardingTexts.labels.experience} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={userContext.experience}
                  onChange={(e) => handleFieldChange('experience', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.experience ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={onboardingTexts.placeholders.experience}
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                )}
              </div>
            </>
          )}

          {/* 共通フィールド */}
          {/* 希望職種 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              {onboardingTexts.labels.targetJob} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={userContext.targetJob}
              onChange={(e) => handleFieldChange('targetJob', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.targetJob ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder={
                userType === 'career' 
                  ? onboardingTexts.placeholders.targetJob.career
                  : onboardingTexts.placeholders.targetJob.student
              }
            />
            {errors.targetJob && (
              <p className="text-red-500 text-sm mt-1">{errors.targetJob}</p>
            )}
          </div>

          {/* 希望給与 */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              {userType === 'career' 
                ? onboardingTexts.labels.targetSalary.career
                : onboardingTexts.labels.targetSalary.student
              }
            </label>
            <input
              type="number"
              value={userContext.targetSalary}
              onChange={(e) => handleFieldChange('targetSalary', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.targetSalary ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder={
                userType === 'career' 
                  ? onboardingTexts.placeholders.targetSalary.career
                  : onboardingTexts.placeholders.targetSalary.student
              }
            />
            {errors.targetSalary && (
              <p className="text-red-500 text-sm mt-1">{errors.targetSalary}</p>
            )}
          </div>

          {/* ストレスレベル */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              {userType === 'career' 
                ? onboardingTexts.labels.stressLevel.career
                : onboardingTexts.labels.stressLevel.student
              }
            </label>
            <div className="flex items-center justify-between mb-2">
              <Smile className="w-8 h-8 text-green-500" />
              <input
                type="range"
                min="1"
                max="5"
                value={userContext.stressLevel}
                onChange={(e) => handleFieldChange('stressLevel', parseInt(e.target.value))}
                className="flex-1 mx-4"
              />
              <Frown className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-center text-sm text-gray-600">
              {getStressLevelText(userContext.stressLevel)}
            </p>
          </div>

          {/* 今の気持ち */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              {onboardingTexts.labels.emotionalState}
            </label>
            <textarea
              value={userContext.emotionalState}
              onChange={(e) => handleFieldChange('emotionalState', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={3}
              placeholder={
                userType === 'career' 
                  ? onboardingTexts.placeholders.emotionalState.career
                  : onboardingTexts.placeholders.emotionalState.student
              }
            />
          </div>

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
              isValid
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {onboardingTexts.submitButton}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default OnboardingForm;
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, UserCheck, Briefcase } from 'lucide-react';
import type { UserType } from '@/types';
import { userTypeTexts } from '@/constants';

interface UserTypeSelectionProps {
  onUserTypeSelect: (userType: UserType) => void;
  selectedType: UserType;
}

// PathPilot UI/UX完全実装仕様書準拠のユーザータイプ選択画面（S001）
const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ 
  onUserTypeSelect, 
  selectedType 
}) => {
  // カード出現アニメーション
  const cardAppear = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.4,
      stagger: 0.1
    }
  };

  // カードデータ定義
  const cards = [
    {
      type: 'student' as UserType,
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
      borderGradient: 'hover:border-blue-200'
    },
    {
      type: 'newgrad' as UserType,
      icon: UserCheck,
      gradient: 'from-purple-500 to-pink-500',
      borderGradient: 'hover:border-purple-200'
    },
    {
      type: 'career' as UserType,
      icon: Briefcase,
      gradient: 'from-orange-500 to-red-500',
      borderGradient: 'hover:border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー部分 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-20 h-20 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {userTypeTexts.title}
          </h1>
          <p className="text-xl text-gray-600">
            {userTypeTexts.subtitle}
          </p>
        </motion.div>

        {/* カードグリッド */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="initial"
          animate="animate"
        >
          {cards.map((card, index) => {
            const cardData = userTypeTexts.cards[card.type];
            const IconComponent = card.icon;

            return (
              <motion.button
                key={card.type}
                onClick={() => onUserTypeSelect(card.type)}
                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all text-center group border border-gray-200 ${card.borderGradient}`}
                variants={cardAppear}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* アイコン */}
                <div className={`w-20 h-20 bg-gradient-to-r ${card.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>

                {/* タイトル */}
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {cardData.title}
                </h3>

                {/* 説明文 */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {cardData.description}
                </p>

                {/* ホバーテキスト */}
                <div className="text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {cardData.hoverText}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* フッター情報（任意） */}
        <motion.div 
          className="text-center mt-12 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <p>あなたの状況に最も近いものを選択してください</p>
        </motion.div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
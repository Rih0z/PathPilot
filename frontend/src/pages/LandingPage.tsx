import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Users, TrendingUp, Shield, Sparkles, Target, Heart, ArrowRight } from 'lucide-react';
import { animationUtils, psychologyUtils, responsiveUtils, cn } from '@/utils';

// Hero section
const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-hope/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-700/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Main Message */}
          <motion.div 
            className="text-center lg:text-left"
            {...animationUtils.entrance.fadeInUp}
          >
            {/* Product Status Badge */}
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm mb-8"
              {...animationUtils.entrance.scaleIn}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-hope mr-2" />
              <span>AI就活サポートツール（開発中）</span>
              <Star className="w-4 h-4 text-hope ml-2" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              {...animationUtils.entrance.fadeInUp}
              transition={{ delay: 0.3 }}
            >
              あなたの就活に
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hope via-accent-400 to-success-400">
                希望の光を
              </span>
            </motion.h1>

            {/* Sub Headline */}
            <motion.p 
              className="text-xl text-white/80 mb-8 leading-relaxed"
              {...animationUtils.entrance.fadeInUp}
              transition={{ delay: 0.4 }}
            >
              AIがあなただけの成功パターンを発見し、<br className="hidden sm:block" />
              具体的な希望体験をお届けします
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              {...animationUtils.entrance.fadeInUp}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="/onboarding"
                className="btn-primary-glow text-lg px-8 py-4 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>デモを体験する</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              
              <motion.button
                className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const features = document.querySelector('#features');
                  features?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>機能を詳しく見る</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Product Preview */}
          <motion.div 
            className="relative"
            {...animationUtils.entrance.slideInRight}
            transition={{ delay: 0.4 }}
          >
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-lg mx-auto">
              <div className="text-center">
                {/* Product Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-hope rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  🎯
                </div>

                {/* Product Description */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  PathPilot
                </h3>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  AI技術を活用した就活サポートプラットフォーム。あなたの状況に合わせたパーソナライズされたアドバイスとガイダンスを提供します。
                </p>

                {/* Development Status */}
                <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                  <div className="flex items-center justify-center space-x-2 text-accent-300">
                    <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">現在開発中</span>
                  </div>
                  <p className="text-white/70 text-sm mt-2">
                    デモ版で基本機能をお試しいただけます
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        {...animationUtils.microInteractions.iconBounce}
      >
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

// Features section
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "🎯",
      title: "パーソナライズドAI",
      description: "あなたの状況、性格、目標を分析して、カスタマイズされたアドバイスを提供",
      benefit: "迷いがなくなり、確信を持って行動できる",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: "✨",
      title: "希望体験生成",
      description: "成功パターンをもとに、あなたの未来の希望的な体験を具体的に描写",
      benefit: "不安が希望に変わり、モチベーションが続く",
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: "📊",
      title: "成功パターン分析",
      description: "様々な成功事例から、あなたと似た状況の人の成功パターンを発見",
      benefit: "何をすべきかが明確になり、迷わず行動できる",
      color: "from-success-500 to-success-600"
    },
    {
      icon: "🚀",
      title: "ステップバイステップ",
      description: "目標達成まで毎日やるべきことを具体的に指示。進捗に応じて戦略も調整",
      benefit: "圧倒される感覚がなくなり、着実に前進できる",
      color: "from-hope to-accent-400"
    }
  ];

  return (
    <section id="features" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          {...animationUtils.entrance.fadeInUp}
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            なぜPathPilotで
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              希望が見える
            </span>
            のか？
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            心理学とAI技術を組み合わせ、あなたの就活体験を根本から変える4つの革新
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={animationUtils.stagger.container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={animationUtils.stagger.item}
              className="group"
            >
              <div className="card hover-lift p-8 h-full bg-white border border-neutral-200 hover:border-primary-200 transition-all duration-300">
                {/* Icon and gradient background */}
                <div className="relative mb-6">
                  <div className={cn(
                    "absolute inset-0 w-16 h-16 bg-gradient-to-r rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300",
                    feature.color
                  )} />
                  <div className="relative w-16 h-16 flex items-center justify-center text-3xl">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefit callout */}
                <div className="bg-gradient-to-r from-success-50 to-hope/5 border border-success-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-success-800 font-medium text-sm">
                      {feature.benefit}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// About section
const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          {...animationUtils.entrance.fadeInUp}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            PathPilotについて
          </h2>
          <div className="text-lg text-white/90 leading-relaxed space-y-4">
            <p>
              PathPilotは、AI技術を活用して就職活動をサポートするプラットフォームです。
              現在開発中のプロダクトで、心理学的アプローチとデータ分析を組み合わせ、
              ユーザーに最適化されたキャリアガイダンスを提供することを目指しています。
            </p>
            <p>
              デモ版では基本機能をお試しいただけます。
              フィードバックや改善提案をお待ちしております。
            </p>
          </div>
          
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <div className="flex items-center justify-center space-x-2 text-accent-300 mb-2">
              <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">開発ステータス</span>
            </div>
            <p className="text-white/80 text-sm">
              現在アルファ版として開発中です。基本機能のデモをご利用いただけます。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Final CTA section
const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent-500 via-accent-600 to-hope">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          {...animationUtils.entrance.fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            今すぐデモを体験して、
            <br className="sm:hidden" />
            新しい就活の可能性を
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            無料でデモをお試しいただけます。<br className="hidden sm:block" />
            3分で設定完了、すぐにパーソナライズされた体験をお届けします。
          </p>

          <motion.a
            href="/onboarding"
            className="inline-flex items-center bg-white text-accent-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-neutral-50 transition-colors duration-200 space-x-3 shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6" />
            <span>デモを体験する</span>
            <ChevronRight className="w-6 h-6" />
          </motion.a>

          <div className="mt-6 text-white/80 text-sm">
            開発中のプロダクトです。フィードバックをお聞かせください
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Landing Page component
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
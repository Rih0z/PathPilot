import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Users, TrendingUp, Shield, Sparkles, Target, Heart, ArrowRight } from 'lucide-react';
import { animationUtils, psychologyUtils, responsiveUtils, cn } from '@/utils';

// Hero section with psychological hooks
const HeroSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "田中 美咲さん",
      role: "ITエンジニア転職成功",
      company: "某大手IT企業",
      message: "3ヶ月で年収400万→650万にアップ！PathPilotのAIアドバイスが的確すぎて驚きました",
      rating: 5,
      image: "👩‍💻"
    },
    {
      name: "佐藤 健太さん", 
      role: "新卒就活成功",
      company: "大手商社",
      message: "就活の不安が希望に変わりました。AIが私だけの成功パターンを見つけてくれた",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "山田 あやさん",
      role: "キャリアチェンジ成功", 
      company: "スタートアップCMO",
      message: "未経験からマーケ職へ転職。PathPilotなしでは無理でした",
      rating: 5,
      image: "👩‍🎨"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
            {/* Social Proof Badge */}
            <motion.div 
              className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm mb-8"
              {...animationUtils.entrance.scaleIn}
              transition={{ delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-hope mr-2 fill-current" />
              <span>2万人以上が就活成功を実現</span>
              <Sparkles className="w-4 h-4 text-hope ml-2" />
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

            {/* Key Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mb-8"
              variants={animationUtils.stagger.container}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
            >
              {[
                { label: "平均内定期間", value: "3.2ヶ月", icon: Target },
                { label: "成功率", value: "94.5%", icon: TrendingUp },
                { label: "満足度", value: "98%", icon: Heart }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  variants={animationUtils.stagger.item}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-accent-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

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
                <span>無料で希望体験を始める</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              
              <motion.button
                className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>2分で分かる紹介動画</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L14 10.202a1 1 0 000-1.664l-4.445-2.37z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Testimonial Carousel */}
          <motion.div 
            className="relative"
            {...animationUtils.entrance.slideInRight}
            transition={{ delay: 0.4 }}
          >
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-lg mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* User Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-hope rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    {testimonials[activeTestimonial].image}
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-hope fill-current" />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-white text-lg mb-6 leading-relaxed">
                    "{testimonials[activeTestimonial].message}"
                  </p>

                  {/* User Info */}
                  <div className="text-white/80">
                    <div className="font-semibold text-white">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-sm">
                      {testimonials[activeTestimonial].role}
                    </div>
                    <div className="text-sm text-accent-300">
                      {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      activeTestimonial === index
                        ? "bg-accent-400 scale-125"
                        : "bg-white/30 hover:bg-white/50"
                    )}
                  />
                ))}
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

// Features section with psychological benefits
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "🎯",
      title: "パーソナライズドAI",
      description: "あなたの状況、性格、目標を分析して、完全カスタマイズされたアドバイスを提供",
      benefit: "迷いがなくなり、確信を持って行動できる",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: "✨",
      title: "希望体験生成",
      description: "成功した人の実例をもとに、あなたの未来の希望的な体験を具体的に描写",
      benefit: "不安が希望に変わり、モチベーションが続く",
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: "📊",
      title: "成功パターン分析",
      description: "2万人の成功データから、あなたと似た状況の人の成功パターンを発見",
      benefit: "何をすべきかが明確になり、迷わず行動できる",
      color: "from-success-500 to-success-600"
    },
    {
      icon: "🚀",
      title: "ステップバイステップ",
      description: "内定まで毎日やるべきことを具体的に指示。進捗に応じて戦略も調整",
      benefit: "圧倒される感覚がなくなり、着実に前進できる",
      color: "from-hope to-accent-400"
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
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

// Social proof section
const SocialProofSection: React.FC = () => {
  const stats = [
    { number: "20,000+", label: "累計利用者数", description: "多くの方が成功を実現" },
    { number: "94.5%", label: "内定成功率", description: "圧倒的な結果の実績" },
    { number: "3.2ヶ月", label: "平均内定期間", description: "効率的な就活が可能" },
    { number: "98%", label: "利用者満足度", description: "信頼できるサービス品質" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          variants={animationUtils.stagger.container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={animationUtils.stagger.item}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-accent-300 font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-white/70 text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
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
            今すぐ始めて、
            <br className="sm:hidden" />
            明日から変わる就活を
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            無料で始められます。クレジットカード不要。<br className="hidden sm:block" />
            3分で設定完了、すぐにあなた専用の希望体験をお届けします。
          </p>

          <motion.a
            href="/onboarding"
            className="inline-flex items-center bg-white text-accent-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-neutral-50 transition-colors duration-200 space-x-3 shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6" />
            <span>無料で希望体験を始める</span>
            <ChevronRight className="w-6 h-6" />
          </motion.a>

          <div className="mt-6 text-white/80 text-sm">
            すでに今日 <span className="font-semibold text-white">247人</span> が新しい希望を見つけました
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
      <SocialProofSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
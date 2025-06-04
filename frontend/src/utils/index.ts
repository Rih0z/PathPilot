import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color Psychology Utils
export const colorPsychology = {
  // Colors based on psychological research
  getEmotionalColor: (emotion: string) => {
    const colors = {
      hope: 'text-hope',
      calm: 'text-calm',
      energy: 'text-energy',
      trust: 'text-trust',
      success: 'text-success-500',
      stress: 'text-red-500',
      neutral: 'text-neutral-600',
    };
    return colors[emotion as keyof typeof colors] || colors.neutral;
  },
  
  getBackgroundColor: (mood: 'positive' | 'neutral' | 'negative') => {
    const backgrounds = {
      positive: 'bg-gradient-to-r from-success-50 to-hope/10',
      neutral: 'bg-neutral-50',
      negative: 'bg-red-50',
    };
    return backgrounds[mood];
  },
  
  getBorderColor: (state: 'active' | 'focus' | 'error' | 'success') => {
    const borders = {
      active: 'border-primary-500',
      focus: 'border-accent-500',
      error: 'border-red-500',
      success: 'border-success-500',
    };
    return borders[state];
  },
};

// Psychology-based UX Utils
export const psychologyUtils = {
  // Progressive disclosure: reveal information gradually
  calculateProgressWeight: (currentStep: number, totalSteps: number) => {
    // Use psychological progress curve (not linear)
    const progress = currentStep / totalSteps;
    return Math.pow(progress, 0.8) * 100; // Accelerated feeling of progress
  },
  
  // Social proof messages
  getSocialProofMessage: (userCount: number) => {
    if (userCount > 10000) return `${Math.floor(userCount / 1000)}K+人が既に利用中`;
    if (userCount > 1000) return `${Math.floor(userCount / 100) * 100}+人が既に利用中`;
    return `${userCount}人が既に利用中`;
  },
  
  // Commitment escalation: gradually increase investment
  getCommitmentLevel: (stepNumber: number) => {
    const levels = [
      'この情報を教えてください', // Low commitment
      'あなたについて詳しく教えてください', // Medium
      'あなたの目標を設定しましょう', // High
      'あなた専用のプランを作成します', // Very high
    ];
    return levels[Math.min(stepNumber, levels.length - 1)];
  },
  
  // Reciprocity: give value before asking
  getReciprocityMessage: (stepNumber: number) => {
    const messages = [
      'まず、あなたの強みを発見しましょう',
      '次に、成功パターンをお見せします',
      'あなた専用の戦略をお渡しします',
      '最後に、具体的なアクションプランを作成します',
    ];
    return messages[stepNumber] || messages[0];
  },
};

// Mobile-first responsive utils
export const responsiveUtils = {
  // Check if device is mobile
  isMobile: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  },
  
  // Check if device is tablet
  isTablet: () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  },
  
  // Get safe area insets for mobile devices
  getSafeAreaInsets: () => {
    if (typeof window === 'undefined') return { top: 0, bottom: 0, left: 0, right: 0 };
    
    const style = getComputedStyle(document.documentElement);
    return {
      top: parseInt(style.getPropertyValue('--sat') || '0'),
      bottom: parseInt(style.getPropertyValue('--sab') || '0'),
      left: parseInt(style.getPropertyValue('--sal') || '0'),
      right: parseInt(style.getPropertyValue('--sar') || '0'),
    };
  },
  
  // Touch-friendly button sizes
  getTouchFriendlySize: (size: 'sm' | 'md' | 'lg') => {
    const mobile = responsiveUtils.isMobile();
    const sizes = {
      sm: mobile ? 'h-12 px-4' : 'h-10 px-3',
      md: mobile ? 'h-14 px-6' : 'h-12 px-4',
      lg: mobile ? 'h-16 px-8' : 'h-14 px-6',
    };
    return sizes[size];
  },
};

// Animation utils for psychological comfort
export const animationUtils = {
  // Entrance animations that feel welcoming
  entrance: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    slideInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  },
  
  // Stagger animations for lists
  stagger: {
    container: {
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
    },
  },
  
  // Micro-interactions for feedback
  microInteractions: {
    buttonPress: {
      whileTap: { scale: 0.95 },
      transition: { duration: 0.1 },
    },
    cardHover: {
      whileHover: { y: -2, scale: 1.02 },
      transition: { duration: 0.2 },
    },
    iconBounce: {
      animate: { y: [0, -3, 0] },
      transition: { duration: 0.6, repeat: Infinity, repeatDelay: 3 },
    },
  },
};

// Form validation with psychological considerations
export const validationUtils = {
  // Positive validation messages (encouragement)
  getPositiveMessage: (field: string, value: any) => {
    const messages = {
      name: '素晴らしいお名前ですね！',
      email: 'メールアドレスが確認できました',
      experience: 'この経験が強みになりますね',
      skills: 'とても価値のあるスキルです',
      goals: '明確な目標をお持ちですね！',
    };
    return messages[field as keyof typeof messages] || '入力ありがとうございます！';
  },
  
  // Gentle error messages (non-judgmental)
  getGentleErrorMessage: (field: string, error: string) => {
    const gentleMessages = {
      required: 'こちらも教えていただけますか？',
      email: 'メールアドレスの形式をご確認ください',
      minLength: 'もう少し詳しく教えてください',
      maxLength: '簡潔にまとめていただけますか？',
    };
    return gentleMessages[error as keyof typeof gentleMessages] || 'こちらをご確認ください';
  },
  
  // Real-time validation for smooth UX
  validateField: (value: any, rules: any) => {
    if (rules.required && (!value || value.toString().trim() === '')) {
      return { isValid: false, message: validationUtils.getGentleErrorMessage('', 'required') };
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      return { isValid: false, message: validationUtils.getGentleErrorMessage('', 'minLength') };
    }
    
    if (rules.email && value && !/^\S+@\S+\.\S+$/.test(value)) {
      return { isValid: false, message: validationUtils.getGentleErrorMessage('', 'email') };
    }
    
    return { isValid: true, message: validationUtils.getPositiveMessage('', value) };
  },
};

// API utilities
export const apiUtils = {
  baseURL: 'https://pathpilot.riho-dare.workers.dev/api',
  
  // Helper for API calls with error handling
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    try {
      const response = await fetch(url, mergedOptions);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // Get auth token from localStorage
  getAuthToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('pathpilot_token');
  },
  
  // Set auth token
  setAuthToken: (token: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('pathpilot_token', token);
  },
  
  // Remove auth token
  removeAuthToken: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('pathpilot_token');
  },
};

// Time and date utilities
export const dateUtils = {
  formatRelative: (date: string | Date) => {
    const now = new Date();
    const target = new Date(date);
    const diffInMs = now.getTime() - target.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    
    if (diffInHours < 1) return '今';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}時間前`;
    if (diffInDays < 7) return `${Math.floor(diffInDays)}日前`;
    
    return target.toLocaleDateString('ja-JP');
  },
  
  formatDuration: (minutes: number) => {
    if (minutes < 60) return `${minutes}分`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}時間${remainingMinutes}分` : `${hours}時間`;
  },
};

// Local storage utilities with fallbacks
export const storageUtils = {
  get: (key: string, defaultValue: any = null) => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },
};
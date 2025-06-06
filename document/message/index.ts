// 多言語メッセージシステム インデックス
export { jaMessages, type Messages } from './ja';
export { enMessages } from './en';
export { koMessages } from './ko';
export { zhMessages } from './zh';

export type SupportedLanguage = 'ja' | 'en' | 'ko' | 'zh';

// 言語別メッセージマップ
export const messageMap = {
  ja: () => import('./ja').then(m => m.jaMessages),
  en: () => import('./en').then(m => m.enMessages),
  ko: () => import('./ko').then(m => m.koMessages),
  zh: () => import('./zh').then(m => m.zhMessages)
} as const;

// 言語検出ヘルパー
export function detectLanguage(): SupportedLanguage {
  // ブラウザ言語検出
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('en')) return 'en';
  }
  
  // デフォルトは日本語
  return 'ja';
}

// 言語表示名
export const languageNames: Record<SupportedLanguage, string> = {
  ja: '日本語',
  en: 'English',
  ko: '한국어',
  zh: '中文'
};

// RTL言語判定
export function isRTL(language: SupportedLanguage): boolean {
  return false; // 現在サポートしている言語にRTLはなし
}

// 数値フォーマット
export function formatNumber(num: number, language: SupportedLanguage): string {
  const localeMap: Record<SupportedLanguage, string> = {
    ja: 'ja-JP',
    en: 'en-US',
    ko: 'ko-KR',
    zh: 'zh-CN'
  };
  
  return new Intl.NumberFormat(localeMap[language]).format(num);
}

// 日付フォーマット
export function formatDate(date: Date, language: SupportedLanguage): string {
  const localeMap: Record<SupportedLanguage, string> = {
    ja: 'ja-JP',
    en: 'en-US',
    ko: 'ko-KR',
    zh: 'zh-CN'
  };
  
  return new Intl.DateTimeFormat(localeMap[language], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// 相対時間フォーマット
export function formatRelativeTime(date: Date, language: SupportedLanguage): string {
  const localeMap: Record<SupportedLanguage, string> = {
    ja: 'ja-JP',
    en: 'en-US',
    ko: 'ko-KR',
    zh: 'zh-CN'
  };
  
  const rtf = new Intl.RelativeTimeFormat(localeMap[language], { numeric: 'auto' });
  const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
  
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(diffInSeconds, 'second');
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, 'minute');
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hour');
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return rtf.format(diffInDays, 'day');
}

// 通貨フォーマット
export function formatCurrency(amount: number, language: SupportedLanguage): string {
  const currencyMap: Record<SupportedLanguage, { currency: string; locale: string }> = {
    ja: { currency: 'JPY', locale: 'ja-JP' },
    en: { currency: 'USD', locale: 'en-US' },
    ko: { currency: 'KRW', locale: 'ko-KR' },
    zh: { currency: 'CNY', locale: 'zh-CN' }
  };
  
  const { currency, locale } = currencyMap[language];
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}

// メッセージ補間ヘルパー
export function interpolateMessage(message: string, variables: Record<string, string | number>): string {
  return message.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

// 複数形ヘルパー（日本語など複数形のない言語でも使用）
export function pluralize(
  count: number, 
  singular: string, 
  plural?: string, 
  language: SupportedLanguage = 'ja'
): string {
  // 日本語と中国語は複数形がない
  if (language === 'ja' || language === 'zh') {
    return singular;
  }
  
  // 英語と韓国語は複数形あり
  if (count === 1) {
    return singular;
  }
  
  return plural || `${singular}s`;
}

// 言語別フォールバック
export function getMessageWithFallback(
  key: string, 
  messages: any, 
  fallbackMessages: any
): string {
  const keys = key.split('.');
  let value = messages;
  let fallbackValue = fallbackMessages;
  
  for (const k of keys) {
    value = value?.[k];
    fallbackValue = fallbackValue?.[k];
  }
  
  return (typeof value === 'string' ? value : 
          typeof fallbackValue === 'string' ? fallbackValue : 
          key);
}
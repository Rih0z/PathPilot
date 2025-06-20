# PathPilot UI/UX完全実装仕様書 2024-2025トレンド対応版
**AIキャリアパイロット - 次世代デザインシステム実装ガイド**

Version: 3.0 - 2024-2025 UI/UXトレンド統合版  
Last Updated: 2025-01-11  
Status: 最新デザイントレンド対応完了

---

## 📋 目次

1. [2024-2025 UI/UXトレンド統合](#1-2024-2025-uiuxトレンド統合)
2. [画面構成とナビゲーション](#2-画面構成とナビゲーション)
3. [次世代デザインシステム](#3-次世代デザインシステム)
4. [Glassmorphism実装仕様](#4-glassmorphism実装仕様)
5. [Dark Mode First設計](#5-dark-mode-first設計)
6. [Bold Typography 2.0](#6-bold-typography-20)
7. [Micro-interactions仕様](#7-micro-interactions仕様)
8. [AI-Driven Personalization](#8-ai-driven-personalization)
9. [Modern Skeuomorphism適用](#9-modern-skeuomorphism適用)
10. [3D Design Elements](#10-3d-design-elements)
11. [Neobrutalism要素](#11-neobrutalism要素)
12. [コンポーネント仕様](#12-コンポーネント仕様)
13. [画面別詳細仕様](#13-画面別詳細仕様)
14. [テキストコンテンツ仕様](#14-テキストコンテンツ仕様)
15. [インタラクション仕様](#15-インタラクション仕様)
16. [状態管理仕様](#16-状態管理仕様)
17. [初期データ仕様](#17-初期データ仕様)
18. [レスポンシブデザイン仕様](#18-レスポンシブデザイン仕様)
19. [アニメーション仕様](#19-アニメーション仕様)
20. [バリデーション仕様](#20-バリデーション仕様)

---

## 1. 2024-2025 UI/UXトレンド統合

### 1.1 採用トレンド概要

#### 🎨 Glassmorphism（ガラスモーフィズム）
**実装優先度: 高**
- 半透明の背景とぼかし効果
- `backdrop-filter: blur()`の積極的活用
- 階層的な奥行き表現
- Apple Design Language準拠

#### 🌙 Dark Mode First
**実装優先度: 最高**
- ダークモードをデフォルトとした設計
- OLED対応の純黒背景活用
- 高コントラスト比による視認性向上
- 目の疲労軽減を重視

#### 📝 Bold Typography（太字タイポグラフィ）
**実装優先度: 高**
- 大胆で読みやすいフォント
- 階層的な情報構造の強調
- 高い可読性とブランド認知
- 多言語対応の考慮

#### ⚡ Micro-interactions（マイクロインタラクション）
**実装優先度: 中**
- 細かなフィードバック機能
- ユーザー行動に対する即座の反応
- 楽しさと使いやすさの両立
- パフォーマンスへの配慮

#### 🧠 AI-Driven Personalization
**実装優先度: 中**
- ユーザー行動に基づく適応的UI
- コンテンツの動的最適化
- 学習型インターフェース
- プライバシー保護との両立

#### 🎯 Modern Skeuomorphism（現代的スキューモーフィズム）
**実装優先度: 中**
- 適度な立体感と質感
- フラットデザインとの融合
- 直感的な操作性向上
- 過度な装飾の回避

#### 🏗️ 3D Design Elements
**実装優先度: 低**
- CSS 3D Transformsの活用
- 立体的なカード表現
- Z軸を意識した階層設計
- パフォーマンス最適化必須

#### 💥 Neobrutalism
**実装優先度: 低**
- 大胆なコントラスト
- 非対称レイアウト
- 強烈な色彩とタイポグラフィ
- ブランドとの適合性考慮

### 1.2 PathPilot適用方針

#### 優先実装トレンド
1. **Dark Mode First**: 全体的なカラーパレット刷新
2. **Glassmorphism**: カード・モーダル・ナビゲーション
3. **Bold Typography**: 見出し・CTA・重要情報
4. **Micro-interactions**: ボタン・フォーム・フィードバック

#### 部分的適用トレンド
1. **AI-Driven Personalization**: ダッシュボード・レコメンド
2. **Modern Skeuomorphism**: アイコン・ボタン・入力フィールド

#### 慎重適用トレンド
1. **3D Design Elements**: ヒーローセクション・カード演出
2. **Neobrutalism**: アクセント・特定セクション

---

## 2. 画面構成とナビゲーション

### 2.1 画面一覧と遷移条件

| 画面ID | 画面名 | パス | 表示条件 | 遷移先 |
|--------|--------|------|----------|---------|
| S001 | ユーザータイプ選択 | `/` | 初回アクセス時 | S002 |
| S002 | オンボーディング | `/onboarding` | userType設定後 | S001, S003 |
| S003 | ダッシュボード | `/dashboard` | プロフィール完了後 | S002 |

### 2.2 画面遷移マトリクス

| 現在画面 | アクション | 遷移先 | 遷移条件 |
|---------|-----------|---------|----------|
| S001 | カード選択 | S002 | userType設定 |
| S002 | 戻るボタン | S001 | - |
| S002 | 起動ボタン | S003 | 必須フィールド入力済み |
| S003 | プロフィール編集 | S002 | - |

### 2.3 ナビゲーション要素の正確な仕様

```tsx
// 戻るボタン
<button className="mb-6 text-gray-600 hover:text-gray-800 flex items-center group">
  <ChevronRight className="w-5 h-5 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
  <span>ユーザータイプ選択に戻る</span>
</button>

// プロフィール編集ボタン
<button 
  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
  title="プロフィール編集"
>
  <UserCheck className="w-6 h-6 text-gray-600" />
</button>
```

---

## 3. 次世代デザインシステム

### 3.1 Dark Mode First カラーパレット（2025年版）

```css
/* === Dark Mode First カラーパレット === */

/* Base Dark Colors - メインカラーパレット */
:root[data-theme="dark"] {
  /* Pure Black for OLED */
  --color-black-pure: #000000;
  --color-black-rich: #0a0a0a;
  --color-black-soft: #111111;
  
  /* Dark Grays - 主要背景色 */
  --color-gray-950: #030712;   /* Pure dark background */
  --color-gray-900: #111827;   /* Card background */
  --color-gray-850: #1f2937;   /* Secondary background */
  --color-gray-800: #374151;   /* Border dark */
  --color-gray-700: #4b5563;   /* Text secondary */
  --color-gray-600: #6b7280;   /* Text muted */
  --color-gray-500: #9ca3af;   /* Text disabled */
  
  /* Light Colors for Dark Mode */
  --color-gray-400: #d1d5db;   /* Text primary */
  --color-gray-300: #e5e7eb;   /* Text emphasis */
  --color-gray-200: #f3f4f6;   /* Text high contrast */
  --color-gray-100: #f9fafb;   /* Text maximum */
  --color-white: #ffffff;      /* Pure white accents */
}

/* Light Mode Override */
:root[data-theme="light"] {
  /* Light Mode Fallback */
  --color-gray-950: #f9fafb;
  --color-gray-900: #ffffff;
  --color-gray-850: #f3f4f6;
  --color-gray-800: #e5e7eb;
  --color-gray-700: #d1d5db;
  --color-gray-600: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-400: #4b5563;
  --color-gray-300: #374151;
  --color-gray-200: #1f2937;
  --color-gray-100: #111827;
  --color-white: #000000;
}

/* === Enhanced Color Palette === */

/* Primary Colors - より鮮やかに */
--color-blue-50: #eff6ff;
--color-blue-100: #dbeafe;
--color-blue-200: #bfdbfe;
--color-blue-400: #60a5fa;   /* 新追加 */
--color-blue-500: #3b82f6;
--color-blue-600: #2563eb;
--color-blue-700: #1d4ed8;
--color-blue-800: #1e40af;
--color-blue-900: #1e3a8a;   /* ダークブルー追加 */

/* Vibrant Secondary Colors */
--color-amber-100: #fef3c7;
--color-amber-400: #fbbf24;
--color-amber-500: #f59e0b;
--color-orange-50: #fff7ed;
--color-orange-100: #ffedd5;
--color-orange-200: #fed7aa;
--color-orange-400: #fb923c;  /* 新追加 */
--color-orange-500: #f97316;
--color-orange-600: #ea580c;
--color-orange-700: #c2410c;  /* ダークオレンジ追加 */

/* Enhanced Accent Colors */
--color-purple-50: #faf5ff;
--color-purple-100: #f3e8ff;
--color-purple-200: #e9d5ff;
--color-purple-400: #c084fc;  /* 新追加 */
--color-purple-500: #a855f7;
--color-purple-600: #9333ea;
--color-purple-700: #7c3aed;  /* 新追加 */
--color-purple-800: #6b21a8;
--color-purple-900: #581c87;  /* ダークパープル追加 */

--color-pink-400: #f472b6;    /* 新追加 */
--color-pink-500: #ec4899;
--color-pink-600: #db2777;    /* 新追加 */
--color-cyan-400: #22d3ee;    /* 新追加 */
--color-cyan-500: #06b6d4;
--color-cyan-600: #0891b2;    /* 新追加 */

/* Semantic Colors - 高コントラスト版 */
--color-green-50: #f0fdf4;
--color-green-400: #4ade80;
--color-green-500: #22c55e;
--color-green-600: #16a34a;
--color-green-700: #15803d;   /* ダークグリーン追加 */
--color-red-100: #fee2e2;
--color-red-400: #f87171;     /* 新追加 */
--color-red-500: #ef4444;
--color-red-600: #dc2626;     /* 修正 */
--color-red-700: #b91c1c;     /* ダークレッド追加 */
--color-yellow-100: #fef3c7;
--color-yellow-400: #facc15;  /* 新追加 */
--color-yellow-500: #eab308;  /* 新追加 */
--color-yellow-700: #a16207;

/* Glassmorphism Support Colors */
--color-glass-white: rgba(255, 255, 255, 0.1);
--color-glass-black: rgba(0, 0, 0, 0.1);
--color-glass-blue: rgba(59, 130, 246, 0.1);
--color-glass-purple: rgba(168, 85, 247, 0.1);
--color-glass-pink: rgba(236, 72, 153, 0.1);

/* Enhanced Opacity Values */
--opacity-95: 0.95;
--opacity-90: 0.9;
--opacity-80: 0.8;
--opacity-70: 0.7;
--opacity-60: 0.6;
--opacity-50: 0.5;
--opacity-40: 0.4;
--opacity-30: 0.3;
--opacity-20: 0.2;
--opacity-10: 0.1;
--opacity-5: 0.05;
```

---

## 4. Glassmorphism実装仕様

### 4.1 Glassmorphism Core CSS

```css
/* === Glassmorphism Base Classes === */

/* Primary Glass Effects */
.glass-primary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-secondary {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Dark Mode Glass Effects */
[data-theme="dark"] .glass-primary {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .glass-secondary {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Colored Glass Variants */
.glass-blue {
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.glass-purple {
  background: rgba(168, 85, 247, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.glass-pink {
  background: rgba(236, 72, 153, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(236, 72, 153, 0.2);
}

.glass-orange {
  background: rgba(249, 115, 22, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(249, 115, 22, 0.2);
}
```

### 4.2 Glassmorphismカード実装

```tsx
// Enhanced Card with Glassmorphism
<div className="glass-primary rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
  {/* Content */}
</div>

// Navigation with Glass Effect
<nav className="glass-secondary border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
  {/* Navigation content */}
</nav>

// Modal with Glassmorphism
<div className="fixed inset-0 glass-primary backdrop-blur-sm z-50 flex items-center justify-center">
  <div className="glass-secondary rounded-2xl p-6 max-w-md w-full mx-4">
    {/* Modal content */}
  </div>
</div>
```

### 4.3 グラデーション定義（Dark Mode対応）

```css
/* === Enhanced Gradients for 2025 === */

/* Dark Mode First Background Gradients */
.bg-gradient-main-dark {
  background: linear-gradient(135deg, #030712 0%, #111827 50%, #1f2937 100%);
}

.bg-gradient-main-light {
  background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #eff6ff 100%);
}

/* Vibrant Button Gradients */
.bg-gradient-primary-enhanced {
  background: linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%);
  position: relative;
}

.bg-gradient-primary-enhanced::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
  border-radius: inherit;
  pointer-events: none;
}

/* Hero Section - Modern Gradient */
.bg-gradient-hero-2025 {
  background: 
    radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #030712 0%, #111827 100%);
}

/* Card Gradients with Glass Effect */
.bg-gradient-student-glass {
  background: 
    linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%),
    rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
}

.bg-gradient-newgrad-glass {
  background: 
    linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%),
    rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
}

.bg-gradient-career-glass {
  background: 
    linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%),
    rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
}

/* Animated Gradients */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-animated {
  background: linear-gradient(270deg, #3b82f6, #9333ea, #ec4899, #f97316);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}
```

---

## 5. Dark Mode First設計

### 5.1 Dark Mode Implementation

```css
/* === Dark Mode System === */

/* Root Theme Variables */
:root {
  --theme-bg-primary: #ffffff;
  --theme-bg-secondary: #f9fafb;
  --theme-text-primary: #111827;
  --theme-text-secondary: #6b7280;
  --theme-border: #e5e7eb;
}

[data-theme="dark"] {
  --theme-bg-primary: #030712;
  --theme-bg-secondary: #111827;
  --theme-text-primary: #f9fafb;
  --theme-text-secondary: #9ca3af;
  --theme-border: #374151;
}

/* Auto Theme Detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --theme-bg-primary: #030712;
    --theme-bg-secondary: #111827;
    --theme-text-primary: #f9fafb;
    --theme-text-secondary: #9ca3af;
    --theme-border: #374151;
  }
}

/* Theme Application Classes */
.bg-theme-primary { background-color: var(--theme-bg-primary); }
.bg-theme-secondary { background-color: var(--theme-bg-secondary); }
.text-theme-primary { color: var(--theme-text-primary); }
.text-theme-secondary { color: var(--theme-text-secondary); }
.border-theme { border-color: var(--theme-border); }
```

### 5.2 OLED Support

```css
/* === OLED Optimized Colors === */

/* True Black for OLED Displays */
.bg-oled-black { background-color: #000000; }
.bg-oled-gray { background-color: #0a0a0a; }

/* High Contrast Text for OLED */
.text-oled-white { color: #ffffff; }
.text-oled-gray { color: #e5e7eb; }

/* OLED Optimized Glass Effect */
.glass-oled {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Auto OLED Detection (if supported) */
@media (prefers-contrast: high) {
  [data-theme="dark"] {
    --theme-bg-primary: #000000;
    --theme-bg-secondary: #0a0a0a;
  }
}
```

---

## 6. Bold Typography 2.0

### 6.1 Enhanced Font System

```css
/* === Bold Typography 2025 === */

/* Primary Font Stack - Enhanced */
.font-primary {
  font-family: 
    "Inter", 
    -apple-system, 
    BlinkMacSystemFont, 
    "Segoe UI", 
    Roboto, 
    "Helvetica Neue", 
    Arial, 
    "Noto Sans", 
    sans-serif;
}

/* Display Font for Hero Sections */
.font-display {
  font-family: 
    "Inter Display", 
    "SF Pro Display", 
    -apple-system, 
    BlinkMacSystemFont, 
    sans-serif;
  font-feature-settings: "cv01", "cv03", "cv04", "cv11";
}

/* Enhanced Text Sizes - More Dramatic Scale */
.text-xs { font-size: 0.75rem; line-height: 1rem; font-weight: 500; }      /* 12px/16px - Medium */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; font-weight: 500; }  /* 14px/20px - Medium */
.text-base { font-size: 1rem; line-height: 1.5rem; font-weight: 500; }     /* 16px/24px - Medium */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; font-weight: 600; }  /* 18px/28px - SemiBold */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; }   /* 20px/28px - SemiBold */
.text-2xl { font-size: 1.5rem; line-height: 2rem; font-weight: 700; }      /* 24px/32px - Bold */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; font-weight: 700; } /* 30px/36px - Bold */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; font-weight: 800; }   /* 36px/40px - ExtraBold */
.text-5xl { font-size: 3rem; line-height: 1.1; font-weight: 800; }         /* 48px/53px - ExtraBold */
.text-6xl { font-size: 3.75rem; line-height: 1.1; font-weight: 900; }      /* 60px/66px - Black */
.text-7xl { font-size: 4.5rem; line-height: 1.1; font-weight: 900; }       /* 72px/79px - Black */

/* Bold Typography Utilities */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }

/* Letter Spacing for Impact */
.tracking-tighter { letter-spacing: -0.05em; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-normal { letter-spacing: 0; }
.tracking-wide { letter-spacing: 0.025em; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-widest { letter-spacing: 0.1em; }
```

### 6.2 Text Effects and Styles

```css
/* === Advanced Text Effects === */

/* Gradient Text Effects */
.text-gradient-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-success {
  background: linear-gradient(135deg, #22c55e 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-warning {
  background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Text Shadow Effects */
.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.text-shadow-md {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.text-shadow-lg {
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Glassmorphism Text Effect */
.text-glass {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1px);
}

/* Responsive Typography */
@media (max-width: 640px) {
  .text-5xl { font-size: 2.25rem; line-height: 1.2; }
  .text-6xl { font-size: 2.75rem; line-height: 1.2; }
  .text-7xl { font-size: 3.25rem; line-height: 1.2; }
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .text-gradient-primary,
  .text-gradient-success,
  .text-gradient-warning {
    background: none;
    -webkit-text-fill-color: unset;
    color: var(--theme-text-primary);
  }
}
```

---

## 7. Micro-interactions仕様

### 7.1 Core Micro-interactions

```css
/* === Micro-interactions 2025 === */

/* Button Micro-interactions */
.btn-micro {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.btn-micro:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.btn-micro:active {
  transform: translateY(0) scale(0.98);
  transition: all 0.1s ease;
}

/* Card Hover Micro-interactions */
.card-micro {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.card-micro::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s ease;
}

.card-micro:hover::before {
  left: 100%;
}

.card-micro:hover {
  transform: translateY(-8px) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Input Focus Micro-interactions */
.input-micro {
  position: relative;
  transition: all 0.3s ease;
}

.input-micro::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.input-micro:focus-within::after {
  width: 100%;
}

/* Loading Micro-interactions */
.loading-micro {
  position: relative;
  overflow: hidden;
}

.loading-micro::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Icon Micro-interactions */
.icon-micro {
  transition: all 0.2s ease;
  transform-origin: center;
}

.icon-micro:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

/* Progress Bar Micro-interactions */
.progress-micro {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  overflow: hidden;
  position: relative;
}

.progress-micro .bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  border-radius: inherit;
  position: relative;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-micro .bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: progressShine 2s infinite;
}

@keyframes progressShine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### 7.2 Advanced Micro-interactions

```css
/* === Advanced Interactions === */

/* Magnetic Button Effect */
.btn-magnetic {
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-magnetic:hover {
  transform: scale(1.05);
}

/* Ripple Effect */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.5s, opacity 0.5s;
}

.ripple:active::after {
  transform: scale(4);
  opacity: 1;
  transition: 0s;
}

/* Floating Animation */
.float-micro {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Pulse Effect */
.pulse-micro {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}

/* Shake Effect */
.shake-micro {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Bounce In Effect */
.bounce-in {
  animation: bounceIn 0.6s ease;
}

@keyframes bounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

/* Slide In Effects */
.slide-in-left {
  animation: slideInLeft 0.5s ease;
}

@keyframes slideInLeft {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.slide-in-right {
  animation: slideInRight 0.5s ease;
}

@keyframes slideInRight {
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.slide-in-up {
  animation: slideInUp 0.5s ease;
}

@keyframes slideInUp {
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
```

---

## 8. AI-Driven Personalization

### 8.1 Adaptive UI Components

```tsx
/* === AI-Driven UI Personalization === */

// Adaptive Color Scheme Based on User Behavior
interface UserPreferences {
  preferredColorScheme: 'blue' | 'purple' | 'orange' | 'green';
  interactionStyle: 'subtle' | 'moderate' | 'bold';
  contentDensity: 'compact' | 'comfortable' | 'spacious';
  accessibilityNeeds: 'none' | 'high-contrast' | 'large-text' | 'reduced-motion';
}

// Dynamic Theme Generator
const generatePersonalizedTheme = (preferences: UserPreferences) => {
  const baseThemes = {
    blue: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      accent: '#06b6d4'
    },
    purple: {
      primary: '#9333ea',
      secondary: '#7c3aed',
      accent: '#ec4899'
    },
    orange: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fbbf24'
    },
    green: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#06b6d4'
    }
  };

  return baseThemes[preferences.preferredColorScheme];
};

// Adaptive Component Sizing
const getAdaptiveSpacing = (density: string) => {
  const spacingMaps = {
    compact: { padding: 'p-3', margin: 'm-2', gap: 'gap-2' },
    comfortable: { padding: 'p-6', margin: 'm-4', gap: 'gap-4' },
    spacious: { padding: 'p-8', margin: 'm-6', gap: 'gap-6' }
  };
  
  return spacingMaps[density] || spacingMaps.comfortable;
};

// Smart Content Recommendations
interface AIRecommendation {
  type: 'next-action' | 'improvement' | 'resource' | 'warning';
  priority: 'high' | 'medium' | 'low';
  content: string;
  actionUrl?: string;
  dismissible: boolean;
}

// Personalized Dashboard Layout
const PersonalizedDashboard: React.FC<{userPrefs: UserPreferences}> = ({ userPrefs }) => {
  const theme = generatePersonalizedTheme(userPrefs);
  const spacing = getAdaptiveSpacing(userPrefs.contentDensity);
  
  return (
    <div 
      className={`${spacing.padding} ${spacing.gap}`}
      style={{ 
        '--primary-color': theme.primary,
        '--secondary-color': theme.secondary,
        '--accent-color': theme.accent
      } as React.CSSProperties}
    >
      {/* Adaptive content based on user preferences */}
    </div>
  );
};
```

### 8.2 Learning Algorithm Integration

```typescript
/* === AI Learning System === */

// User Behavior Tracking
interface UserInteraction {
  timestamp: number;
  action: string;
  element: string;
  duration: number;
  successful: boolean;
  context: Record<string, any>;
}

// AI Preference Learning
class AIPersonalizationEngine {
  private interactions: UserInteraction[] = [];
  private preferences: UserPreferences;

  constructor(initialPreferences: UserPreferences) {
    this.preferences = initialPreferences;
  }

  // Track user interaction
  trackInteraction(interaction: UserInteraction) {
    this.interactions.push(interaction);
    this.updatePreferences();
  }

  // Machine learning logic for preference updates
  private updatePreferences() {
    const recentInteractions = this.interactions.slice(-50);
    
    // Analyze color preferences based on successful interactions
    const colorSuccessRates = this.analyzeColorPreferences(recentInteractions);
    if (colorSuccessRates.bestColor !== this.preferences.preferredColorScheme) {
      this.preferences.preferredColorScheme = colorSuccessRates.bestColor;
    }

    // Analyze interaction style preferences
    const interactionStyle = this.analyzeInteractionStyle(recentInteractions);
    this.preferences.interactionStyle = interactionStyle;

    // Analyze content density preferences
    const contentDensity = this.analyzeContentDensity(recentInteractions);
    this.preferences.contentDensity = contentDensity;
  }

  private analyzeColorPreferences(interactions: UserInteraction[]) {
    // AI logic to determine preferred colors based on interaction success
    const colorStats = interactions.reduce((acc, interaction) => {
      const color = interaction.context.primaryColor || 'blue';
      if (!acc[color]) acc[color] = { total: 0, successful: 0 };
      acc[color].total++;
      if (interaction.successful) acc[color].successful++;
      return acc;
    }, {} as Record<string, {total: number, successful: number}>);

    let bestColor = 'blue';
    let bestRate = 0;

    Object.entries(colorStats).forEach(([color, stats]) => {
      const rate = stats.successful / stats.total;
      if (rate > bestRate) {
        bestRate = rate;
        bestColor = color as any;
      }
    });

    return { bestColor: bestColor as UserPreferences['preferredColorScheme'], rate: bestRate };
  }

  private analyzeInteractionStyle(interactions: UserInteraction[]): UserPreferences['interactionStyle'] {
    const avgDuration = interactions.reduce((sum, i) => sum + i.duration, 0) / interactions.length;
    
    if (avgDuration < 1000) return 'bold';      // Quick interactions
    if (avgDuration < 3000) return 'moderate';  // Normal interactions
    return 'subtle';                            // Careful interactions
  }

  private analyzeContentDensity(interactions: UserInteraction[]): UserPreferences['contentDensity'] {
    const scrollInteractions = interactions.filter(i => i.action === 'scroll');
    const avgScrollSpeed = scrollInteractions.reduce((sum, i) => sum + (i.context.scrollSpeed || 0), 0) / scrollInteractions.length;
    
    if (avgScrollSpeed > 100) return 'compact';    // Fast scrolling = wants more content
    if (avgScrollSpeed > 50) return 'comfortable'; // Normal scrolling
    return 'spacious';                             // Slow scrolling = wants less density
  }

  // Get current personalized recommendations
  getPersonalizedRecommendations(): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    
    // Analyze user's current journey stage
    const recentActions = this.interactions.slice(-10).map(i => i.action);
    
    if (recentActions.includes('view-dashboard') && !recentActions.includes('generate-hope')) {
      recommendations.push({
        type: 'next-action',
        priority: 'high',
        content: 'あなたの希望体験を生成して、モチベーションを高めませんか？',
        actionUrl: '/generate-hope',
        dismissible: false
      });
    }

    if (this.getCompletionRate() < 0.5) {
      recommendations.push({
        type: 'improvement',
        priority: 'medium',
        content: 'プロフィール情報を追加すると、より精度の高い分析が可能になります',
        actionUrl: '/profile',
        dismissible: true
      });
    }

    return recommendations;
  }

  private getCompletionRate(): number {
    // Calculate profile completion rate based on interactions
    const profileActions = this.interactions.filter(i => i.action.startsWith('profile-'));
    return Math.min(profileActions.length / 10, 1); // Assume 10 actions = complete profile
  }

  // Get current preferences
  getCurrentPreferences(): UserPreferences {
    return { ...this.preferences };
  }
}
```

---

## 9. Modern Skeuomorphism適用

### 9.1 Subtle 3D Elements

```css
/* === Modern Skeuomorphism 2025 === */

/* Soft 3D Buttons */
.btn-skeu {
  background: linear-gradient(145deg, #ffffff 0%, #f3f4f6 100%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.btn-skeu:hover {
  background: linear-gradient(145deg, #f9fafb 0%, #e5e7eb 100%);
  transform: translateY(-1px);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.btn-skeu:active {
  transform: translateY(0);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.2),
    inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Dark Mode Skeuomorphism */
[data-theme="dark"] .btn-skeu {
  background: linear-gradient(145deg, #374151 0%, #1f2937 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .btn-skeu:hover {
  background: linear-gradient(145deg, #4b5563 0%, #374151 100%);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}

/* Soft Embossed Cards */
.card-skeu {
  background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

[data-theme="dark"] .card-skeu {
  background: linear-gradient(145deg, #1f2937 0%, #111827 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Input Fields with Depth */
.input-skeu {
  background: linear-gradient(145deg, #f9fafb 0%, #ffffff 100%);
  border: 1px solid #d1d5db;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

.input-skeu:focus {
  background: #ffffff;
  border-color: #3b82f6;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.05),
    0 0 0 3px rgba(59, 130, 246, 0.1);
}

[data-theme="dark"] .input-skeu {
  background: linear-gradient(145deg, #111827 0%, #1f2937 100%);
  border: 1px solid #374151;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Toggle Switch Skeuomorphism */
.toggle-skeu {
  width: 60px;
  height: 32px;
  background: linear-gradient(145deg, #e5e7eb 0%, #d1d5db 100%);
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.8);
}

.toggle-skeu::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  background: linear-gradient(145deg, #ffffff 0%, #f3f4f6 100%);
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.toggle-skeu.active {
  background: linear-gradient(145deg, #3b82f6 0%, #2563eb 100%);
}

.toggle-skeu.active::before {
  transform: translateX(28px);
  background: linear-gradient(145deg, #ffffff 0%, #dbeafe 100%);
}

/* Progress Bar Skeuomorphism */
.progress-skeu {
  height: 12px;
  background: linear-gradient(145deg, #e5e7eb 0%, #f3f4f6 100%);
  border-radius: 6px;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.progress-skeu .bar {
  height: 100%;
  background: linear-gradient(145deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: inherit;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  transition: width 0.5s ease;
}
```

---

## 10. 3D Design Elements

### 10.1 CSS 3D Transforms

```css
/* === 3D Design Elements === */

/* 3D Card Perspective */
.card-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.card-3d .inner {
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  position: relative;
}

.card-3d:hover .inner {
  transform: rotateY(5deg) rotateX(5deg) translateZ(20px);
}

/* Floating 3D Elements */
.float-3d {
  transform: translateZ(0);
  animation: float3d 6s ease-in-out infinite;
}

@keyframes float3d {
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
  }
  33% { 
    transform: translateY(-10px) rotateX(2deg) rotateY(2deg); 
  }
  66% { 
    transform: translateY(-5px) rotateX(-2deg) rotateY(-2deg); 
  }
}

/* 3D Button Press */
.btn-3d {
  transform: translateZ(0);
  transition: all 0.1s ease;
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.btn-3d:hover {
  transform: translateY(-2px) translateZ(10px);
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.15);
}

.btn-3d:active {
  transform: translateY(0) translateZ(0);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* Isometric Elements */
.isometric {
  transform: rotateX(60deg) rotateY(-45deg);
  transform-style: preserve-3d;
}

.isometric-card {
  transform: 
    perspective(1000px) 
    rotateX(15deg) 
    rotateY(-15deg) 
    translateZ(20px);
  transition: all 0.3s ease;
}

.isometric-card:hover {
  transform: 
    perspective(1000px) 
    rotateX(5deg) 
    rotateY(-5deg) 
    translateZ(40px);
}

/* Layered 3D Stack */
.stack-3d {
  position: relative;
}

.stack-3d::before,
.stack-3d::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  border-radius: inherit;
  z-index: -1;
}

.stack-3d::before {
  transform: translateZ(-10px) translateX(-5px) translateY(-5px);
  opacity: 0.8;
}

.stack-3d::after {
  transform: translateZ(-20px) translateX(-10px) translateY(-10px);
  opacity: 0.6;
}
```

---

## 11. Neobrutalism要素

### 11.1 Bold Contrast Elements

```css
/* === Neobrutalism Design === */

/* High Contrast Buttons */
.btn-brutal {
  background: #000000;
  color: #ffffff;
  border: 4px solid #ffffff;
  padding: 16px 32px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.1s ease;
  box-shadow: 8px 8px 0 #3b82f6;
}

.btn-brutal:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #3b82f6;
}

.btn-brutal:active {
  transform: translate(0, 0);
  box-shadow: 4px 4px 0 #3b82f6;
}

/* Brutal Cards */
.card-brutal {
  background: #ffffff;
  border: 4px solid #000000;
  box-shadow: 12px 12px 0 #f59e0b;
  padding: 24px;
  transition: all 0.2s ease;
}

.card-brutal:hover {
  transform: translate(-4px, -4px);
  box-shadow: 16px 16px 0 #f59e0b;
}

/* Dark Mode Brutal */
[data-theme="dark"] .btn-brutal {
  background: #ffffff;
  color: #000000;
  border: 4px solid #000000;
  box-shadow: 8px 8px 0 #ec4899;
}

[data-theme="dark"] .card-brutal {
  background: #000000;
  border: 4px solid #ffffff;
  box-shadow: 12px 12px 0 #a855f7;
}

/* Brutal Typography */
.text-brutal {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 4px 4px 0 #3b82f6;
  font-size: clamp(1.5rem, 5vw, 4rem);
  line-height: 0.9;
}

/* Asymmetric Layout */
.layout-brutal {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr;
  grid-template-rows: 1fr 2fr 1fr;
  gap: 16px;
  transform: rotate(-1deg);
}

.layout-brutal > * {
  transform: rotate(1deg);
}

/* Sharp Shadows */
.shadow-brutal {
  box-shadow: 
    8px 8px 0 #000000,
    16px 16px 0 #3b82f6,
    24px 24px 0 #f59e0b;
}

/* Glitch Effect */
.glitch-brutal {
  position: relative;
  font-weight: 900;
}

.glitch-brutal::before,
.glitch-brutal::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-brutal::before {
  animation: glitch1 0.5s infinite;
  color: #ec4899;
  z-index: -1;
}

.glitch-brutal::after {
  animation: glitch2 0.5s infinite;
  color: #06b6d4;
  z-index: -2;
}

@keyframes glitch1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, 2px); }
  80% { transform: translate(-2px, -2px); }
}
```

---

## 12. コンポーネント仕様

### 12.1 Enhanced Button Components 2025

```tsx
/* === Next-Gen Button Components === */

// Primary Glass Button with Micro-interactions
const GlassButton: React.FC<{
  variant: 'primary' | 'secondary' | 'glass';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}> = ({ variant, size, children, onClick, disabled, loading }) => {
  const baseClasses = "btn-micro glass-primary rounded-2xl font-bold transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-primary-enhanced text-white hover:shadow-2xl",
    secondary: "glass-secondary text-theme-primary border border-theme",
    glass: "glass-blue text-white hover:glass-purple"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <div className="loading-micro absolute inset-0" />}
      <span className={`relative z-10 ${loading ? 'opacity-0' : ''}`}>
        {children}
      </span>
    </button>
  );
};

// Skeuomorphic Toggle Switch
const SkeuToggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}> = ({ checked, onChange, size = 'md' }) => {
  const sizes = {
    sm: "w-12 h-6",
    md: "w-16 h-8", 
    lg: "w-20 h-10"
  };

  return (
    <div
      className={`toggle-skeu ${sizes[size]} ${checked ? 'active' : ''}`}
      onClick={() => onChange(!checked)}
    />
  );
};

// 3D Floating Card
const Float3DCard: React.FC<{
  children: React.ReactNode;
  intensity?: 'subtle' | 'moderate' | 'bold';
}> = ({ children, intensity = 'moderate' }) => {
  const intensities = {
    subtle: "card-3d float-micro",
    moderate: "card-3d float-3d card-micro",
    bold: "card-3d float-3d card-micro isometric-card"
  };

  return (
    <div className={`${intensities[intensity]} glass-primary rounded-3xl p-6`}>
      <div className="inner">
        {children}
      </div>
    </div>
  );
};
```

### 12.2 Adaptive Input Components

```tsx
/* === AI-Driven Input Components === */

const AdaptiveInput: React.FC<{
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  userPrefs: UserPreferences;
  aiSuggestions?: string[];
}> = ({ type, placeholder, value, onChange, userPrefs, aiSuggestions }) => {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getAdaptiveClasses = () => {
    const base = "input-micro input-skeu w-full rounded-xl transition-all duration-300";
    
    if (userPrefs.interactionStyle === 'bold') {
      return `${base} border-2 focus:ring-4`;
    } else if (userPrefs.interactionStyle === 'subtle') {
      return `${base} border focus:ring-1`;
    }
    return `${base} border focus:ring-2`;
  };

  const spacing = getAdaptiveSpacing(userPrefs.contentDensity);

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setFocused(true);
          setShowSuggestions(true);
        }}
        onBlur={() => {
          setFocused(false);
          setTimeout(() => setShowSuggestions(false), 200);
        }}
        className={`${getAdaptiveClasses()} ${spacing.padding}`}
        style={{
          borderColor: focused ? `var(--primary-color)` : undefined,
          '--ring-color': `var(--primary-color)`
        } as React.CSSProperties}
      />
      
      {/* AI Suggestions Dropdown */}
      {showSuggestions && aiSuggestions && aiSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-secondary rounded-xl border border-theme overflow-hidden z-50">
          {aiSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-theme-secondary transition-colors text-theme-primary"
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Smart Progress Bar with AI Predictions
const AIProgressBar: React.FC<{
  currentValue: number;
  maxValue: number;
  aiPrediction?: number;
  label?: string;
  showPrediction?: boolean;
}> = ({ currentValue, maxValue, aiPrediction, label, showPrediction = true }) => {
  const percentage = (currentValue / maxValue) * 100;
  const predictionPercentage = aiPrediction ? (aiPrediction / maxValue) * 100 : 0;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm font-medium text-theme-primary">
          <span>{label}</span>
          <span>{currentValue}/{maxValue}</span>
        </div>
      )}
      
      <div className="progress-micro progress-skeu h-3 relative">
        {/* Current Progress */}
        <div 
          className="bar transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
        
        {/* AI Prediction Indicator */}
        {showPrediction && aiPrediction && (
          <div 
            className="absolute top-0 h-full w-1 bg-yellow-400 opacity-70 transition-all duration-500"
            style={{ left: `${predictionPercentage}%` }}
            title={`AI予測: ${aiPrediction}/${maxValue}`}
          />
        )}
      </div>
      
      {showPrediction && aiPrediction && (
        <div className="text-xs text-theme-secondary">
          AI予測到達値: {aiPrediction} ({Math.round(predictionPercentage)}%)
        </div>
      )}
    </div>
  );
};
```

### 12.3 境界線とコーナー半径（Enhanced 2025）

```css
/* === Enhanced Border Radius 2025 === */

/* Adaptive Border Radius */
.rounded-adaptive-sm { border-radius: 0.375rem; }     /* 6px */
.rounded-adaptive { border-radius: 0.625rem; }        /* 10px */
.rounded-adaptive-lg { border-radius: 0.875rem; }     /* 14px */
.rounded-adaptive-xl { border-radius: 1.125rem; }     /* 18px */
.rounded-adaptive-2xl { border-radius: 1.375rem; }    /* 22px */
.rounded-adaptive-3xl { border-radius: 1.75rem; }     /* 28px */
.rounded-adaptive-4xl { border-radius: 2.25rem; }     /* 36px */

/* Asymmetric Radius (Neobrutalism) */
.rounded-brutal-tl { 
  border-radius: 0 1rem 1rem 1rem; 
}
.rounded-brutal-tr { 
  border-radius: 1rem 0 1rem 1rem; 
}
.rounded-brutal-bl { 
  border-radius: 1rem 1rem 0 1rem; 
}
.rounded-brutal-br { 
  border-radius: 1rem 1rem 1rem 0; 
}

/* Organic Shapes */
.rounded-organic-1 {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}
.rounded-organic-2 {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

/* Enhanced Borders */
.border-glass { 
  border: 1px solid rgba(255, 255, 255, 0.2); 
}
.border-glass-thick { 
  border: 2px solid rgba(255, 255, 255, 0.3); 
}
.border-theme { 
  border: 1px solid var(--theme-border); 
}
.border-theme-thick { 
  border: 2px solid var(--theme-border); 
}

/* Gradient Borders */
.border-gradient-primary {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  padding: 2px;
  border-radius: inherit;
}

.border-gradient-primary > * {
  background: var(--theme-bg-primary);
  border-radius: calc(inherit - 2px);
}

/* Animated Borders */
.border-animated {
  background: linear-gradient(90deg, #3b82f6, #9333ea, #ec4899, #f97316);
  background-size: 400% 400%;
  animation: gradientShift 3s ease infinite;
  padding: 2px;
}

/* Neumorphic Borders */
.border-neuro {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .border-neuro {
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}
```

### 2.6 シャドウ（正確な値）

```css
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Hover States */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### 2.7 Z-Index階層

```css
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }   /* カード、通常要素 */
.z-20 { z-index: 20; }   /* ドロップダウン */
.z-30 { z-index: 30; }   /* ツールチップ */
.z-40 { z-index: 40; }   /* モーダル */
.z-50 { z-index: 50; }   /* ヘッダー（sticky） */
```

---

## 3. コンポーネント仕様

### 3.1 ボタンコンポーネント（完全仕様）

#### Primary Button（グラデーション）
```tsx
// 完全なクラス名
const primaryButtonClasses = {
  base: "bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-full transition-all duration-300",
  sizes: {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  },
  states: {
    hover: "hover:shadow-lg transform hover:-translate-y-0.5",
    active: "active:scale-95",
    disabled: "opacity-50 cursor-not-allowed",
    fullWidth: "w-full"
  }
};

// 実装例
<button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
  AIパイロットを起動する
</button>
```

#### Secondary Button
```tsx
// Gray variant
<button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all">
  コピー
</button>

// White variant (on gradient background)
<button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center hover:bg-white/30 transition-all">
  <RefreshCw className="w-5 h-5 mr-2" />
  希望を更新
</button>
```

#### Icon Button
```tsx
<button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
  <Menu className="w-6 h-6" />
</button>
```

### 3.2 カードコンポーネント（完全仕様）

#### 基本カード
```tsx
<div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
  {/* Content */}
</div>
```

#### ホバーカード
```tsx
<div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
  {/* Content */}
</div>
```

#### グラデーションカード
```tsx
<div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-6">
  {/* Content */}
</div>
```

### 3.3 入力フィールドコンポーネント（完全仕様）

#### テキスト入力
```tsx
<div>
  <label className="block text-sm font-medium mb-2">ラベル</label>
  <input
    type="text"
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    placeholder="プレースホルダー"
  />
</div>
```

#### テキストエリア
```tsx
<div>
  <label className="block text-sm font-medium mb-2">ラベル</label>
  <textarea
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
    rows="3"
    placeholder="プレースホルダー"
  />
</div>
```

#### レンジスライダー
```tsx
<div>
  <label className="block text-sm font-medium mb-2">現在のストレスレベル</label>
  <div className="flex items-center justify-between">
    <Smile className="w-8 h-8 text-green-500" />
    <input
      type="range"
      min="1"
      max="5"
      value={stressLevel}
      className="flex-1 mx-4"
    />
    <Frown className="w-8 h-8 text-red-500" />
  </div>
</div>
```

### 3.4 プログレスバーコンポーネント（完全仕様）

```tsx
// 希望スコアプログレスバー
<div className="mb-6">
  <div className="bg-white/20 rounded-full h-6 overflow-hidden">
    <div 
      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-1000"
      style={{ width: `${hopeScore}%` }}
    />
  </div>
</div>

// ステージプログレスバー
<div className="flex space-x-1">
  {[1, 2, 3, 4, 5].map((stage) => (
    <div
      key={stage}
      className={`w-8 h-2 rounded-full ${
        stage <= currentStage ? 'bg-blue-500' : 'bg-gray-200'
      }`}
    />
  ))}
</div>
```

### 3.5 アイコン使用仕様（完全リスト）

| アイコン | インポート | 使用箇所 | クラス |
|---------|-----------|----------|--------|
| Sparkles | `import { Sparkles } from 'lucide-react'` | ロゴ、希望体験 | `w-8 h-8 text-blue-600`, `w-16 h-16`, `w-20 h-20` |
| ChevronRight | `import { ChevronRight } from 'lucide-react'` | ナビゲーション、リスト | `w-5 h-5`, 戻るボタンは`rotate-180` |
| GraduationCap | `import { GraduationCap } from 'lucide-react'` | 学生タイプ | `w-10 h-10 text-white` |
| Briefcase | `import { Briefcase } from 'lucide-react'` | 転職者タイプ | `w-10 h-10 text-white` |
| UserCheck | `import { UserCheck } from 'lucide-react'` | 新卒タイプ、プロフィール | `w-6 h-6 text-gray-600`, `w-10 h-10 text-white` |
| Heart | `import { Heart } from 'lucide-react'` | 希望度、希望体験 | `w-8 h-8`, `w-6 h-6 text-purple-600` |
| Target | `import { Target } from 'lucide-react'` | 目標、統計 | `w-8 h-8` |
| TrendingUp | `import { TrendingUp } from 'lucide-react'` | 成長、向上 | `w-8 h-8` |
| Brain | `import { Brain } from 'lucide-react'` | AI分析、自己分析 | `w-6 h-6 text-blue-600`, `w-6 h-6 text-purple-600` |
| Camera | `import { Camera } from 'lucide-react'` | スクリーンショット | `w-6 h-6 text-blue-600` |
| Send | `import { Send } from 'lucide-react'` | 送信 | `w-5 h-5` |
| RefreshCw | `import { RefreshCw } from 'lucide-react'` | 更新 | `w-5 h-5` |
| CheckCircle | `import { CheckCircle } from 'lucide-react'` | 完了 | `w-6 h-6 text-green-600` |
| Award | `import { Award } from 'lucide-react'` | 成果、達成 | `w-8 h-8` |
| Smile | `import { Smile } from 'lucide-react'` | ポジティブ感情 | `w-8 h-8 text-green-500` |
| Frown | `import { Frown } from 'lucide-react'` | ネガティブ感情 | `w-8 h-8 text-red-500` |
| Check | `import { Check } from 'lucide-react'` | チェックマーク | `w-6 h-6` |

---

## 4. 画面別詳細仕様

### 4.1 ユーザータイプ選択画面（S001）完全仕様

#### 画面構造
```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
  <div className="max-w-4xl mx-auto">
    {/* ヘッダー部分 */}
    <div className="text-center mb-12">
      <Sparkles className="w-20 h-20 text-blue-600 mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        PathPilot AIキャリアパイロット
      </h1>
      <p className="text-xl text-gray-600">あなたの状況を教えてください</p>
    </div>

    {/* カードグリッド */}
    <div className="grid md:grid-cols-3 gap-6">
      {/* 各カード */}
    </div>
  </div>
</div>
```

#### カード詳細（学生）
```tsx
<button
  onClick={() => {
    setUserType('student');
    setCurrentView('onboarding');
    // データクリア処理
  }}
  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all text-center group"
>
  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
    <GraduationCap className="w-10 h-10 text-white" />
  </div>
  <h3 className="text-2xl font-bold mb-2">学生</h3>
  <p className="text-gray-600">就活を始めたばかり、またはこれから始める方</p>
  <div className="mt-4 text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
    選択する →
  </div>
</button>
```

### 4.2 オンボーディング画面（S002）完全仕様

#### 画面構造
```tsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
  <div className="max-w-2xl mx-auto">
    {/* 戻るボタン */}
    <button
      onClick={() => {
        setCurrentView('userType');
        setUserType('');
      }}
      className="mb-6 text-gray-600 hover:text-gray-800 flex items-center group"
    >
      <ChevronRight className="w-5 h-5 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
      <span>ユーザータイプ選択に戻る</span>
    </button>

    {/* ヘッダー */}
    <div className="text-center mb-8">
      <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-2">
        {/* 動的タイトル */}
      </h1>
      <p className="text-xl text-gray-600">まず、あなたの状況を教えてください</p>
      <p className="text-lg text-blue-600 font-semibold mt-2">AIがあなた専用のキャリアパイロットになります</p>
    </div>

    {/* フォーム */}
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl space-y-6">
      {/* フィールド */}
    </div>
  </div>
</div>
```

### 4.3 ダッシュボード画面（S003）完全仕様

#### ヘッダー構造
```tsx
<header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <Sparkles className="w-8 h-8 text-blue-600" />
      <h1 className="text-2xl font-bold">PathPilot AIパイロット</h1>
      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
        {/* モードバッジ */}
      </span>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <p className="text-sm text-gray-600">
          {/* 動的テキスト */}
        </p>
        <p className="text-2xl font-bold text-blue-600">{hopeScore}%</p>
      </div>
      <Heart className={`w-8 h-8 ${hopeScore > 70 ? 'text-red-500' : 'text-gray-400'}`} />
      <button
        onClick={() => setCurrentView('onboarding')}
        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        title="プロフィール編集"
      >
        <UserCheck className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  </div>
</header>
```

---

## 5. テキストコンテンツ仕様

### 5.1 ユーザータイプ選択画面のテキスト

```typescript
const userTypeTexts = {
  title: "PathPilot AIキャリアパイロット",
  subtitle: "あなたの状況を教えてください",
  cards: {
    student: {
      title: "学生",
      description: "就活を始めたばかり、またはこれから始める方",
      hoverText: "選択する →"
    },
    newgrad: {
      title: "新卒就活中",
      description: "現在就職活動を進めている学生の方",
      hoverText: "選択する →"
    },
    career: {
      title: "転職希望",
      description: "キャリアアップ・キャリアチェンジを目指す方",
      hoverText: "選択する →"
    }
  }
};
```

### 5.2 オンボーディング画面のテキスト

```typescript
const onboardingTexts = {
  backButton: "ユーザータイプ選択に戻る",
  title: {
    student: "就活の第一歩を踏み出しましょう",
    newgrad: "内定獲得への道をナビゲートします",
    career: "理想のキャリアへ導きます"
  },
  subtitle: "まず、あなたの状況を教えてください",
  subsubtitle: "AIがあなた専用のキャリアパイロットになります",
  
  labels: {
    university: "学校名",
    major: "学部・学科・専攻",
    graduationYear: "卒業予定年",
    internExperience: "インターン経験（任意）",
    currentJob: "現在の職種",
    experience: "経験年数",
    targetJob: "希望する職種",
    targetSalary: {
      career: "希望年収（万円）",
      student: "希望初任給（万円）"
    },
    stressLevel: {
      career: "現在のストレスレベル",
      student: "就活への不安度"
    },
    emotionalState: "今の気持ち（任意）"
  },
  
  placeholders: {
    university: "例：○○大学、○○専門学校",
    major: "例：経済学部、情報処理科、看護学科",
    graduationYear: "例：2025",
    internExperience: "例：IT企業で3ヶ月のマーケティングインターン",
    currentJob: "例：営業、マーケティング、エンジニア",
    experience: "例：3",
    targetJob: {
      career: "例：プロダクトマネージャー、事業開発",
      student: "例：総合職、営業、マーケティング、エンジニア"
    },
    targetSalary: {
      career: "例：600",
      student: "例：300"
    },
    emotionalState: {
      career: "例：面接で緊張してしまう、自信を持ちたい、早く決めたい",
      student: "例：何から始めればいいかわからない、ESが書けない、面接が不安"
    }
  },
  
  stressLevelText: [
    "比較的落ち着いている",  // 1-2
    "少し不安がある",        // 3
    "不安やストレスが高い"    // 4-5
  ],
  
  submitButton: "AIパイロットを起動する"
};
```

### 5.3 ダッシュボード画面のテキスト

```typescript
const dashboardTexts = {
  header: {
    title: "PathPilot AIパイロット",
    badge: {
      student: "就活準備モード",
      newgrad: "新卒就活モード",
      career: "転職活動モード"
    },
    hopeLabel: {
      career: "内定獲得可能性",
      student: "第一志望内定可能性"
    },
    profileEditTooltip: "プロフィール編集"
  },
  
  hopeSection: {
    title: {
      career: "あなたの「内定をもらえるかも」レベル",
      student: "あなたの「第一志望に受かるかも」レベル"
    },
    refreshButton: "希望を更新",
    progressText: [
      "可能性を見つけ始めています",      // < 50%
      "確実に前進しています！",          // 50-69%
      "内定が見えてきました！",          // 70-89%
      "内定獲得まであと一歩！"           // 90%+
    ],
    
    statsCards: {
      applications: {
        title: {
          career: "応募中 {count}社",
          student: "エントリー {count}社"
        },
        subtitle: {
          career: "うち2社が最終段階",
          student: "書類選考通過2社"
        }
      },
      successRate: {
        title: "平均通過率 {rate}%",
        subtitle: "先週比+15%向上"
      },
      target: {
        title: {
          career: "推定年収 {salary}万円",
          student: "志望業界適性 高"
        },
        subtitle: "目標達成可能"
      }
    }
  },
  
  pilotAdvice: {
    title: "AIパイロットからの戦略アドバイス",
    
    urgentAction: {
      title: "🎯 今すぐやるべきこと",
      careerText: "A社の最終面接が3日後です。{stress}専用の面接対策プロンプトを生成しました。",
      studentText: "{company}の{nextAction}が迫っています。{stress}専用の対策プロンプトを用意しました。",
      stressHighText: {
        career: "ストレスが高いようですね。",
        student: "初めての就活で不安かもしれませんが、"
      },
      button: {
        career: "面接対策プロンプトを生成",
        student: "{nextAction}対策を生成"
      }
    },
    
    improvement: {
      title: "📈 成功確率を上げる行動",
      text: "B社とC社の企業研究を深めることで、内定確率を20%向上できます。"
    },
    
    selfAnalysis: {
      title: "💡 自己分析を深める",
      text: "ESや面接で使える「あなたらしさ」を見つけましょう。",
      button: "自己分析プロンプトを生成"
    }
  },
  
  pipeline: {
    title: {
      career: "応募企業パイプライン",
      student: "選考状況管理"
    },
    stageText: {
      career: "Stage {stage}/5",
      student: "選考{stage}/5"
    },
    urgencyBadge: {
      high: "要対応",
      medium: "準備中"
    },
    nextActionPrefix: "次: ",
    actionButton: "対策を生成 →",
    addButton: {
      career: "+ 新規応募を追加",
      student: "+ 新規エントリーを追加"
    }
  },
  
  promptGenerator: {
    title: "パーソナライズ・プロンプト",
    
    buttons: {
      screenshot: {
        title: "スクリーンショット分析",
        subtitle: "求人情報を自動取り込み"
      },
      hope: {
        title: "希望体験の具体化",
        subtitle: "モチベーション向上"
      },
      selfAnalysis: {
        title: "自己分析深堀り",
        subtitle: "ガクチカ・強み弱み分析"
      },
      hopeCareer: {
        title: "内定イメージ強化",
        subtitle: "モチベーション向上"
      }
    },
    
    loading: "あなた専用のプロンプトを生成中...",
    
    executeButton: "Claude/GPTで実行",
    copyButton: "コピー"
  },
  
  successPath: {
    title: {
      career: "内定獲得への道筋",
      student: "第一志望合格への道筋"
    },
    stages: [
      {
        career: "状況分析",
        student: "自己分析",
        status: ["完了", "進行中", "準備中", "もうすぐ"]
      },
      {
        career: "戦略立案",
        student: "企業研究",
        status: ["完了", "進行中", "準備中", "もうすぐ"]
      },
      {
        career: "面接対策",
        student: "選考対策",
        status: ["完了", "進行中", "準備中", "もうすぐ"]
      },
      {
        career: "内定獲得",
        student: "内定獲得",
        status: ["完了", "進行中", "準備中", "もうすぐ"]
      }
    ]
  }
};
```

---

## 6. インタラクション仕様

### 6.1 ホバーエフェクト詳細

```css
/* カードホバー */
.card-hover {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateY(-8px); /* -translate-y-2 = -8px */
}

/* ボタンホバー */
.button-primary-hover:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px); /* -translate-y-0.5 = -2px */
}

/* アイコンホバー（グループ内） */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* テキストホバー（グループ内） */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* 戻るボタンホバー */
.group:hover .group-hover\:-translate-x-1 {
  transform: translateX(-4px); /* -translate-x-1 = -4px */
}
```

### 6.2 クリック・タップフィードバック

```css
/* ボタンクリック */
.button:active {
  transform: scale(0.95);
  transition: transform 50ms;
}

/* カードクリック */
.card:active {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 50ms;
}
```

### 6.3 フォーカス状態

```css
/* 入力フィールドフォーカス */
.input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px #3b82f6; /* ring-2 ring-blue-500 */
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* ボタンフォーカス */
.button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #3b82f6;
}
```

### 6.4 遷移アニメーション

```typescript
// 画面遷移時のフェードイン
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

// プログレスバー更新
const progressTransition = {
  transition: "width 1000ms cubic-bezier(0.4, 0, 0.2, 1)"
};

// カード出現アニメーション
const cardAppear = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.4,
    stagger: 0.1 // 各カード100msずつ遅延
  }
};
```

---

## 7. 状態管理仕様

### 7.1 完全な型定義

```typescript
// ユーザータイプ
type UserType = 'student' | 'newgrad' | 'career' | '';

// ビュータイプ
type ViewType = 'userType' | 'onboarding' | 'dashboard';

// ユーザーコンテキスト
interface UserContext {
  // 共通フィールド
  targetJob: string;
  targetSalary: string;
  stressLevel: number; // 1-5
  emotionalState: string;
  
  // 学生・新卒用フィールド
  university: string;
  major: string;
  graduationYear: string;
  internExperience: string;
  
  // 転職者用フィールド
  currentJob: string;
  experience: string;
}

// 応募データ
interface Application {
  id: number;
  company: string;
  position: string;
  stage: number; // 1-5
  nextAction: string;
  urgency: 'high' | 'medium' | 'low';
  probability: number; // 0-100
  type: 'newgrad' | 'career';
}

// グローバル状態
interface GlobalState {
  currentView: ViewType;
  userType: UserType;
  userContext: UserContext;
  applicationData: Application[];
  hopeScore: number;
  loading: boolean;
  activeCompany: Application | null;
  generatedPrompt: string;
}
```

### 7.2 初期状態

```typescript
const initialState: GlobalState = {
  currentView: 'userType',
  userType: '',
  userContext: {
    targetJob: '',
    targetSalary: '',
    stressLevel: 3,
    emotionalState: '',
    university: '',
    major: '',
    graduationYear: '',
    internExperience: '',
    currentJob: '',
    experience: ''
  },
  applicationData: [],
  hopeScore: 45,
  loading: false,
  activeCompany: null,
  generatedPrompt: ''
};
```

### 7.3 状態更新関数

```typescript
// ユーザータイプ変更時のデータクリア
const handleUserTypeChange = (newType: UserType) => {
  setUserType(newType);
  
  // データクリア処理
  setUserContext(prev => ({
    ...prev,
    // 転職者選択時は学生フィールドをクリア
    ...(newType === 'career' && {
      university: '',
      major: '',
      graduationYear: '',
      internExperience: ''
    }),
    // 学生・新卒選択時は転職者フィールドをクリア
    ...(newType !== 'career' && {
      currentJob: '',
      experience: ''
    })
  }));
};

// 希望スコアの更新
const updateHopeScore = (action: string, delta: number = 10) => {
  setHopeScore(prev => {
    const newScore = prev + delta;
    return Math.min(Math.max(newScore, 0), 95);
  });
};

// プロンプト生成の遅延処理
const generatePromptWithDelay = async (purpose: string, company?: Application) => {
  setLoading(true);
  
  // 1.5秒の遅延でリアリティを演出
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const prompt = generatePromptContent(purpose, company);
  setGeneratedPrompt(prompt);
  setLoading(false);
  
  // 希望スコアを上昇
  if (purpose === 'hope' || purpose === 'interview') {
    updateHopeScore('prompt_generated', 10);
  }
};
```

---

## 8. 初期データ仕様

### 8.1 応募データの初期値

```typescript
// 学生・新卒用初期データ
const studentApplicationData: Application[] = [
  {
    id: 1,
    company: 'リクルート',
    position: '総合職',
    stage: 3,
    nextAction: 'グループディスカッション',
    urgency: 'high',
    probability: 72,
    type: 'newgrad'
  },
  {
    id: 2,
    company: 'サイバーエージェント',
    position: 'ビジネス職',
    stage: 2,
    nextAction: 'ES提出',
    urgency: 'medium',
    probability: 65,
    type: 'newgrad'
  },
  {
    id: 3,
    company: '三菱商事',
    position: '総合職',
    stage: 1,
    nextAction: 'Webテスト',
    urgency: 'high',
    probability: 58,
    type: 'newgrad'
  }
];

// 転職者用初期データ
const careerApplicationData: Application[] = [
  {
    id: 1,
    company: 'A社',
    position: 'プロダクトマネージャー',
    stage: 3,
    nextAction: '面接準備',
    urgency: 'high',
    probability: 78,
    type: 'career'
  },
  {
    id: 2,
    company: 'B社',
    position: 'マーケティング',
    stage: 2,
    nextAction: '書類提出',
    urgency: 'medium',
    probability: 65,
    type: 'career'
  },
  {
    id: 3,
    company: 'C社',
    position: 'プロダクト企画',
    stage: 4,
    nextAction: '最終面接',
    urgency: 'high',
    probability: 82,
    type: 'career'
  }
];
```

### 8.2 プロンプトテンプレート

```typescript
const promptTemplates = {
  interview: {
    student: `# {company}の{position}選考対策（{userType}専用版）

## あなたのプロフィール
- 学校：{university}（{major}）
- 卒業予定：{graduationYear}年
- インターン経験：{internExperience}
- 希望職種：{targetJob}
- 現在の心理状態：{stressLevelText}{emotionalState}

## {company}があなたを採用すべき理由

### 1. 学生時代の経験と{company}での活躍可能性
{internExperienceAnalysis}
- [具体的なエピソードと学び]
- [{company}でどう活かせるか]
{stressMessage}

### 2. {nextActionGuide}

### 3. 内定獲得に向けた戦略
現在の選考通過率：{probability}%
これを向上させるための行動：
1. {company}のOB/OG訪問（可能なら）
2. 業界研究の深堀り
3. 自己分析の再確認

このプロンプトをClaude/ChatGPTで実行して、詳細な対策を生成してください。`,
    
    career: `# {company}の{position}面接対策（転職者専用版）

## あなたのプロフィール
- 現職：{currentJob}（{experience}年）
- 目標：{targetJob}、年収{targetSalary}万円
- 現在の心理状態：{stressLevelText}{emotionalState}

## {company}があなたを採用すべき理由の整理

### 1. あなたの強みと{company}のニーズの一致点
{currentJob}での経験から、以下の点で貢献可能：
- [具体的な経験を基に、どう貢献できるか分析]
- [不安を自信に変える具体的な根拠を提示]

### 2. 面接で想定される質問と推奨回答
{stressMessage}

**Q1: なぜ弊社を志望されましたか？**
推奨回答の構成：
- {company}の○○という点に共感
- 自分の{experience}年の経験がどう活きるか
- {targetJob}として実現したいこと

**Q2: {currentJob}から{position}への転職理由は？**
ポイント：
- キャリアアップへの前向きな動機
- {company}でしか実現できない理由
- 具体的な目標とビジョン

### 3. 内定獲得確率を高める戦略
現在の推定内定確率：{probability}%
これを90%以上に引き上げるための具体的アクション`
  },
  
  hope: {
    student: `# あなたの「第一志望に内定もらえるかも」体験の具体化

## 現在の状況
- {university}の{major}
- {graduationYear}年卒業予定
- 希望職種：{targetJob}
- 現在の内定獲得期待度：{hopeScore}%

## 来年の4月、理想の社会人生活

### 成功シナリオ1：第一志望企業での活躍
{targetJob}として、憧れの企業で新しいキャリアをスタート。
入社式で同期と出会い、期待と希望に満ちた表情の自分。
研修を経て、実際のプロジェクトに参加し始める充実感。
初任給{targetSalary}万円で、自立した生活の第一歩。

### 成功シナリオ2：成長企業での挑戦
急成長中のベンチャー企業で、{targetJob}として即戦力に。
若手でも大きな裁量を持ち、自分のアイデアが形になる喜び。
優秀な先輩たちから学びながら、急速に成長する自分。

### あなたが内定を獲得できる根拠
1. {university}での学びは企業から高く評価される
2. {internExperienceEvaluation}
3. 現在応募中の{applicationCount}社はすべて可能性がある
4. 多くの先輩が同じ状況から内定を獲得している

この希望を現実にするための、今週の具体的アクション：
- {urgentCompany}の{urgentAction}準備（{urgentProbability}%の高確率）
- {secondaryActions}`,
    
    career: `# あなたの「内定をもらえるかも」体験の具体化

## 現在の状況
- {currentJob}として{experience}年の経験
- {targetJob}を目指して転職活動中
- 目標年収：{targetSalary}万円
- 現在の希望度：{hopeScore}%

## 6ヶ月後の理想の姿を描く

### 成功シナリオ1：大手企業での活躍
{targetJob}として、業界トップ企業で新しいプロジェクトをリード。
朝のミーティングで、あなたの提案が採用され、チームから信頼される瞬間。
年収{targetSalary}万円を達成し、家族も喜んでいる。

### 成功シナリオ2：成長企業でのキャリアアップ
急成長中のスタートアップで、{targetJob}として重要な役割。
自分の判断で大きな成果を生み出し、会社の成長に直接貢献。
ストックオプションも含めた魅力的な報酬パッケージ。

### あなたが内定を獲得できる根拠
1. {experience}年の実務経験は市場価値が高い
2. {currentJob}のスキルは{targetJob}で重宝される
3. 現在応募中の{applicationCount}社はすべて可能性がある

この希望を現実にするための、今週の具体的アクション：
- {urgentCompany}の最終面接準備（{urgentProbability}%の高確率）
- {secondaryActions}`
  },
  
  selfAnalysis: `# 就活のための自己分析（{userType}版）

## あなたの情報
- 学校：{university}（{major}）
- 希望職種：{targetJob}
- 不安レベル：{stressLevel}/5

## 自己分析の深堀りポイント

### 1. 学生時代に力を入れたこと（ガクチカ）
以下の観点で3つのエピソードを整理してください：
- 状況・課題は何だったか
- どんな行動を取ったか
- 結果として何を得たか
- 仕事でどう活かせるか

### 2. あなたの強み・弱み分析
- 友人から言われる長所
- 自分で認識している短所
- 短所を改善するための努力

### 3. 価値観の言語化
- 働く上で大切にしたいこと
- 10年後になりたい姿
- 社会にどう貢献したいか

### 4. 業界・企業選びの軸
- なぜその業界なのか
- 企業選びで重視すること
- 譲れない条件と妥協できる条件

このプロンプトで自己分析を深めて、ESや面接で使える「あなたらしさ」を見つけましょう。`,
  
  analysis: `# スクリーンショット分析用プロンプト

求人サイトや応募管理画面のスクリーンショットから、以下の情報を構造化して抽出してください：

## 抽出項目
1. 企業名
2. 職種/ポジション
3. 給与範囲
4. 必要スキル/経験
5. 応募締切日
6. 選考ステータス
7. 次のアクション

## 出力形式
JSON形式で以下のように出力：
{
  "company": "企業名",
  "position": "職種",
  "salary": "給与範囲",
  "requirements": ["スキル1", "スキル2"],
  "deadline": "締切日",
  "status": "選考段階",
  "nextAction": "次にすべきこと"
}

このデータはPathPilotの進捗管理システムに自動的に取り込まれます。`
};
```

---

## 9. レスポンシブデザイン仕様

### 9.1 ブレークポイント定義

```css
/* Tailwind CSS Standard Breakpoints */
/* sm: 640px and up */
/* md: 768px and up */
/* lg: 1024px and up */
/* xl: 1280px and up */
/* 2xl: 1536px and up */
```

### 9.2 レスポンシブレイアウト

```tsx
// グリッドレイアウト（ユーザータイプ選択）
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// ダッシュボードレイアウト
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// ヘッダーレスポンシブ
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">

// パディング調整
<div className="p-4 md:p-8">

// マージン調整
<div className="mb-4 md:mb-6">

// テキストサイズ調整
<h1 className="text-2xl md:text-4xl font-bold">
```

---

## 10. アニメーション仕様

### 10.1 CSS Keyframes

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### 10.2 Tailwind Animation Classes

```css
.animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
.animate-pulse { animation: pulse 2s infinite; }
.animate-spin { animation: spin 1s linear infinite; }
.animate-bounce { animation: bounce 1s infinite; }
```

---

## 11. バリデーション仕様

### 11.1 必須フィールド検証

```typescript
const validateOnboarding = (userType: UserType, context: UserContext): boolean => {
  const commonRequired = ['targetJob'];
  
  if (userType === 'career') {
    const careerRequired = ['currentJob', 'experience'];
    return [...commonRequired, ...careerRequired].every(field => 
      context[field as keyof UserContext]?.toString().trim() !== ''
    );
  }
  
  if (userType === 'student' || userType === 'newgrad') {
    const studentRequired = ['university', 'major', 'graduationYear'];
    return [...commonRequired, ...studentRequired].every(field => 
      context[field as keyof UserContext]?.toString().trim() !== ''
    );
  }
  
  return false;
};
```

### 11.2 フィールド別バリデーション

```typescript
const fieldValidators = {
  targetSalary: (value: string) => {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && num <= 9999;
  },
  
  graduationYear: (value: string) => {
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    return !isNaN(year) && year >= currentYear && year <= currentYear + 5;
  },
  
  experience: (value: string) => {
    const num = parseInt(value);
    return !isNaN(num) && num >= 0 && num <= 50;
  },
  
  stressLevel: (value: number) => {
    return value >= 1 && value <= 5;
  }
};
```

---

**UI/UX完全実装仕様書 完了**

この仕様書は実装に必要な全ての詳細を含んでおり、ピクセルパーフェクトな実装を可能にします。全ての色、スペーシング、アニメーション、状態管理、テキストコンテンツが正確に定義されており、開発者は迷うことなく実装を進めることができます。

*Document Version: 2.0 - Complete Implementation Specification*  
*Last Updated: 2025-01-06*  
*Implementation Ready: ✅*
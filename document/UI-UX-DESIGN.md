# PathPilot UI/UX完全実装仕様書
**AIキャリアパイロット - ピクセルパーフェクト実装ガイド**

Version: 2.0  
Last Updated: 2025-01-06  
Status: Complete Specification

---

## 📋 目次

1. [画面構成とナビゲーション](#1-画面構成とナビゲーション)
2. [デザインシステム](#2-デザインシステム)
3. [コンポーネント仕様](#3-コンポーネント仕様)
4. [画面別詳細仕様](#4-画面別詳細仕様)
5. [テキストコンテンツ仕様](#5-テキストコンテンツ仕様)
6. [インタラクション仕様](#6-インタラクション仕様)
7. [状態管理仕様](#7-状態管理仕様)
8. [初期データ仕様](#8-初期データ仕様)
9. [レスポンシブデザイン仕様](#9-レスポンシブデザイン仕様)
10. [アニメーション仕様](#10-アニメーション仕様)
11. [バリデーション仕様](#11-バリデーション仕様)

---

## 1. 画面構成とナビゲーション

### 1.1 画面一覧と遷移条件

| 画面ID | 画面名 | パス | 表示条件 | 遷移先 |
|--------|--------|------|----------|---------|
| S001 | ユーザータイプ選択 | `/` | 初回アクセス時 | S002 |
| S002 | オンボーディング | `/onboarding` | userType設定後 | S001, S003 |
| S003 | ダッシュボード | `/dashboard` | プロフィール完了後 | S002 |

### 1.2 画面遷移マトリクス

| 現在画面 | アクション | 遷移先 | 遷移条件 |
|---------|-----------|---------|----------|
| S001 | カード選択 | S002 | userType設定 |
| S002 | 戻るボタン | S001 | - |
| S002 | 起動ボタン | S003 | 必須フィールド入力済み |
| S003 | プロフィール編集 | S002 | - |

### 1.3 ナビゲーション要素の正確な仕様

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

## 2. デザインシステム

### 2.1 カラーパレット（Tailwind CSS準拠）

```css
/* Primary Colors - 正確なHEX値 */
--color-blue-50: #eff6ff;
--color-blue-100: #dbeafe;
--color-blue-200: #bfdbfe;
--color-blue-500: #3b82f6;
--color-blue-600: #2563eb;
--color-blue-700: #1d4ed8;
--color-blue-800: #1e40af;

/* Secondary Colors */
--color-amber-100: #fef3c7;
--color-amber-400: #fbbf24;
--color-amber-500: #f59e0b;
--color-orange-50: #fff7ed;
--color-orange-100: #ffedd5;
--color-orange-200: #fed7aa;
--color-orange-500: #f97316;
--color-orange-600: #ea580c;

/* Accent Colors */
--color-purple-50: #faf5ff;
--color-purple-100: #f3e8ff;
--color-purple-200: #e9d5ff;
--color-purple-500: #a855f7;
--color-purple-600: #9333ea;
--color-purple-800: #6b21a8;
--color-pink-500: #ec4899;
--color-cyan-500: #06b6d4;

/* Semantic Colors */
--color-green-50: #f0fdf4;
--color-green-400: #4ade80;
--color-green-500: #22c55e;
--color-green-600: #16a34a;
--color-red-100: #fee2e2;
--color-red-500: #ef4444;
--color-red-700: #dc2626;
--color-yellow-100: #fef3c7;
--color-yellow-700: #a16207;

/* Neutral Colors */
--color-slate-50: #f8fafc;
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-white: #ffffff;
--color-transparent: transparent;

/* Opacity Values */
--opacity-90: 0.9;
--opacity-80: 0.8;
--opacity-50: 0.5;
--opacity-20: 0.2;
--opacity-10: 0.1;
```

### 2.2 グラデーション定義

```css
/* 背景グラデーション */
.bg-gradient-main {
  background: linear-gradient(to bottom right, #f8fafc, #dbeafe);
}

/* ボタングラデーション */
.bg-gradient-primary {
  background: linear-gradient(to right, #fbbf24, #f97316);
}

/* セクショングラデーション */
.bg-gradient-hero {
  background: linear-gradient(to right, #3b82f6, #9333ea);
}

/* カードグラデーション */
.bg-gradient-student {
  background: linear-gradient(to right, #3b82f6, #06b6d4);
}

.bg-gradient-newgrad {
  background: linear-gradient(to right, #a855f7, #ec4899);
}

.bg-gradient-career {
  background: linear-gradient(to right, #f97316, #ef4444);
}
```

### 2.3 タイポグラフィ（完全仕様）

```css
/* Font Stack */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

/* Text Sizes with Line Heights */
.text-xs { font-size: 0.75rem; line-height: 1rem; }      /* 12px/16px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }  /* 14px/20px */
.text-base { font-size: 1rem; line-height: 1.5rem; }     /* 16px/24px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }  /* 18px/28px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }   /* 20px/28px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }      /* 24px/32px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px/36px */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }   /* 36px/40px */
.text-5xl { font-size: 3rem; line-height: 1; }           /* 48px/48px */

/* Font Weights */
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

### 2.4 スペーシング（正確な値）

```css
/* Padding/Margin Values */
.p-0 { padding: 0; }
.p-1 { padding: 0.25rem; }  /* 4px */
.p-2 { padding: 0.5rem; }   /* 8px */
.p-3 { padding: 0.75rem; }  /* 12px */
.p-4 { padding: 1rem; }     /* 16px */
.p-5 { padding: 1.25rem; }  /* 20px */
.p-6 { padding: 1.5rem; }   /* 24px */
.p-8 { padding: 2rem; }     /* 32px */

/* Specific Directional Spacing */
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }

.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }

/* Margins */
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-12 { margin-bottom: 3rem; }

.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }

.mr-1 { margin-right: 0.25rem; }
.mr-2 { margin-right: 0.5rem; }
.mr-3 { margin-right: 0.75rem; }
.mr-4 { margin-right: 1rem; }

.mx-auto { margin-left: auto; margin-right: auto; }
.mx-4 { margin-left: 1rem; margin-right: 1rem; }
```

### 2.5 境界線とコーナー半径

```css
/* Border Radius */
.rounded-none { border-radius: 0; }
.rounded { border-radius: 0.25rem; }        /* 4px */
.rounded-lg { border-radius: 0.5rem; }      /* 8px */
.rounded-xl { border-radius: 0.75rem; }     /* 12px */
.rounded-2xl { border-radius: 1rem; }       /* 16px */
.rounded-3xl { border-radius: 1.5rem; }     /* 24px */
.rounded-full { border-radius: 9999px; }

/* Borders */
.border { border-width: 1px; }
.border-b { border-bottom-width: 1px; }
.border-gray-200 { border-color: #e5e7eb; }
.border-gray-300 { border-color: #d1d5db; }
.border-white/20 { border-color: rgba(255, 255, 255, 0.2); }
.border-blue-200 { border-color: #bfdbfe; }
.border-orange-200 { border-color: #fed7aa; }
.border-purple-200 { border-color: #e9d5ff; }
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
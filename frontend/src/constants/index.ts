// PathPilot UI/UX完全実装仕様書準拠のテキストコンテンツ定数

import type { 
  UserTypeTexts, 
  OnboardingTexts, 
  DashboardTexts, 
  PromptTemplates,
  Application,
  UserContext,
  FieldValidators
} from '@/types';

// ユーザータイプ選択画面のテキスト
export const userTypeTexts: UserTypeTexts = {
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

// オンボーディング画面のテキスト
export const onboardingTexts: OnboardingTexts = {
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

// ダッシュボード画面のテキスト
export const dashboardTexts: DashboardTexts = {
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
      title: "今すぐやるべきこと",
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
      title: "成功確率を上げる行動",
      text: "B社とC社の企業研究を深めることで、内定確率を20%向上できます。"
    },
    
    selfAnalysis: {
      title: "自己分析を深める",
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

// 初期状態データ
export const initialUserContext: UserContext = {
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
};

// 学生・新卒用初期データ
export const studentApplicationData: Application[] = [
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
export const careerApplicationData: Application[] = [
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

// プロンプトテンプレート
export const promptTemplates: PromptTemplates = {
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

// バリデーション関数
export const fieldValidators: FieldValidators = {
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

// アニメーション設定
export const animations = {
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  
  progressTransition: {
    transition: "width 1000ms cubic-bezier(0.4, 0, 0.2, 1)"
  },
  
  cardAppear: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.4,
      stagger: 0.1
    }
  }
};
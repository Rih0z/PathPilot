// PathPilot UI/UX完全実装仕様書準拠の型定義

// ユーザータイプ
export type UserType = 'student' | 'newgrad' | 'career' | '';

// ビュータイプ
export type ViewType = 'userType' | 'onboarding' | 'dashboard';

// ユーザーコンテキスト
export interface UserContext {
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
export interface Application {
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
export interface GlobalState {
  currentView: ViewType;
  userType: UserType;
  userContext: UserContext;
  applicationData: Application[];
  hopeScore: number;
  loading: boolean;
  activeCompany: Application | null;
  generatedPrompt: string;
}

// テキストコンテンツ仕様

// ユーザータイプ選択画面のテキスト
export interface UserTypeTexts {
  title: string;
  subtitle: string;
  cards: {
    student: {
      title: string;
      description: string;
      hoverText: string;
    };
    newgrad: {
      title: string;
      description: string;
      hoverText: string;
    };
    career: {
      title: string;
      description: string;
      hoverText: string;
    };
  };
}

// オンボーディング画面のテキスト
export interface OnboardingTexts {
  backButton: string;
  title: {
    student: string;
    newgrad: string;
    career: string;
  };
  subtitle: string;
  subsubtitle: string;
  labels: {
    university: string;
    major: string;
    graduationYear: string;
    internExperience: string;
    currentJob: string;
    experience: string;
    targetJob: string;
    targetSalary: {
      career: string;
      student: string;
    };
    stressLevel: {
      career: string;
      student: string;
    };
    emotionalState: string;
  };
  placeholders: {
    university: string;
    major: string;
    graduationYear: string;
    internExperience: string;
    currentJob: string;
    experience: string;
    targetJob: {
      career: string;
      student: string;
    };
    targetSalary: {
      career: string;
      student: string;
    };
    emotionalState: {
      career: string;
      student: string;
    };
  };
  stressLevelText: string[];
  submitButton: string;
}

// ダッシュボード画面のテキスト
export interface DashboardTexts {
  header: {
    title: string;
    badge: {
      student: string;
      newgrad: string;
      career: string;
    };
    hopeLabel: {
      career: string;
      student: string;
    };
    profileEditTooltip: string;
  };
  hopeSection: {
    title: {
      career: string;
      student: string;
    };
    refreshButton: string;
    progressText: string[];
    statsCards: {
      applications: {
        title: {
          career: string;
          student: string;
        };
        subtitle: {
          career: string;
          student: string;
        };
      };
      successRate: {
        title: string;
        subtitle: string;
      };
      target: {
        title: {
          career: string;
          student: string;
        };
        subtitle: string;
      };
    };
  };
  pilotAdvice: {
    title: string;
    urgentAction: {
      title: string;
      careerText: string;
      studentText: string;
      stressHighText: {
        career: string;
        student: string;
      };
      button: {
        career: string;
        student: string;
      };
    };
    improvement: {
      title: string;
      text: string;
    };
    selfAnalysis: {
      title: string;
      text: string;
      button: string;
    };
  };
  pipeline: {
    title: {
      career: string;
      student: string;
    };
    stageText: {
      career: string;
      student: string;
    };
    urgencyBadge: {
      high: string;
      medium: string;
    };
    nextActionPrefix: string;
    actionButton: string;
    addButton: {
      career: string;
      student: string;
    };
  };
  promptGenerator: {
    title: string;
    buttons: {
      screenshot: {
        title: string;
        subtitle: string;
      };
      hope: {
        title: string;
        subtitle: string;
      };
      selfAnalysis: {
        title: string;
        subtitle: string;
      };
      hopeCareer: {
        title: string;
        subtitle: string;
      };
    };
    loading: string;
    executeButton: string;
    copyButton: string;
  };
  successPath: {
    title: {
      career: string;
      student: string;
    };
    stages: Array<{
      career: string;
      student: string;
      status: string[];
    }>;
  };
}

// プロンプトテンプレート
export interface PromptTemplates {
  interview: {
    student: string;
    career: string;
  };
  hope: {
    student: string;
    career: string;
  };
  selfAnalysis: string;
  analysis: string;
}

// バリデーション
export type FieldValidators = {
  targetSalary: (value: string) => boolean;
  graduationYear: (value: string) => boolean;
  experience: (value: string) => boolean;
  stressLevel: (value: number) => boolean;
};

// コンポーネントプロパティ
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export interface CardProps {
  variant?: 'default' | 'hover' | 'gradient';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  animated?: boolean;
}

// アニメーション
export interface PageTransition {
  initial: { opacity: number };
  animate: { opacity: number };
  transition: { duration: number };
}

export interface CardAppearance {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  transition: { 
    duration: number;
    stagger?: number;
  };
}

// アイコンマッピング
export type IconName = 
  | 'Sparkles'
  | 'ChevronRight' 
  | 'GraduationCap'
  | 'Briefcase'
  | 'UserCheck'
  | 'Heart'
  | 'Target'
  | 'TrendingUp'
  | 'Brain'
  | 'Camera'
  | 'Send'
  | 'RefreshCw'
  | 'CheckCircle'
  | 'Award'
  | 'Smile'
  | 'Frown'
  | 'Check';

// ユーティリティ型
export type RequiredFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// React.FC型のエイリアス
export type FC<P = {}> = React.FC<P>;
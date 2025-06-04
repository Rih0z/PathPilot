// User and Authentication Types
export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  contexts: UserContext;
  subscription: UserSubscription;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  name: string;
  current_role: string;
  experience_years: number;
  target_role: string;
  target_industry: string;
  skills?: string[];
  education?: string;
}

export interface UserContext {
  emotional_state: EmotionalState;
  goals: CareerGoals;
  preferences?: UserPreferences;
}

export interface EmotionalState {
  stress_level: number; // 0-1
  motivation_level: 'low' | 'medium' | 'high';
  confidence_level: number; // 0-1
  last_updated: string;
}

export interface CareerGoals {
  target_salary: number;
  location_preference: string;
  work_style: 'office' | 'remote' | 'hybrid';
  timeline: string;
}

export interface UserPreferences {
  communication_style: 'encouraging' | 'professional' | 'direct';
  prompt_length: 'short' | 'medium' | 'long';
  feedback_type: 'gentle' | 'honest' | 'detailed';
  privacy_level: 'open' | 'private';
}

export interface UserSubscription {
  tier: 'free' | 'premium';
  phase: '1' | '2' | '3';
  usage_limits: UsageLimits;
  expires_at?: string;
}

export interface UsageLimits {
  daily_prompts: number;
  daily_recommendations: number;
  monthly_applications: number;
  ai_analysis_credits: number;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Hope Generation Types
export interface HopeExperience {
  hope_statement: string;
  success_probability: string;
  similar_success_story: SimilarityMatch;
  next_action: Action;
  evidence_preview: string;
  confidence_boost_expected: number;
}

export interface SimilarityMatch {
  id: string;
  similarity_score: number;
  key_similarities: string[];
  success_path: SuccessPath;
  concrete_outcomes: ConcreteOutcomes;
}

export interface SuccessPath {
  key_actions: string[];
  timeline: string;
  obstacles_overcome: string[];
  critical_moments: string[];
}

export interface ConcreteOutcomes {
  offer_received: boolean;
  salary_achieved: number;
  timeline_to_offer: number;
  company_name: string;
}

export interface Action {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimated_time: string;
  expected_impact: string;
}

// Form Types for With-style questionnaire
export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  question: string;
  type: 'single-select' | 'multi-select' | 'text' | 'slider' | 'card-select' | 'image-select';
  options?: QuestionOption[];
  validation?: ValidationRule;
  psychological_trigger: 'curiosity' | 'social_proof' | 'commitment' | 'reciprocity' | 'authority';
  progress_weight: number; // for calculating progress
}

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  image?: string;
  color?: string;
  value: any;
  psychological_appeal: 'aspiration' | 'safety' | 'status' | 'growth' | 'belonging';
}

export interface ValidationRule {
  required?: boolean;
  min_length?: number;
  max_length?: number;
  min_value?: number;
  max_value?: number;
  pattern?: string;
  custom_message?: string;
}

export interface OnboardingResponse {
  step_id: string;
  answer: any;
  timestamp: string;
  time_spent: number; // milliseconds
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export interface CardProps {
  variant?: 'default' | 'netflix' | 'uber' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface ProgressIndicatorProps {
  current: number;
  total: number;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'hope';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

// Animation Types
export interface AnimationVariants {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
}

// Color Psychology Types
export interface ColorPsychology {
  primary: string; // trust, professionalism
  accent: string; // hope, energy
  success: string; // growth, achievement
  calm: string; // relaxation, peace
  hope: string; // optimism, confidence
  energy: string; // motivation, action
}

// Mobile Optimization Types
export interface TouchGesture {
  type: 'tap' | 'swipe' | 'pinch' | 'long-press';
  direction?: 'up' | 'down' | 'left' | 'right';
  handler: (event: any) => void;
}

export interface ResponsiveBreakpoint {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  width: number;
  height: number;
}
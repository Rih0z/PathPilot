// Core User Types
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
  communication_tone: 'encouraging' | 'professional' | 'direct';
  feedback_frequency: 'daily' | 'weekly' | 'as_needed';
  privacy_level: 'open' | 'private';
}

// Subscription & Monetization Types
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

// Prompt Types
export interface PromptTemplate {
  id: string;
  category: PromptCategory;
  name: string;
  description: string;
  template: string;
  variables: string[];
  effectiveness_score: number;
  phase_availability: ('1' | '2' | '3')[];
  created_at: string;
  updated_at: string;
}

export type PromptCategory = 
  | 'job_search'
  | 'resume_optimization'
  | 'interview_prep'
  | 'company_research'
  | 'salary_negotiation'
  | 'network_building';

export interface PersonalizedPrompt {
  id: string;
  template_id: string;
  user_id: string;
  generated_prompt: string;
  context_data: Record<string, any>;
  personalization_score: number;
  expected_effectiveness: number;
  created_at: string;
}

// Application Tracking Types
export interface Application {
  id: string;
  user_id: string;
  company_name: string;
  position_title: string;
  job_url?: string;
  status: ApplicationStatus;
  stage: ApplicationStage;
  priority_score: number;
  success_probability: number;
  application_date: string;
  last_update: string;
  ai_analysis_results?: AIAnalysisResult;
}

export type ApplicationStatus = 
  | 'researching'
  | 'applied'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'final_round'
  | 'offer_received'
  | 'rejected'
  | 'withdrawn';

export type ApplicationStage = 
  | 'research'
  | 'application_prep'
  | 'application_sent'
  | 'first_interview'
  | 'second_interview'
  | 'final_interview'
  | 'offer_negotiation'
  | 'decision';

export interface AIAnalysisResult {
  match_score: number;
  key_requirements: string[];
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  success_factors: string[];
  analyzed_at: string;
}

// Success Pattern Types (NEW)
export interface SuccessPattern {
  id: string;
  user_profile: {
    previous_role: string;
    experience_years: number;
    skills: string[];
    education?: string;
  };
  success_path: {
    key_actions: string[];
    timeline: string;
    obstacles_overcome: string[];
    critical_moments: string[];
  };
  employer_match: {
    company_type: string;
    role: string;
    culture_fit_factors: string[];
  };
  concrete_outcomes: {
    offer_received: boolean;
    salary_achieved: number;
    timeline_to_offer: number; // days
    company_name: string;
  };
}

export interface SimilarityMatch {
  id: string;
  similarity_score: number;
  key_similarities: string[];
  success_path: SuccessPattern['success_path'];
  concrete_outcomes: SuccessPattern['concrete_outcomes'];
}

export interface SuccessProbability {
  overall_probability: number;
  confidence_factors: string[];
  risk_factors: string[];
  timeline_estimate: number; // days
  evidence_strength: 'weak' | 'moderate' | 'strong';
  improvement_actions?: string[];
}

export interface SuccessRoadmap {
  milestones: Milestone[];
  total_timeline: string;
  first_week_actions: Action[];
  critical_success_factors: string[];
  expected_challenges: string[];
}

export interface Milestone {
  id: string;
  action: string;
  expected_outcome: string;
  timeline: string;
  dependencies: string[];
  success_probability: number;
  confidence_boost: number;
}

export interface Action {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimated_time: string;
  expected_impact: string;
}

export interface ConcreteEvidence {
  value_propositions: ValueProposition[];
  interview_stories: InterviewStory[];
  unique_advantages: string[];
  quantified_achievements: string[];
}

export interface ValueProposition {
  statement: string;
  evidence: string;
  impact: string;
  relevance_score: number;
}

export interface InterviewStory {
  situation: string;
  task: string;
  action: string;
  result: string;
  skills_demonstrated: string[];
}

export interface ProgressTracking {
  completed_milestones: string[];
  confidence_trajectory: number[];
  momentum_score: number;
  wins_accumulated: string[];
  next_milestone: Milestone;
}

// Hope Generation Types (NEW)
export interface HopeExperience {
  hope_statement: string;
  success_probability: string;
  similar_success_story: string;
  next_action: Action;
  evidence_preview: string;
  confidence_boost_expected: number;
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
  details?: Record<string, any> | undefined;
}

// Usage Analytics Types
export interface UsageRecord {
  user_id: string;
  action: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface UsageStats {
  daily_prompts_used: number;
  daily_recommendations_used: number;
  monthly_applications: number;
  ai_credits_used: number;
  last_reset: string;
}

// Environment Types
export interface Env {
  USER_CONTEXTS: KVNamespace;
  PROMPT_TEMPLATES: KVNamespace;
  USAGE_ANALYTICS: KVNamespace;
  ENVIRONMENT: string;
  MONETIZATION_PHASE: string;
  DEBUG_MODE: string;
  JWT_SECRET?: string;
  CLAUDE_API_KEY?: string;
  OPENAI_API_KEY?: string;
}
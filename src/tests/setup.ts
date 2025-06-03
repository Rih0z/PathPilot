import { beforeEach, vi } from 'vitest';

// Mock Cloudflare Workers environment
export interface MockEnv {
  USER_CONTEXTS: KVNamespace;
  PROMPT_TEMPLATES: KVNamespace;
  USAGE_ANALYTICS: KVNamespace;
  ENVIRONMENT: string;
  MONETIZATION_PHASE: string;
  DEBUG_MODE: string;
}

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
  
  // Reset console warnings
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

// Helper function to create mock environment
export const createMockEnv = (overrides: Partial<MockEnv> = {}): MockEnv => {
  const mockKV = {
    get: vi.fn().mockResolvedValue(null),
    put: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    list: vi.fn().mockResolvedValue({ keys: [] })
  } as unknown as KVNamespace;

  return {
    USER_CONTEXTS: mockKV,
    PROMPT_TEMPLATES: mockKV,
    USAGE_ANALYTICS: mockKV,
    ENVIRONMENT: 'test',
    MONETIZATION_PHASE: '1',
    DEBUG_MODE: 'true',
    JWT_SECRET: 'test-secret-key',
    ...overrides
  };
};

// Helper function to create mock user data
export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  profile: {
    name: 'Test User',
    current_role: 'Marketing Specialist',
    experience_years: 3,
    target_role: 'Marketing Manager',
    target_industry: 'Tech'
  },
  contexts: {
    emotional_state: {
      stress_level: 0.6,
      motivation_level: 'high',
      confidence_level: 0.7,
      last_updated: new Date().toISOString()
    },
    goals: {
      target_salary: 500000,
      location_preference: 'Tokyo',
      work_style: 'remote',
      timeline: '3 months'
    }
  },
  subscription: {
    tier: 'free',
    phase: '1',
    usage_limits: {
      daily_prompts: 10,
      daily_recommendations: 5,
      monthly_applications: 50,
      ai_analysis_credits: 100
    }
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides
});

// Helper function to create mock prompt template
export const createMockPromptTemplate = (overrides = {}) => ({
  id: 'prompt-123',
  category: 'job_search',
  name: 'Basic Job Search',
  template: 'Search for jobs in {industry} for {role} with {experience} years experience',
  variables: ['industry', 'role', 'experience'],
  effectiveness_score: 0.85,
  created_at: new Date().toISOString(),
  ...overrides
});

// Helper function to create mock application data
export const createMockApplication = (overrides = {}) => ({
  id: 'app-123',
  user_id: 'user-123',
  company_name: 'Tech Corp',
  position_title: 'Marketing Manager',
  status: 'applied',
  priority_score: 0.8,
  success_probability: 0.7,
  stage: 'application_sent',
  application_date: new Date().toISOString(),
  ...overrides
});
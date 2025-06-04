import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <a {...props}>{children}</a>,
    input: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <input {...props}>{children}</input>,
    textarea: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <textarea {...props}>{children}</textarea>,
    span: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <p {...props}>{children}</p>,
    h1: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <h3 {...props}>{children}</h3>,
    section: ({ children, animate, initial, transition, variants, whileHover, whileTap, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children, mode }: any) => <>{children}</>,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
}));

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Mock data generators
export const mockUser = {
  id: "test_user_123",
  email: "test@example.com",
  profile: {
    name: "Test User",
    current_role: "Test Role",
    experience_years: 2,
    target_role: "Target Role",
    target_industry: "Tech",
    skills: ["JavaScript", "React", "Testing"],
    education: "Test University"
  },
  contexts: {
    emotional_state: {
      stress_level: 0.5,
      motivation_level: "medium" as const,
      confidence_level: 0.7,
      last_updated: new Date().toISOString()
    },
    goals: {
      target_salary: 6000000,
      location_preference: "Tokyo",
      work_style: "hybrid" as const,
      timeline: "3 months"
    },
    preferences: {
      communication_style: "encouraging" as const,
      prompt_length: "medium" as const,
      feedback_type: "gentle" as const,
      privacy_level: "open" as const
    }
  },
  subscription: {
    tier: "free" as const,
    phase: "2" as const,
    usage_limits: {
      daily_prompts: 5,
      daily_recommendations: 3,
      monthly_applications: 10,
      ai_analysis_credits: 20
    }
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const mockHopeExperience = {
  hope_statement: "Test hope statement for your future success",
  success_probability: "85% chance of success",
  similar_success_story: {
    id: "success_test",
    similarity_score: 0.92,
    key_similarities: ["Similar background", "Same skills", "Similar goals"],
    success_path: {
      key_actions: ["Action 1", "Action 2", "Action 3"],
      timeline: "3 months",
      obstacles_overcome: ["Obstacle 1", "Obstacle 2"],
      critical_moments: ["Moment 1", "Moment 2"]
    },
    concrete_outcomes: {
      offer_received: true,
      salary_achieved: 6500000,
      timeline_to_offer: 90,
      company_name: "Test Company"
    }
  },
  next_action: {
    id: "action_test",
    description: "Test action description",
    priority: "high" as const,
    estimated_time: "2 hours",
    expected_impact: "High impact on success"
  },
  evidence_preview: "Test evidence showing success patterns",
  confidence_boost_expected: 0.85
};

export const mockOnboardingSteps = [
  {
    id: 'test_step',
    title: 'Test Step',
    subtitle: 'Test subtitle',
    question: 'Test question?',
    type: 'text' as const,
    psychological_trigger: 'curiosity' as const,
    progress_weight: 50,
    validation: { required: true, min_length: 1 }
  }
];

// Helper to wait for animations
export const waitForAnimation = () => new Promise(resolve => setTimeout(resolve, 100));

// Helper to mock API responses
export const mockApiResponse = (data: any, success = true) => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : { code: 'TEST_ERROR', message: 'Test error' },
  timestamp: new Date().toISOString()
});
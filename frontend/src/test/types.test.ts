import { describe, it, expect } from 'vitest';
import type {
  User,
  UserProfile,
  EmotionalState,
  CareerGoals,
  HopeExperience,
  OnboardingStep,
  QuestionOption,
  OnboardingResponse
} from '@/types';

describe('Type definitions', () => {
  it('should define User interface correctly', () => {
    const user: User = {
      id: "test_user",
      email: "test@example.com",
      profile: {
        name: "Test User",
        current_role: "Developer",
        experience_years: 2,
        target_role: "Senior Developer",
        target_industry: "Tech"
      },
      contexts: {
        emotional_state: {
          stress_level: 0.5,
          motivation_level: "medium",
          confidence_level: 0.7,
          last_updated: new Date().toISOString()
        },
        goals: {
          target_salary: 6000000,
          location_preference: "Tokyo",
          work_style: "hybrid",
          timeline: "6 months"
        }
      },
      subscription: {
        tier: "free",
        phase: "1",
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

    expect(user.id).toBe("test_user");
    expect(user.profile.name).toBe("Test User");
    expect(user.contexts.emotional_state.stress_level).toBe(0.5);
  });

  it('should define OnboardingStep interface correctly', () => {
    const step: OnboardingStep = {
      id: "test_step",
      title: "Test Step",
      question: "Test question?",
      type: "text",
      psychological_trigger: "curiosity",
      progress_weight: 25
    };

    expect(step.id).toBe("test_step");
    expect(step.type).toBe("text");
    expect(step.psychological_trigger).toBe("curiosity");
  });

  it('should define QuestionOption interface correctly', () => {
    const option: QuestionOption = {
      id: "option1",
      label: "Option 1",
      value: "opt1",
      psychological_appeal: "aspiration"
    };

    expect(option.id).toBe("option1");
    expect(option.psychological_appeal).toBe("aspiration");
  });

  it('should define OnboardingResponse interface correctly', () => {
    const response: OnboardingResponse = {
      step_id: "step1",
      answer: "test answer",
      timestamp: new Date().toISOString(),
      time_spent: 5000
    };

    expect(response.step_id).toBe("step1");
    expect(response.answer).toBe("test answer");
    expect(typeof response.time_spent).toBe("number");
  });

  it('should define HopeExperience interface correctly', () => {
    const hope: HopeExperience = {
      hope_statement: "Test hope statement",
      success_probability: "85%",
      similar_success_story: {
        id: "story1",
        similarity_score: 0.9,
        key_similarities: ["skill1", "skill2"],
        success_path: {
          key_actions: ["action1", "action2"],
          timeline: "3 months",
          obstacles_overcome: ["obstacle1"],
          critical_moments: ["moment1"]
        },
        concrete_outcomes: {
          offer_received: true,
          salary_achieved: 6500000,
          timeline_to_offer: 90,
          company_name: "Test Company"
        }
      },
      next_action: {
        id: "action1",
        description: "Test action",
        priority: "high",
        estimated_time: "1 hour",
        expected_impact: "High impact"
      },
      evidence_preview: "Test evidence",
      confidence_boost_expected: 0.8
    };

    expect(hope.hope_statement).toBe("Test hope statement");
    expect(hope.similar_success_story.similarity_score).toBe(0.9);
    expect(hope.next_action.priority).toBe("high");
  });

  it('should define emotional state correctly', () => {
    const emotionalState: EmotionalState = {
      stress_level: 0.6,
      motivation_level: "high",
      confidence_level: 0.8,
      last_updated: new Date().toISOString()
    };

    expect(emotionalState.stress_level).toBe(0.6);
    expect(emotionalState.motivation_level).toBe("high");
  });

  it('should define career goals correctly', () => {
    const goals: CareerGoals = {
      target_salary: 7000000,
      location_preference: "Remote",
      work_style: "remote",
      timeline: "1 year"
    };

    expect(goals.target_salary).toBe(7000000);
    expect(goals.work_style).toBe("remote");
  });
});
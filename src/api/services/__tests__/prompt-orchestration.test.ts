import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PromptOrchestrationEngine } from '../prompt-orchestration';
import { createMockEnv, createMockUser, createMockPromptTemplate } from '../../../tests/setup';
import type { MockEnv } from '../../../tests/setup';

describe('PromptOrchestrationEngine', () => {
  let orchestrationEngine: PromptOrchestrationEngine;
  let mockEnv: MockEnv;

  beforeEach(() => {
    vi.clearAllMocks();
    mockEnv = createMockEnv();
    orchestrationEngine = new PromptOrchestrationEngine(mockEnv);
  });

  describe('generatePersonalizedPrompt', () => {
    it('should generate a personalized prompt based on user context', async () => {
      // Arrange
      const mockUser = createMockUser({
        profile: {
          name: 'Test User',
          current_role: 'Junior Developer',
          experience_years: 3,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        },
        contexts: {
          emotional_state: {
            stress_level: 0.7,
            motivation_level: 'high',
            confidence_level: 0.6,
            last_updated: new Date().toISOString()
          },
          goals: {
            target_salary: 600000,
            location_preference: 'Tokyo',
            work_style: 'remote',
            timeline: '3 months'
          }
        }
      });

      const mockTemplate = createMockPromptTemplate({
        category: 'job_search',
        template: 'Search for {target_role} positions in {location_preference} with {work_style} work style. Target salary: {target_salary} yen.',
        variables: ['target_role', 'location_preference', 'work_style', 'target_salary']
      });

      // Mock KV storage - setup proper key patterns used in the code
      (mockEnv.USER_CONTEXTS.get as any)
        .mockImplementation((key: string) => {
          if (key === `user_id:${mockUser.id}`) return Promise.resolve(JSON.stringify(mockUser));
          if (key === `user:${mockUser.id}`) return Promise.resolve(JSON.stringify(mockUser));
          return Promise.resolve(null);
        });
      (mockEnv.PROMPT_TEMPLATES.get as any)
        .mockImplementation((key: string) => {
          if (key === `template:${mockTemplate.id}`) return Promise.resolve(JSON.stringify(mockTemplate));
          return Promise.resolve(null);
        });
      (mockEnv.USER_CONTEXTS.put as any).mockResolvedValue(undefined);

      // Act
      const result = await orchestrationEngine.generatePersonalizedPrompt({
        userId: mockUser.id,
        templateId: mockTemplate.id,
        additionalContext: {}
      });

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.generated_prompt).toContain('Senior Developer');
      expect(result.data?.generated_prompt).toContain('Tokyo');
      expect(result.data?.generated_prompt).toContain('remote');
      expect(result.data?.generated_prompt).toContain('600000');
      expect(result.data?.personalization_score).toBeGreaterThan(0.8);
      expect(result.data?.expected_effectiveness).toBeGreaterThan(0.7);
    });

    it('should adapt prompt tone based on stress level', async () => {
      // Arrange - High stress user
      const highStressUser = createMockUser({
        profile: {
          name: 'Stressed User',
          current_role: 'Developer',
          experience_years: 2,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        },
        contexts: {
          emotional_state: {
            stress_level: 0.9,
            motivation_level: 'low',
            confidence_level: 0.3,
            last_updated: new Date().toISOString()
          }
        }
      });

      const mockTemplate = createMockPromptTemplate({
        template: 'Find job opportunities for {target_role}',
        variables: ['target_role']
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get)
        .mockImplementation((key: string) => {
          if (key === `user_id:${highStressUser.id}`) return Promise.resolve(JSON.stringify(highStressUser));
          if (key === `user:${highStressUser.id}`) return Promise.resolve(JSON.stringify(highStressUser));
          return Promise.resolve(null);
        });
      vi.mocked(mockEnv.PROMPT_TEMPLATES.get)
        .mockImplementation((key: string) => {
          if (key === `template:${mockTemplate.id}`) return Promise.resolve(JSON.stringify(mockTemplate));
          return Promise.resolve(null);
        });
      vi.mocked(mockEnv.USER_CONTEXTS.put).mockResolvedValue(undefined);

      // Act
      const result = await orchestrationEngine.generatePersonalizedPrompt({
        userId: highStressUser.id,
        templateId: mockTemplate.id,
        additionalContext: {}
      });

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.generated_prompt).toMatch(/gentle|supportive|encouraging|step-by-step/i);
      expect(result.data?.context_data.recommended_tone).toBe('encouraging');
    });

    it('should handle missing user context gracefully', async () => {
      // Arrange
      const templateId = 'prompt-123';
      
      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(null);

      // Act
      const result = await orchestrationEngine.generatePersonalizedPrompt({
        userId: 'non-existent-user',
        templateId,
        additionalContext: {}
      });

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('USER_NOT_FOUND');
    });

    it('should handle missing template gracefully', async () => {
      // Arrange
      const mockUser = createMockUser();
      
      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(mockUser));
      vi.mocked(mockEnv.PROMPT_TEMPLATES.get).mockResolvedValueOnce(null);

      // Act
      const result = await orchestrationEngine.generatePersonalizedPrompt({
        userId: mockUser.id,
        templateId: 'non-existent-template',
        additionalContext: {}
      });

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('TEMPLATE_NOT_FOUND');
    });
  });

  describe('analyzeUserContext', () => {
    it('should analyze user emotional state and provide recommendations', async () => {
      // Arrange
      const mockUser = createMockUser({
        contexts: {
          emotional_state: {
            stress_level: 0.8,
            motivation_level: 'medium',
            confidence_level: 0.4,
            last_updated: new Date().toISOString()
          },
          goals: {
            target_salary: 500000,
            location_preference: 'Tokyo',
            work_style: 'remote',
            timeline: '3 months'
          }
        }
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get)
        .mockImplementation((key: string) => {
          if (key === `user_id:${mockUser.id}`) return Promise.resolve(JSON.stringify(mockUser));
          if (key === `user:${mockUser.id}`) return Promise.resolve(JSON.stringify(mockUser));
          return Promise.resolve(null);
        });

      // Act
      const result = await orchestrationEngine.analyzeUserContext(mockUser.id);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.stress_analysis.level).toBe('high');
      expect(result.data?.recommended_tone).toBe('encouraging');
      expect(result.data?.suggested_actions).toContain('stress_reduction');
      expect(result.data?.confidence_boost_needed).toBe(true);
    });

    it('should recommend different approaches for confident users', async () => {
      // Arrange
      const confidentUser = createMockUser({
        contexts: {
          emotional_state: {
            stress_level: 0.3,
            motivation_level: 'high',
            confidence_level: 0.9,
            last_updated: new Date().toISOString()
          },
          goals: {
            target_salary: 500000,
            location_preference: 'Tokyo',
            work_style: 'remote',
            timeline: '3 months'
          }
        }
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get)
        .mockImplementation((key: string) => {
          if (key === `user_id:${confidentUser.id}`) return Promise.resolve(JSON.stringify(confidentUser));
          if (key === `user:${confidentUser.id}`) return Promise.resolve(JSON.stringify(confidentUser));
          return Promise.resolve(null);
        });

      // Act
      const result = await orchestrationEngine.analyzeUserContext(confidentUser.id);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.recommended_tone).toBe('direct');
      expect(result.data?.suggested_actions).toContain('aggressive_strategy');
      expect(result.data?.confidence_boost_needed).toBe(false);
    });
  });

  describe('optimizePromptEffectiveness', () => {
    it('should calculate effectiveness score based on user profile match', async () => {
      // Arrange
      const mockUser = createMockUser({
        profile: {
          name: 'Test User',
          current_role: 'Junior Developer',
          experience_years: 2,
          target_role: 'Senior Developer',
          target_industry: 'Tech',
          skills: ['JavaScript', 'React', 'Node.js']
        }
      });

      const mockTemplate = createMockPromptTemplate({
        category: 'job_search',
        effectiveness_score: 0.85
      });

      // Act
      const result = await orchestrationEngine.optimizePromptEffectiveness(
        mockTemplate,
        mockUser,
        { industry_focus: 'tech', experience_level: 'junior' }
      );

      // Assert
      expect(result).toBeDefined();
      expect(result.optimized_effectiveness).toBeGreaterThan(0.8);
      expect(result.optimization_factors).toContain('experience_match');
      expect(result.optimization_factors).toContain('industry_alignment');
      expect(result.suggested_improvements).toBeDefined();
    });
  });

  describe('Phase 1 behavior', () => {
    it('should provide unlimited prompt generation in Phase 1', async () => {
      // Arrange
      mockEnv.MONETIZATION_PHASE = '1';
      const mockUser = createMockUser();
      const mockTemplate = createMockPromptTemplate();

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(mockUser));
      vi.mocked(mockEnv.PROMPT_TEMPLATES.get).mockResolvedValueOnce(JSON.stringify(mockTemplate));
      vi.mocked(mockEnv.USER_CONTEXTS.put).mockResolvedValueOnce(undefined);

      // Act
      const result = await orchestrationEngine.generatePersonalizedPrompt({
        userId: mockUser.id,
        templateId: mockTemplate.id,
        additionalContext: {}
      });

      // Assert
      expect(result.success).toBe(true);
      // Should not check usage limits in Phase 1
      expect(result.data?.usage_remaining).toBeUndefined();
    });
  });

  describe('learning and optimization', () => {
    it('should learn from user feedback to improve future prompts', async () => {
      // Arrange
      const promptId = 'prompt-123';
      const userId = 'user-123';
      const feedback = {
        effectiveness_rating: 4.5,
        user_satisfaction: 5,
        actual_results: 'Found 3 relevant positions',
        improvement_suggestions: ['More specific location targeting']
      };

      vi.mocked(mockEnv.USAGE_ANALYTICS.put).mockResolvedValueOnce(undefined);

      // Act
      const result = await orchestrationEngine.recordFeedback({
        promptId,
        userId,
        feedback
      });

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.learning_applied).toBe(true);
      expect(result.data?.improvement_score).toBeGreaterThan(0);
    });
  });
});
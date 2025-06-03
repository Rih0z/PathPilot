import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HopeGenerationEngine } from '../hope-generation';
import { createMockEnv, createMockUser } from '../../../tests/setup';
import type { MockEnv } from '../../../tests/setup';

// Mock the dependent services
vi.mock('../success-pattern', () => ({
  SuccessPatternEngine: vi.fn().mockImplementation(() => ({
    findSimilarSuccessStories: vi.fn().mockResolvedValue({
      success: true,
      data: {
        patterns: [{
          id: 'pattern-1',
          similarity_score: 0.85,
          key_similarities: ['same role', 'similar skills'],
          success_path: {
            key_actions: ['Built portfolio', 'Obtained certification'],
            timeline: '3 months'
          },
          concrete_outcomes: {
            offer_received: true,
            salary_achieved: 600000,
            timeline_to_offer: 90,
            company_name: 'Tech Corp'
          }
        }],
        message: '成功事例が見つかりました'
      }
    }),
    calculateSuccessProbability: vi.fn().mockResolvedValue({
      success: true,
      data: {
        overall_probability: 0.75,
        confidence_factors: ['high_similarity'],
        risk_factors: [],
        timeline_estimate: 90,
        evidence_strength: 'strong'
      }
    }),
    generateSuccessRoadmap: vi.fn().mockResolvedValue({ success: true, data: {} }),
    generateConcreteEvidence: vi.fn().mockResolvedValue({ success: true, data: {} })
  }))
}));

vi.mock('../prompt-orchestration', () => ({
  PromptOrchestrationEngine: vi.fn().mockImplementation(() => ({
    generatePersonalizedPrompt: vi.fn().mockResolvedValue({ success: true, data: {} }),
    analyzeUserContext: vi.fn().mockResolvedValue({ success: true, data: {} })
  }))
}));

describe('HopeGenerationEngine', () => {
  let hopeEngine: HopeGenerationEngine;
  let mockEnv: MockEnv;

  beforeEach(() => {
    mockEnv = createMockEnv();
    hopeEngine = new HopeGenerationEngine(mockEnv);
  });

  describe('generateHopeExperience', () => {
    it('should create a complete hope experience for the user', async () => {
      // Arrange
      const user = createMockUser({
        profile: {
          name: 'Test User',
          current_role: 'Junior Developer',
          experience_years: 2,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        },
        contexts: {
          emotional_state: {
            stress_level: 0.6,
            motivation_level: 'medium',
            confidence_level: 0.5
          }
        }
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(user));

      // Act
      const result = await hopeEngine.generateHopeExperience(user.id);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.hope_statement).toContain('成功');
      expect(result.data?.success_probability).toContain('%');
      expect(result.data?.similar_success_story).toBeDefined();
      expect(result.data?.next_action).toBeDefined();
      expect(result.data?.evidence_preview).toContain('強み');
      expect(result.data?.confidence_boost_expected).toBeGreaterThan(0);
    });

    it('should adapt hope message based on emotional state', async () => {
      // Arrange - High stress, low confidence user
      const stressedUser = createMockUser({
        contexts: {
          emotional_state: {
            stress_level: 0.9,
            motivation_level: 'low',
            confidence_level: 0.2
          }
        }
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(stressedUser));

      // Act
      const result = await hopeEngine.generateHopeExperience(stressedUser.id);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.hope_statement).toMatch(/大丈夫|一歩ずつ|ゆっくり/);
      expect(result.data?.next_action.priority).toBe('low'); // Start with easier tasks
    });

    it('should provide aggressive strategy for confident users', async () => {
      // Arrange - Low stress, high confidence user
      const confidentUser = createMockUser({
        contexts: {
          emotional_state: {
            stress_level: 0.2,
            motivation_level: 'high',
            confidence_level: 0.9
          }
        }
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(confidentUser));

      // Act
      const result = await hopeEngine.generateHopeExperience(confidentUser.id);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.hope_statement).toMatch(/チャンス|積極的|今すぐ/);
      expect(result.data?.next_action.priority).toBe('high');
    });
  });

  describe('createVisualizationPath', () => {
    it('should create a visual journey from current state to success', async () => {
      // Arrange
      const user = createMockUser();
      const targetCompany = 'Dream Tech Co';

      // Act
      const result = await hopeEngine.createVisualizationPath(user, targetCompany);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.current_position).toBeDefined();
      expect(result.data?.target_position).toBeDefined();
      expect(result.data?.milestones).toHaveLength(5);
      expect(result.data?.milestones[0].week).toBe(1);
      expect(result.data?.expected_outcome).toContain(targetCompany);
    });
  });

  describe('generateMomentumActions', () => {
    it('should generate daily actions that build confidence', async () => {
      // Arrange
      const userId = 'user-123';
      const currentMomentum = 0.6;

      // Act
      const result = await hopeEngine.generateMomentumActions(userId, currentMomentum);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.daily_actions).toHaveLength(3);
      expect(result.data?.daily_actions[0].estimated_confidence_boost).toBeGreaterThan(0);
      expect(result.data?.weekly_goal).toBeDefined();
      expect(result.data?.momentum_forecast).toBeGreaterThan(currentMomentum);
    });
  });

  describe('calculateHopeScore', () => {
    it('should calculate a comprehensive hope score', async () => {
      // Arrange
      const user = createMockUser({
        contexts: {
          emotional_state: {
            stress_level: 0.4,
            motivation_level: 'high',
            confidence_level: 0.7
          }
        }
      });

      const evidence = {
        success_patterns_found: 5,
        similarity_score: 0.85,
        success_probability: 0.72,
        timeline_clarity: 0.9
      };

      // Act
      const result = await hopeEngine.calculateHopeScore(user, evidence);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.overall_hope_score).toBeGreaterThan(0.7);
      expect(result.data?.contributing_factors).toContain('high_similarity');
      expect(result.data?.improvement_suggestions).toBeDefined();
      expect(result.data?.score_trend).toBe('improving');
    });
  });

  describe('Phase 1 specific behavior', () => {
    it('should provide unlimited hope generation in Phase 1', async () => {
      // Arrange
      mockEnv.MONETIZATION_PHASE = '1';
      const user = createMockUser();
      
      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(user));

      // Act
      const result = await hopeEngine.generateHopeExperience(user.id);

      // Assert
      expect(result.success).toBe(true);
      // No usage limits should be mentioned
      expect(result.data?.usage_limit_warning).toBeUndefined();
    });
  });
});
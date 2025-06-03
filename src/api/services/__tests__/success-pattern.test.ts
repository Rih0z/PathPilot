import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SuccessPatternEngine } from '../success-pattern';
import { createMockEnv, createMockUser } from '../../../tests/setup';
import type { MockEnv } from '../../../tests/setup';

describe('SuccessPatternEngine', () => {
  let successEngine: SuccessPatternEngine;
  let mockEnv: MockEnv;

  beforeEach(() => {
    vi.clearAllMocks();
    mockEnv = createMockEnv();
    successEngine = new SuccessPatternEngine(mockEnv);
  });

  describe('findSimilarSuccessStories', () => {
    it('should find success stories of people with similar backgrounds', async () => {
      // Arrange
      const user = createMockUser({
        profile: {
          name: 'Test User',
          current_role: 'Junior Developer',
          experience_years: 2,
          target_role: 'Senior Developer',
          target_industry: 'Tech',
          skills: ['JavaScript', 'React']
        }
      });

      const mockSuccessPattern = {
        id: 'pattern-001',
        user_profile: {
          previous_role: 'Junior Developer',
          experience_years: 2,
          skills: ['JavaScript', 'React', 'Node.js']
        },
        success_path: {
          key_actions: [
            'Created portfolio with 3 production projects',
            'Contributed to open source projects',
            'Obtained AWS certification'
          ],
          timeline: '4 months',
          obstacles_overcome: ['Lack of senior experience', 'Limited network'],
          critical_moments: ['Portfolio review impressed interviewer', 'OSS contribution discussed']
        },
        employer_match: {
          company_type: 'Tech Startup',
          role: 'Senior Developer',
          culture_fit_factors: ['Self-learner', 'Proactive contributor']
        },
        concrete_outcomes: {
          offer_received: true,
          salary_achieved: 700000,
          timeline_to_offer: 120,
          company_name: 'TechCorp Inc.'
        }
      };

      // Mock success patterns storage
      vi.mocked(mockEnv.PROMPT_TEMPLATES.list).mockResolvedValueOnce({
        keys: [{ name: 'success-pattern:001' }]
      } as any);
      vi.mocked(mockEnv.PROMPT_TEMPLATES.get).mockResolvedValueOnce(
        JSON.stringify(mockSuccessPattern)
      );

      // Act
      const result = await successEngine.findSimilarSuccessStories(user);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.patterns).toHaveLength(1);
      expect(result.data?.patterns[0].similarity_score).toBeGreaterThan(0.7);
      expect(result.data?.patterns[0].success_path.key_actions).toContain(
        'Created portfolio with 3 production projects'
      );
      expect(result.data?.message).toContain('同じ背景の人が');
    });

    it('should calculate accurate similarity scores', async () => {
      // Arrange
      const user = createMockUser({
        profile: {
          current_role: 'Marketing Manager',
          experience_years: 5,
          target_role: 'Marketing Director',
          target_industry: 'Finance',
          skills: ['Digital Marketing', 'Analytics', 'Team Management']
        }
      });

      const perfectMatch = {
        id: 'pattern-perfect',
        user_profile: {
          previous_role: 'Marketing Manager',
          experience_years: 5,
          skills: ['Digital Marketing', 'Analytics', 'Team Management']
        },
        success_path: { 
          key_actions: ['Led digital campaigns', 'Managed team of 10'],
          timeline: '3 months',
          obstacles_overcome: [],
          critical_moments: []
        },
        employer_match: { 
          company_type: 'Finance', 
          role: 'Marketing Director',
          culture_fit_factors: []
        },
        concrete_outcomes: { 
          offer_received: true, 
          salary_achieved: 1000000,
          timeline_to_offer: 90,
          company_name: 'Finance Corp'
        }
      };

      const partialMatch = {
        id: 'pattern-partial',
        user_profile: {
          previous_role: 'Sales Manager',
          experience_years: 4,
          skills: ['Sales', 'Analytics']
        },
        success_path: { 
          key_actions: ['Sales strategy', 'Team building'],
          timeline: '6 months',
          obstacles_overcome: [],
          critical_moments: []
        },
        employer_match: { 
          company_type: 'Tech', 
          role: 'Sales Director',
          culture_fit_factors: []
        },
        concrete_outcomes: { 
          offer_received: true, 
          salary_achieved: 800000,
          timeline_to_offer: 180,
          company_name: 'Tech Inc'
        }
      };

      vi.mocked(mockEnv.PROMPT_TEMPLATES.list).mockResolvedValueOnce({
        keys: [
          { name: 'success-pattern:perfect' },
          { name: 'success-pattern:partial' }
        ]
      } as any);
      vi.mocked(mockEnv.PROMPT_TEMPLATES.get)
        .mockResolvedValueOnce(JSON.stringify(perfectMatch))
        .mockResolvedValueOnce(JSON.stringify(partialMatch));

      // Act
      const result = await successEngine.findSimilarSuccessStories(user);

      // Assert
      expect(result.success).toBe(true);
      const patterns = result.data?.patterns || [];
      expect(patterns.length).toBeGreaterThan(1);
      if (patterns.length >= 2) {
        expect(patterns[0].similarity_score).toBeGreaterThan(patterns[1].similarity_score);
        expect(patterns[0].id).toBe('pattern-perfect');
      }
    });
  });

  describe('calculateSuccessProbability', () => {
    it('should calculate realistic success probability based on evidence', async () => {
      // Arrange
      const user = createMockUser({
        profile: {
          name: 'Test User',
          current_role: 'Developer',
          experience_years: 3,
          target_role: 'Senior Developer',
          target_industry: 'Tech',
          skills: ['Python', 'Django', 'PostgreSQL']
        },
        contexts: {
          emotional_state: {
            stress_level: 0.5,
            motivation_level: 'high',
            confidence_level: 0.7,
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

      const similarPatterns = [
        {
          id: 'pattern-1',
          similarity_score: 0.9,
          concrete_outcomes: { 
            offer_received: true, 
            timeline_to_offer: 90,
            salary_achieved: 600000,
            company_name: 'TechCorp'
          }
        },
        {
          id: 'pattern-2',
          similarity_score: 0.85,
          concrete_outcomes: { 
            offer_received: true, 
            timeline_to_offer: 120,
            salary_achieved: 550000,
            company_name: 'StartupInc'
          }
        },
        {
          id: 'pattern-3',
          similarity_score: 0.8,
          concrete_outcomes: { 
            offer_received: false, 
            timeline_to_offer: 180,
            salary_achieved: 0,
            company_name: 'FailedCorp'
          }
        }
      ];

      // Act
      const result = await successEngine.calculateSuccessProbability(user, similarPatterns);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.overall_probability).toBeGreaterThan(0.6);
      expect(result.data?.confidence_factors).toContain('high_similarity_matches');
      expect(result.data?.confidence_factors).toContain('positive_emotional_state');
      expect(result.data?.timeline_estimate).toBeLessThan(150);
      expect(result.data?.evidence_strength).toBe('strong');
    });

    it('should provide actionable insights for low probability', async () => {
      // Arrange
      const user = createMockUser({
        profile: {
          current_role: 'Junior Designer',
          experience_years: 1,
          target_role: 'Art Director',
          skills: ['Photoshop']
        },
        contexts: {
          emotional_state: {
            stress_level: 0.9,
            motivation_level: 'low',
            confidence_level: 0.2
          }
        }
      });

      const similarPatterns = [
        {
          id: 'pattern-1',
          similarity_score: 0.4,
          concrete_outcomes: { offer_received: false }
        }
      ];

      // Act
      const result = await successEngine.calculateSuccessProbability(user, similarPatterns);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.overall_probability).toBeLessThan(0.3);
      expect(result.data?.improvement_actions).toContain('スキルセット拡充が必要');
      expect(result.data?.improvement_actions).toContain('段階的なキャリアステップを検討');
      expect(result.data?.risk_factors).toContain('experience_gap');
    });
  });

  describe('generateSuccessRoadmap', () => {
    it('should create personalized roadmap based on successful patterns', async () => {
      // Arrange
      const user = createMockUser();
      const successPattern = {
        id: 'pattern-001',
        success_path: {
          key_actions: [
            'Build portfolio website',
            'Get cloud certification',
            'Contribute to open source'
          ],
          timeline: '4 months',
          critical_moments: ['Technical interview preparation', 'Portfolio presentation']
        },
        concrete_outcomes: {
          offer_received: true,
          company_name: 'Dream Company'
        }
      };

      // Act
      const result = await successEngine.generateSuccessRoadmap(user, [successPattern]);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.milestones).toHaveLength(3);
      expect(result.data?.milestones[0].action).toContain('portfolio');
      expect(result.data?.milestones[0].expected_outcome).toBeDefined();
      expect(result.data?.milestones[0].success_probability).toBeGreaterThan(0.5);
      expect(result.data?.total_timeline).toBe('4 months');
      expect(result.data?.first_week_actions).toBeDefined();
      expect(result.data?.first_week_actions.length).toBeGreaterThan(0);
    });
  });

  describe('generateConcreteEvidence', () => {
    it('should create compelling evidence of user value', async () => {
      // Arrange
      const user = createMockUser({
        profile: {
          current_role: 'Frontend Developer',
          experience_years: 3,
          skills: ['React', 'TypeScript', 'GraphQL'],
          target_role: 'Senior Frontend Developer'
        }
      });

      const context = {
        target_company: 'Modern Tech Co',
        job_requirements: ['React expertise', 'Team leadership', 'System design'],
        company_culture: ['Innovation', 'Collaboration', 'Growth mindset']
      };

      // Act
      const result = await successEngine.generateConcreteEvidence(user, context);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.value_propositions).toHaveLength(3);
      expect(result.data?.value_propositions[0].evidence).toContain('3年間');
      expect(result.data?.value_propositions[0].impact).toBeDefined();
      expect(result.data?.interview_stories).toHaveLength(1);
      expect(result.data?.interview_stories[0].situation).toBeDefined();
      expect(result.data?.interview_stories[0].action).toBeDefined();
      expect(result.data?.interview_stories[0].result).toBeDefined();
      expect(result.data?.unique_advantages).toContain('React');
    });
  });

  describe('trackProgressAndMomentum', () => {
    it('should track user progress and build confidence momentum', async () => {
      // Arrange
      const userId = 'user-123';
      const completedAction = {
        action: 'Created portfolio website',
        outcome: 'Received positive feedback from 3 professionals',
        confidence_boost: 0.2
      };

      // Mock existing progress
      const existingProgress = {
        completed_milestones: ['Updated resume'],
        confidence_trajectory: [0.5, 0.6],
        momentum_score: 0.65,
        wins_accumulated: ['Got positive feedback on resume'],
        next_milestone: {
          id: 'milestone-1',
          action: 'Complete portfolio',
          expected_outcome: 'Have 3 projects showcased',
          timeline: '2 weeks',
          dependencies: [],
          success_probability: 0.8,
          confidence_boost: 0.1
        }
      };

      vi.mocked(mockEnv.USER_CONTEXTS.get)
        .mockImplementation((key: string) => {
          if (key === `progress:${userId}`) return Promise.resolve(JSON.stringify(existingProgress));
          return Promise.resolve(null);
        });
      vi.mocked(mockEnv.USER_CONTEXTS.put).mockResolvedValue(undefined);

      // Act
      const result = await successEngine.trackProgressAndMomentum(userId, completedAction);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.new_confidence_level).toBeGreaterThan(0.6);
      expect(result.data?.momentum_score).toBeGreaterThan(0.65);
      expect(result.data?.next_recommended_action).toBeDefined();
      expect(result.data?.celebration_message).toMatch(/素晴らしい|また一歩|着実に|この調子で/);
      expect(result.data?.progress_percentage).toBeGreaterThan(20);
    });
  });
});
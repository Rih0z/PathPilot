import {
  createSuccessResponse,
  createErrorResponse,
  createAPIError,
  ErrorCodes,
  generateId,
  kvGet,
  kvPut
} from '../../shared/utils';
import type {
  User,
  SuccessPattern,
  SimilarityMatch,
  SuccessProbability,
  SuccessRoadmap,
  ConcreteEvidence,
  ValueProposition,
  InterviewStory,
  Milestone,
  Action,
  ProgressTracking,
  APIResponse,
  Env
} from '../../shared/types';

interface CompletedAction {
  action: string;
  outcome: string;
  confidence_boost: number;
}

interface ProgressUpdate {
  new_confidence_level: number;
  momentum_score: number;
  next_recommended_action: Action;
  celebration_message: string;
  progress_percentage: number;
}

export class SuccessPatternEngine {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async findSimilarSuccessStories(user: User): Promise<APIResponse<{
    patterns: SimilarityMatch[];
    message: string;
  }>> {
    try {
      // Get all success patterns
      const patternsList = await this.env.PROMPT_TEMPLATES.list({ prefix: 'success-pattern:' });
      const patterns: SuccessPattern[] = [];

      for (const key of patternsList.keys) {
        const pattern = await kvGet<SuccessPattern>(this.env.PROMPT_TEMPLATES, key.name);
        if (pattern) {
          patterns.push(pattern);
        }
      }

      // Calculate similarity scores and filter relevant patterns
      const similarityMatches: SimilarityMatch[] = patterns
        .map(pattern => {
          const similarityScore = this.calculateSimilarity(user, pattern);
          const keySimilarities = this.identifyKeySimilarities(user, pattern);

          return {
            id: pattern.id,
            similarity_score: similarityScore,
            key_similarities: keySimilarities,
            success_path: pattern.success_path,
            concrete_outcomes: pattern.concrete_outcomes
          };
        })
        .filter(match => match.similarity_score > 0.3) // Lowered threshold to include more patterns
        .sort((a, b) => b.similarity_score - a.similarity_score)
        .slice(0, 5);

      const message = similarityMatches.length > 0 && similarityMatches[0]
        ? `あなたと同じ背景の人が${similarityMatches[0].concrete_outcomes.company_name}で成功しています！`
        : '類似の成功パターンを分析中です。';

      return createSuccessResponse({
        patterns: similarityMatches,
        message
      });

    } catch (error) {
      console.error('Error finding similar success stories:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to find similar success stories')
      );
    }
  }

  async calculateSuccessProbability(
    user: User,
    similarPatterns: Array<{ similarity_score: number; concrete_outcomes: { offer_received: boolean; timeline_to_offer?: number } }>
  ): Promise<APIResponse<SuccessProbability>> {
    try {
      // Base probability from similar patterns
      const successfulPatterns = similarPatterns.filter(p => p.concrete_outcomes.offer_received);
      const baseProbability = successfulPatterns.length / Math.max(similarPatterns.length, 1);
      
      // Weight by similarity scores
      const weightedProbability = similarPatterns.reduce((acc, pattern) => {
        return acc + (pattern.similarity_score * (pattern.concrete_outcomes.offer_received ? 1 : 0));
      }, 0) / Math.max(similarPatterns.length, 1);

      // Emotional state factors
      const emotionalMultiplier = this.calculateEmotionalMultiplier(user);
      
      // Calculate final probability
      let overallProbability = (baseProbability * 0.4 + weightedProbability * 0.6) * emotionalMultiplier;
      overallProbability = Math.min(0.95, Math.max(0.05, overallProbability));

      // Identify factors
      const confidenceFactors: string[] = [];
      const riskFactors: string[] = [];

      if (similarPatterns.some(p => p.similarity_score > 0.8)) {
        confidenceFactors.push('high_similarity_matches');
      }
      if (user.contexts.emotional_state.motivation_level === 'high') {
        confidenceFactors.push('positive_emotional_state');
      }
      if (user.profile.skills && user.profile.skills.length >= 3) {
        confidenceFactors.push('strong_skill_set');
      }

      // Risk assessment
      const experienceGap = this.calculateExperienceGap(user);
      if (experienceGap > 2) {
        riskFactors.push('experience_gap');
        overallProbability *= 0.7;
      }

      if (user.contexts.emotional_state.stress_level > 0.8) {
        riskFactors.push('high_stress_level');
      }

      // Timeline estimate
      const timelineEstimate = successfulPatterns.length > 0
        ? Math.round(successfulPatterns.reduce((acc, p) => acc + (p.concrete_outcomes.timeline_to_offer || 180), 0) / successfulPatterns.length)
        : 120;

      // Evidence strength
      const evidenceStrength: 'weak' | 'moderate' | 'strong' = 
        similarPatterns.length >= 3 && overallProbability > 0.6 ? 'strong' :
        similarPatterns.length >= 1 && overallProbability > 0.3 ? 'moderate' : 'weak';

      // Improvement actions for low probability
      const improvementActions: string[] = [];
      if (overallProbability < 0.3) {
        if (experienceGap > 2) {
          improvementActions.push('段階的なキャリアステップを検討');
        }
        if (!user.profile.skills || user.profile.skills.length < 3) {
          improvementActions.push('スキルセット拡充が必要');
        }
        improvementActions.push('目標の再設定を検討');
      }

      return createSuccessResponse<SuccessProbability>({
        overall_probability: overallProbability,
        confidence_factors: confidenceFactors,
        risk_factors: riskFactors,
        timeline_estimate: timelineEstimate,
        evidence_strength: evidenceStrength,
        improvement_actions: improvementActions
      });

    } catch (error) {
      console.error('Error calculating success probability:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to calculate success probability')
      );
    }
  }

  async generateSuccessRoadmap(
    user: User,
    successPatterns: SuccessPattern[]
  ): Promise<APIResponse<SuccessRoadmap>> {
    try {
      // Extract common successful actions
      const allActions = successPatterns.flatMap(p => p.success_path.key_actions);
      const actionFrequency = this.calculateActionFrequency(allActions);
      
      // Create milestones based on most common successful actions
      const milestones: Milestone[] = Object.entries(actionFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([ action ], index) => ({
          id: generateId('milestone'),
          action: action,
          expected_outcome: this.generateExpectedOutcome(action),
          timeline: `${(index + 1) * 4} weeks`,
          dependencies: index > 0 ? [`milestone-${index - 1}`] : [],
          success_probability: 0.7 - (index * 0.1),
          confidence_boost: 0.2
        }));

      // First week actions
      const firstWeekActions: Action[] = [
        {
          id: generateId('action'),
          description: 'Update your LinkedIn profile',
          priority: 'high',
          estimated_time: '2 hours',
          expected_impact: 'Increase profile visibility by 50%'
        },
        {
          id: generateId('action'),
          description: 'Research target companies',
          priority: 'high',
          estimated_time: '3 hours',
          expected_impact: 'Identify 10 potential opportunities'
        }
      ];

      // Total timeline from patterns
      const totalTimeline = successPatterns.length > 0 && successPatterns[0]
        ? successPatterns[0].success_path.timeline
        : '4 months';

      return createSuccessResponse<SuccessRoadmap>({
        milestones,
        total_timeline: totalTimeline,
        first_week_actions: firstWeekActions,
        critical_success_factors: ['consistency', 'networking', 'skill_development'],
        expected_challenges: ['initial_rejection', 'time_management', 'staying_motivated']
      });

    } catch (error) {
      console.error('Error generating success roadmap:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to generate success roadmap')
      );
    }
  }

  async generateConcreteEvidence(
    user: User,
    context: { target_company: string; job_requirements: string[]; company_culture: string[] }
  ): Promise<APIResponse<ConcreteEvidence>> {
    try {
      // Generate value propositions
      const valuePropositions: ValueProposition[] = this.generateValuePropositions(user, context);

      // Generate interview stories using STAR method
      const interviewStories: InterviewStory[] = this.generateInterviewStories(user);

      // Identify unique advantages
      const uniqueAdvantages = user.profile.skills?.filter(skill => 
        context.job_requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
      ) || [];

      // Quantified achievements
      const quantifiedAchievements = [
        `${user.profile.experience_years}年間の${user.profile.current_role}経験`,
        `${user.profile.skills?.length || 0}個の関連スキル習得`
      ];

      return createSuccessResponse<ConcreteEvidence>({
        value_propositions: valuePropositions,
        interview_stories: interviewStories,
        unique_advantages: uniqueAdvantages,
        quantified_achievements: quantifiedAchievements
      });

    } catch (error) {
      console.error('Error generating concrete evidence:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to generate concrete evidence')
      );
    }
  }

  async trackProgressAndMomentum(
    userId: string,
    completedAction: CompletedAction
  ): Promise<APIResponse<ProgressUpdate>> {
    try {
      // Get existing progress
      const progressKey = `progress:${userId}`;
      const existingProgress = await kvGet<ProgressTracking>(this.env.USER_CONTEXTS, progressKey) || {
        completed_milestones: [],
        confidence_trajectory: [0.5],
        momentum_score: 0.5,
        wins_accumulated: [],
        next_milestone: {} as Milestone
      };

      // Update progress
      existingProgress.completed_milestones.push(completedAction.action);
      existingProgress.wins_accumulated.push(completedAction.outcome);
      
      // Calculate new confidence level
      const currentConfidence = existingProgress.confidence_trajectory[existingProgress.confidence_trajectory.length - 1] || 0.5;
      const newConfidence = Math.min(1, currentConfidence + completedAction.confidence_boost);
      existingProgress.confidence_trajectory.push(newConfidence);

      // Update momentum score
      existingProgress.momentum_score = Math.min(1, existingProgress.momentum_score + 0.1);

      // Save updated progress
      await kvPut(this.env.USER_CONTEXTS, progressKey, existingProgress);

      // Generate celebration message
      const celebrationMessage = this.generateCelebrationMessage(completedAction.action);

      // Calculate progress percentage
      const progressPercentage = Math.min(100, existingProgress.completed_milestones.length * 20);

      // Recommend next action
      const nextAction: Action = {
        id: generateId('action'),
        description: 'Continue building on this success',
        priority: 'high',
        estimated_time: '1 hour',
        expected_impact: 'Further confidence boost'
      };

      return createSuccessResponse<ProgressUpdate>({
        new_confidence_level: newConfidence,
        momentum_score: existingProgress.momentum_score,
        next_recommended_action: nextAction,
        celebration_message: celebrationMessage,
        progress_percentage: progressPercentage
      });

    } catch (error) {
      console.error('Error tracking progress:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to track progress')
      );
    }
  }

  // Private helper methods
  private calculateSimilarity(user: User, pattern: SuccessPattern): number {
    let similarity = 0;

    // Role similarity (30% weight)
    if (user.profile.current_role === pattern.user_profile.previous_role) {
      similarity += 0.4;
    } else if (user.profile.current_role.toLowerCase().includes(pattern.user_profile.previous_role.toLowerCase()) ||
               pattern.user_profile.previous_role.toLowerCase().includes(user.profile.current_role.toLowerCase())) {
      similarity += 0.25;
    } else {
      similarity += 0.1; // Some base similarity
    }

    // Experience similarity (20% weight)
    const expDiff = Math.abs(user.profile.experience_years - pattern.user_profile.experience_years);
    if (expDiff === 0) similarity += 0.25;
    else if (expDiff <= 1) similarity += 0.20;
    else if (expDiff <= 2) similarity += 0.15;
    else similarity += 0.05;

    // Skills overlap (30% weight)
    if (user.profile.skills && pattern.user_profile.skills) {
      const userSkills = new Set(user.profile.skills.map(s => s.toLowerCase()));
      const patternSkills = new Set(pattern.user_profile.skills.map(s => s.toLowerCase()));
      const overlap = [...userSkills].filter(skill => patternSkills.has(skill)).length;
      if (overlap > 0) {
        const overlapRatio = overlap / Math.max(userSkills.size, patternSkills.size);
        similarity += overlapRatio * 0.3;
      }
    } else {
      similarity += 0.1; // Base score if no skills data
    }

    // Target match (20% weight)
    if (user.profile.target_role === pattern.employer_match.role) {
      similarity += 0.2;
    } else if (user.profile.target_role.toLowerCase().includes(pattern.employer_match.role.toLowerCase()) ||
               pattern.employer_match.role.toLowerCase().includes(user.profile.target_role.toLowerCase())) {
      similarity += 0.1;
    }

    return Math.min(1, similarity);
  }

  private identifyKeySimilarities(user: User, pattern: SuccessPattern): string[] {
    const similarities: string[] = [];

    if (user.profile.current_role === pattern.user_profile.previous_role) {
      similarities.push(`Same role: ${user.profile.current_role}`);
    }

    if (Math.abs(user.profile.experience_years - pattern.user_profile.experience_years) <= 1) {
      similarities.push(`Similar experience level`);
    }

    if (user.profile.skills && pattern.user_profile.skills) {
      const overlap = user.profile.skills.filter(skill => 
        pattern.user_profile.skills.includes(skill)
      );
      if (overlap.length > 0) {
        similarities.push(`Shared skills: ${overlap.join(', ')}`);
      }
    }

    return similarities;
  }

  private calculateEmotionalMultiplier(user: User): number {
    const { stress_level, motivation_level, confidence_level } = user.contexts.emotional_state;
    
    let multiplier = 1;
    
    if (stress_level > 0.7) multiplier *= 0.9;
    if (motivation_level === 'high') multiplier *= 1.1;
    if (motivation_level === 'low') multiplier *= 0.8;
    if (confidence_level > 0.7) multiplier *= 1.1;
    if (confidence_level < 0.3) multiplier *= 0.8;

    return multiplier;
  }

  private calculateExperienceGap(user: User): number {
    // Simple heuristic: Senior roles typically need 5+ years
    const targetExperience = user.profile.target_role.toLowerCase().includes('senior') ? 5 :
                           user.profile.target_role.toLowerCase().includes('lead') ? 7 :
                           user.profile.target_role.toLowerCase().includes('manager') ? 5 :
                           user.profile.target_role.toLowerCase().includes('director') ? 10 : 3;
    
    return Math.max(0, targetExperience - user.profile.experience_years);
  }

  private calculateActionFrequency(actions: string[]): Record<string, number> {
    return actions.reduce((acc, action) => {
      acc[action] = (acc[action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private generateExpectedOutcome(action: string): string {
    const outcomeMap: Record<string, string> = {
      'portfolio': 'Showcase 3-5 impactful projects',
      'certification': 'Validate technical expertise',
      'open source': 'Demonstrate collaboration skills',
      'networking': 'Build 10+ industry connections'
    };

    for (const [key, outcome] of Object.entries(outcomeMap)) {
      if (action.toLowerCase().includes(key)) {
        return outcome;
      }
    }

    return 'Strengthen your candidacy';
  }

  private generateValuePropositions(user: User, context: any): ValueProposition[] {
    const propositions: ValueProposition[] = [];

    if (user.profile.experience_years > 0) {
      propositions.push({
        statement: `${user.profile.experience_years}年間の実務経験`,
        evidence: `${user.profile.experience_years}年間、${user.profile.current_role}として実践的なスキルを蓄積`,
        impact: '即戦力として貢献可能',
        relevance_score: 0.9
      });
    }

    if (user.profile.skills && user.profile.skills.length > 0) {
      propositions.push({
        statement: '複数の関連技術スキル',
        evidence: user.profile.skills.join(', '),
        impact: '幅広い技術課題に対応可能',
        relevance_score: 0.8
      });
    }

    propositions.push({
      statement: '成長意欲と学習能力',
      evidence: 'PathPilotを活用した計画的なキャリア開発',
      impact: '継続的な価値向上',
      relevance_score: 0.7
    });

    return propositions.slice(0, 3);
  }

  private generateInterviewStories(user: User): InterviewStory[] {
    // Generate generic but personalized STAR stories
    return [{
      situation: `${user.profile.current_role}として複雑なプロジェクトを担当`,
      task: '期限内での品質確保と成果達成',
      action: 'チームと協力し、効率的なプロセスを構築',
      result: 'プロジェクトを成功に導き、期待を上回る成果を達成',
      skills_demonstrated: ['problem_solving', 'teamwork', 'leadership']
    }];
  }

  private generateCelebrationMessage(action: string): string {
    const messages = [
      '素晴らしい進歩です！',
      'また一歩、目標に近づきました！',
      '着実に前進していますね！',
      'この調子で頑張りましょう！'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)] + ` ${action}を完了しました。`;
  }
}
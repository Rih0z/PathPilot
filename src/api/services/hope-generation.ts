import {
  createSuccessResponse,
  createErrorResponse,
  createAPIError,
  ErrorCodes,
  generateId,
  kvGet
} from '../../shared/utils';
import type {
  User,
  HopeExperience,
  Action,
  Milestone,
  APIResponse,
  Env
} from '../../shared/types';
import { SuccessPatternEngine } from './success-pattern';
import { PromptOrchestrationEngine } from './prompt-orchestration';

interface VisualizationPath {
  current_position: string;
  target_position: string;
  milestones: PathMilestone[];
  expected_outcome: string;
  timeline: string;
}

interface PathMilestone {
  week: number;
  achievement: string;
  confidence_level: number;
  visual_progress: number; // 0-100%
}

interface MomentumActions {
  daily_actions: DailyAction[];
  weekly_goal: string;
  momentum_forecast: number;
  encouragement_message: string;
}

interface DailyAction {
  id: string;
  action: string;
  time_required: string;
  estimated_confidence_boost: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface HopeScore {
  overall_hope_score: number;
  contributing_factors: string[];
  improvement_suggestions: string[];
  score_trend: 'improving' | 'stable' | 'declining';
}

export class HopeGenerationEngine {
  private env: Env;
  private successEngine: SuccessPatternEngine;
  private promptEngine: PromptOrchestrationEngine;

  constructor(env: Env) {
    this.env = env;
    this.successEngine = new SuccessPatternEngine(env);
    this.promptEngine = new PromptOrchestrationEngine(env);
  }

  async generateHopeExperience(userId: string): Promise<APIResponse<HopeExperience>> {
    try {
      // Get user data
      const user = await kvGet<User>(this.env.USER_CONTEXTS, `user_id:${userId}`);
      if (!user) {
        const userByEmail = await kvGet<User>(this.env.USER_CONTEXTS, `user:${userId}`);
        if (!userByEmail) {
          return createErrorResponse(
            createAPIError(ErrorCodes.USER_NOT_FOUND, 'User not found')
          );
        }
      }
      
      const userData = user || await kvGet<User>(this.env.USER_CONTEXTS, `user:${userId}`);
      if (!userData) {
        return createErrorResponse(
          createAPIError(ErrorCodes.USER_NOT_FOUND, 'User not found')
        );
      }

      // Find similar success stories
      const successStoriesResult = await this.successEngine.findSimilarSuccessStories(userData);
      const successPatterns = successStoriesResult.data?.patterns || [];

      // Calculate success probability
      const probabilityResult = await this.successEngine.calculateSuccessProbability(userData, successPatterns);
      const successProbability = probabilityResult.data?.overall_probability || 0.5;

      // Generate hope statement based on emotional state
      const hopeStatement = this.generateHopeStatement(userData, successProbability);

      // Create similar success story narrative
      const similarSuccessStory = successPatterns.length > 0
        ? this.createSuccessNarrative(successPatterns[0])
        : '同じような背景の方が成功した事例を探しています...';

      // Generate next action based on user state
      const nextAction = this.generateNextAction(userData);

      // Create evidence preview
      const evidencePreview = `あなたの強みを${3 + Math.floor(successProbability * 2)}個発見しました。面接で活用できます。`;

      // Calculate expected confidence boost
      const confidenceBoostExpected = this.calculateExpectedConfidenceBoost(userData, successProbability);

      return createSuccessResponse<HopeExperience>({
        hope_statement: hopeStatement,
        success_probability: `${Math.round(successProbability * 100)}%`,
        similar_success_story: similarSuccessStory,
        next_action: nextAction,
        evidence_preview: evidencePreview,
        confidence_boost_expected: confidenceBoostExpected
      });

    } catch (error) {
      console.error('Hope generation error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to generate hope experience')
      );
    }
  }

  async createVisualizationPath(
    user: User,
    targetCompany: string
  ): Promise<APIResponse<VisualizationPath>> {
    try {
      const milestones: PathMilestone[] = [
        {
          week: 1,
          achievement: 'プロフィール最適化完了',
          confidence_level: 0.3,
          visual_progress: 20
        },
        {
          week: 2,
          achievement: 'ポートフォリオ作成',
          confidence_level: 0.4,
          visual_progress: 40
        },
        {
          week: 4,
          achievement: '応募書類完成',
          confidence_level: 0.5,
          visual_progress: 60
        },
        {
          week: 6,
          achievement: '面接準備完了',
          confidence_level: 0.7,
          visual_progress: 80
        },
        {
          week: 8,
          achievement: '内定獲得！',
          confidence_level: 0.9,
          visual_progress: 100
        }
      ];

      return createSuccessResponse<VisualizationPath>({
        current_position: `${user.profile.current_role} (${user.profile.experience_years}年経験)`,
        target_position: `${targetCompany}の${user.profile.target_role}`,
        milestones,
        expected_outcome: `${targetCompany}で理想のポジションを獲得`,
        timeline: '8週間'
      });

    } catch (error) {
      console.error('Visualization path error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to create visualization path')
      );
    }
  }

  async generateMomentumActions(
    userId: string,
    currentMomentum: number
  ): Promise<APIResponse<MomentumActions>> {
    try {
      const dailyActions: DailyAction[] = [
        {
          id: generateId('action'),
          action: 'LinkedInプロフィールを1セクション更新',
          time_required: '15分',
          estimated_confidence_boost: 0.05,
          difficulty: 'easy'
        },
        {
          id: generateId('action'),
          action: '興味のある企業を1社リサーチ',
          time_required: '30分',
          estimated_confidence_boost: 0.08,
          difficulty: 'medium'
        },
        {
          id: generateId('action'),
          action: '面接想定質問を1つ練習',
          time_required: '20分',
          estimated_confidence_boost: 0.06,
          difficulty: 'easy'
        }
      ];

      const weeklyGoal = '3社への応募準備を完了させる';
      const momentumForecast = Math.min(1, currentMomentum + 0.15);
      const encouragementMessage = currentMomentum > 0.7
        ? '素晴らしい勢いです！この調子で続けましょう！'
        : '一歩一歩、着実に前進しています。';

      return createSuccessResponse<MomentumActions>({
        daily_actions: dailyActions,
        weekly_goal: weeklyGoal,
        momentum_forecast: momentumForecast,
        encouragement_message: encouragementMessage
      });

    } catch (error) {
      console.error('Momentum actions error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to generate momentum actions')
      );
    }
  }

  async calculateHopeScore(
    user: User,
    evidence: {
      success_patterns_found: number;
      similarity_score: number;
      success_probability: number;
      timeline_clarity: number;
    }
  ): Promise<APIResponse<HopeScore>> {
    try {
      // Calculate base score from evidence
      let hopeScore = 0;
      hopeScore += evidence.success_patterns_found > 3 ? 0.25 : evidence.success_patterns_found * 0.08;
      hopeScore += evidence.similarity_score * 0.25;
      hopeScore += evidence.success_probability * 0.25;
      hopeScore += evidence.timeline_clarity * 0.25;

      // Adjust for emotional state
      const emotionalMultiplier = this.calculateEmotionalMultiplier(user);
      hopeScore *= emotionalMultiplier;

      // Contributing factors
      const contributingFactors: string[] = [];
      if (evidence.similarity_score > 0.8) contributingFactors.push('high_similarity');
      if (evidence.success_probability > 0.7) contributingFactors.push('strong_success_probability');
      if (user.contexts.emotional_state.motivation_level === 'high') contributingFactors.push('high_motivation');

      // Improvement suggestions
      const improvementSuggestions: string[] = [];
      if (hopeScore < 0.6) {
        improvementSuggestions.push('スキルセットの拡充をおすすめします');
        improvementSuggestions.push('類似成功事例をもっと探しましょう');
      }

      // Determine trend (simplified)
      const scoreTrend: 'improving' | 'stable' | 'declining' = 
        hopeScore > 0.7 ? 'improving' : hopeScore > 0.4 ? 'stable' : 'declining';

      return createSuccessResponse<HopeScore>({
        overall_hope_score: hopeScore,
        contributing_factors: contributingFactors,
        improvement_suggestions: improvementSuggestions,
        score_trend: scoreTrend
      });

    } catch (error) {
      console.error('Hope score calculation error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to calculate hope score')
      );
    }
  }

  // Private helper methods
  private generateHopeStatement(user: User, successProbability: number): string {
    const { stress_level, confidence_level } = user.contexts.emotional_state;

    if (stress_level > 0.7 || confidence_level < 0.3) {
      // Gentle, encouraging message for stressed users
      return `大丈夫です。一歩ずつ進めば、必ず道は開けます。あなたと同じ状況から成功した方がいます。`;
    } else if (confidence_level > 0.7) {
      // Ambitious message for confident users
      return `今がチャンスです！あなたの経験とスキルなら、積極的にチャレンジできます。成功確率${Math.round(successProbability * 100)}%！`;
    } else {
      // Balanced message
      return `着実に前進しています。あなたの強みを活かせば、理想のキャリアに近づけます。成功事例があります！`;
    }
  }

  private createSuccessNarrative(pattern: any): string {
    if (!pattern || !pattern.concrete_outcomes) {
      return '類似の成功事例を分析中...';
    }

    return `${pattern.success_path?.timeline || '3ヶ月'}で、` +
           `${pattern.concrete_outcomes.company_name}への転職に成功した方がいます。` +
           `重要なステップは「${pattern.success_path?.key_actions?.[0] || 'スキル向上'}」でした。`;
  }

  private generateNextAction(user: User): Action {
    const { stress_level, confidence_level } = user.contexts.emotional_state;
    
    if (stress_level > 0.7) {
      // Easy action for stressed users
      return {
        id: generateId('action'),
        description: '自己分析シートを10分だけ記入する',
        priority: 'low',
        estimated_time: '10分',
        expected_impact: 'ストレス軽減と自己理解の向上'
      };
    } else if (confidence_level > 0.7) {
      // Challenging action for confident users
      return {
        id: generateId('action'),
        description: '希望企業トップ3社の求人に応募する',
        priority: 'high',
        estimated_time: '2時間',
        expected_impact: '面接機会の獲得'
      };
    } else {
      // Balanced action
      return {
        id: generateId('action'),
        description: '職務経歴書の実績部分を定量化する',
        priority: 'medium',
        estimated_time: '45分',
        expected_impact: '書類通過率の向上'
      };
    }
  }

  private calculateExpectedConfidenceBoost(user: User, successProbability: number): number {
    const baseBoost = successProbability * 0.3;
    const currentConfidence = user.contexts.emotional_state.confidence_level;
    
    // Higher boost for users with lower confidence
    const needMultiplier = currentConfidence < 0.5 ? 1.5 : 1.0;
    
    return Math.min(0.5, baseBoost * needMultiplier);
  }

  private calculateEmotionalMultiplier(user: User): number {
    const { stress_level, motivation_level, confidence_level } = user.contexts.emotional_state;
    
    let multiplier = 1;
    
    if (stress_level > 0.7) multiplier *= 0.8;
    if (motivation_level === 'high') multiplier *= 1.2;
    if (motivation_level === 'low') multiplier *= 0.7;
    if (confidence_level > 0.7) multiplier *= 1.1;
    if (confidence_level < 0.3) multiplier *= 0.8;

    return multiplier;
  }
}
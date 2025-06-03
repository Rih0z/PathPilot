import {
  createSuccessResponse,
  createErrorResponse, 
  createAPIError,
  ErrorCodes,
  generateId,
  interpolateTemplate,
  calculatePersonalizationScore,
  kvGet,
  kvPut
} from '../../shared/utils';
import type { 
  User, 
  PromptTemplate, 
  PersonalizedPrompt, 
  APIResponse, 
  Env 
} from '../../shared/types';

interface PromptGenerationRequest {
  userId: string;
  templateId: string;
  additionalContext: Record<string, any>;
}

interface UserContextAnalysis {
  stress_analysis: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
  recommended_tone: 'encouraging' | 'professional' | 'direct';
  suggested_actions: string[];
  confidence_boost_needed: boolean;
  personalization_score: number;
}

interface EffectivenessOptimization {
  optimized_effectiveness: number;
  optimization_factors: string[];
  suggested_improvements: string[];
  confidence_multiplier: number;
}

interface FeedbackData {
  effectiveness_rating: number;
  user_satisfaction: number;
  actual_results: string;
  improvement_suggestions: string[];
}

interface FeedbackRequest {
  promptId: string;
  userId: string;
  feedback: FeedbackData;
}

export class PromptOrchestrationEngine {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async generatePersonalizedPrompt(
    request: PromptGenerationRequest
  ): Promise<APIResponse<PersonalizedPrompt>> {
    try {
      // Get user context
      const user = await kvGet<User>(this.env.USER_CONTEXTS, `user_id:${request.userId}`);
      if (!user) {
        const userByEmail = await kvGet<User>(this.env.USER_CONTEXTS, `user:${request.userId}`);
        if (!userByEmail) {
          return createErrorResponse(
            createAPIError(ErrorCodes.USER_NOT_FOUND, 'User not found')
          );
        }
      }

      const userData = user || await kvGet<User>(this.env.USER_CONTEXTS, `user:${request.userId}`);
      if (!userData) {
        return createErrorResponse(
          createAPIError(ErrorCodes.USER_NOT_FOUND, 'User not found')
        );
      }

      // Get prompt template
      const template = await kvGet<PromptTemplate>(
        this.env.PROMPT_TEMPLATES, 
        `template:${request.templateId}`
      );

      if (!template) {
        return createErrorResponse(
          createAPIError(ErrorCodes.TEMPLATE_NOT_FOUND, 'Template not found')
        );
      }

      // Analyze user context
      const contextAnalysis = await this.analyzeUserContextInternal(userData);

      // Prepare context data for interpolation
      const contextData = {
        ...userData.profile,
        ...userData.contexts.goals,
        ...request.additionalContext,
        recommended_tone: contextAnalysis.recommended_tone
      };

      // Generate personalized prompt
      let personalizedPrompt = interpolateTemplate(template.template, contextData);

      // Apply emotional state adaptations
      if (contextAnalysis.stress_analysis.level === 'high') {
        personalizedPrompt = this.adaptForHighStress(personalizedPrompt);
      }

      // Calculate personalization score
      const personalizationScore = calculatePersonalizationScore(
        template.variables,
        contextData
      );

      // Optimize effectiveness
      const optimization = await this.optimizePromptEffectiveness(
        template,
        userData,
        request.additionalContext
      );

      // Create personalized prompt record
      const promptRecord: PersonalizedPrompt = {
        id: generateId('prompt'),
        template_id: request.templateId,
        user_id: request.userId,
        generated_prompt: personalizedPrompt,
        context_data: {
          ...contextData,
          stress_level: userData.contexts.emotional_state.stress_level,
          confidence_level: userData.contexts.emotional_state.confidence_level
        },
        personalization_score: personalizationScore,
        expected_effectiveness: optimization.optimized_effectiveness,
        created_at: new Date().toISOString()
      };

      // Store the generated prompt
      await kvPut(
        this.env.USER_CONTEXTS,
        `prompt:${promptRecord.id}`,
        promptRecord
      );

      return createSuccessResponse(promptRecord);

    } catch (error) {
      console.error('Prompt generation error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to generate personalized prompt')
      );
    }
  }

  async analyzeUserContext(userId: string): Promise<APIResponse<UserContextAnalysis>> {
    try {
      const user = await kvGet<User>(this.env.USER_CONTEXTS, `user_id:${userId}`);
      if (!user) {
        const userByEmail = await kvGet<User>(this.env.USER_CONTEXTS, `user:${userId}`);
        if (!userByEmail) {
          return createErrorResponse(
            createAPIError(ErrorCodes.USER_NOT_FOUND, 'User not found')
          );
        }
        const analysis = await this.analyzeUserContextInternal(userByEmail);
        return createSuccessResponse(analysis);
      }

      const analysis = await this.analyzeUserContextInternal(user);
      return createSuccessResponse(analysis);

    } catch (error) {
      console.error('Context analysis error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to analyze user context')
      );
    }
  }

  async optimizePromptEffectiveness(
    template: PromptTemplate,
    user: User,
    additionalContext: Record<string, any>
  ): Promise<EffectivenessOptimization> {
    let effectiveness = template.effectiveness_score;
    const optimizationFactors: string[] = [];
    const suggestedImprovements: string[] = [];

    // Experience level matching
    if (additionalContext.experience_level) {
      if (
        (user.profile.experience_years >= 3 && additionalContext.experience_level === 'senior') ||
        (user.profile.experience_years < 3 && additionalContext.experience_level === 'junior')
      ) {
        effectiveness += 0.1;
        optimizationFactors.push('experience_match');
      }
    }

    // Industry alignment
    if (additionalContext.industry_focus === 'tech' && user.profile.target_industry === 'Tech') {
      effectiveness += 0.05;
      optimizationFactors.push('industry_alignment');
    }

    // Skills relevance
    if (user.profile.skills && user.profile.skills.length > 0) {
      effectiveness += 0.05;
      optimizationFactors.push('skills_available');
    }

    // Confidence boost multiplier
    const confidenceMultiplier = user.contexts.emotional_state.confidence_level > 0.7 ? 1.1 : 1.0;
    effectiveness *= confidenceMultiplier;

    // Add improvement suggestions
    if (user.contexts.emotional_state.stress_level > 0.7) {
      suggestedImprovements.push('Add stress-reduction techniques');
    }
    
    if (user.contexts.emotional_state.confidence_level < 0.5) {
      suggestedImprovements.push('Include confidence-building elements');
    }

    return {
      optimized_effectiveness: Math.min(1, effectiveness),
      optimization_factors: optimizationFactors,
      suggested_improvements: suggestedImprovements,
      confidence_multiplier: confidenceMultiplier
    };
  }

  async recordFeedback(request: FeedbackRequest): Promise<APIResponse<{ learning_applied: boolean; improvement_score: number }>> {
    try {
      // Store feedback for learning
      const feedbackRecord = {
        prompt_id: request.promptId,
        user_id: request.userId,
        feedback: request.feedback,
        recorded_at: new Date().toISOString()
      };

      await kvPut(
        this.env.USAGE_ANALYTICS,
        `feedback:${request.promptId}`,
        feedbackRecord
      );

      // Calculate improvement score based on feedback
      const improvementScore = (request.feedback.effectiveness_rating + request.feedback.user_satisfaction) / 10;

      return createSuccessResponse({
        learning_applied: true,
        improvement_score: improvementScore
      });

    } catch (error) {
      console.error('Feedback recording error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Failed to record feedback')
      );
    }
  }

  private async analyzeUserContextInternal(user: User): Promise<UserContextAnalysis> {
    const stressLevel = user.contexts.emotional_state.stress_level;
    const confidenceLevel = user.contexts.emotional_state.confidence_level;
    const motivationLevel = user.contexts.emotional_state.motivation_level;

    // Determine stress analysis
    let stressAnalysisLevel: 'low' | 'medium' | 'high';
    if (stressLevel >= 0.7) {
      stressAnalysisLevel = 'high';
    } else if (stressLevel >= 0.4) {
      stressAnalysisLevel = 'medium';
    } else {
      stressAnalysisLevel = 'low';
    }

    // Determine recommended tone
    let recommendedTone: 'encouraging' | 'professional' | 'direct';
    if (stressLevel >= 0.7 || confidenceLevel < 0.5) {
      recommendedTone = 'encouraging';
    } else if (confidenceLevel >= 0.7 && motivationLevel === 'high') {
      recommendedTone = 'direct';
    } else {
      recommendedTone = 'professional';
    }

    // Suggest actions based on context
    const suggestedActions: string[] = [];
    if (stressLevel >= 0.7) {
      suggestedActions.push('stress_reduction');
    }
    if (confidenceLevel >= 0.8 && motivationLevel === 'high') {
      suggestedActions.push('aggressive_strategy');
    }
    if (motivationLevel === 'low') {
      suggestedActions.push('motivation_boost');
    }

    return {
      stress_analysis: {
        level: stressAnalysisLevel,
        factors: stressLevel >= 0.7 ? ['job_search_pressure', 'timeline_pressure'] : []
      },
      recommended_tone: recommendedTone,
      suggested_actions: suggestedActions,
      confidence_boost_needed: confidenceLevel < 0.5,
      personalization_score: this.calculateOverallPersonalizationScore(user)
    };
  }

  private adaptForHighStress(prompt: string): string {
    // Add gentle, supportive language for high-stress users
    const supportivePrefixes = [
      'Take your time to',
      'When you feel ready,',
      'Step by step,',
      'Remember to breathe and'
    ];

    const randomPrefix = supportivePrefixes[Math.floor(Math.random() * supportivePrefixes.length)];
    // Don't lowercase the entire prompt - preserve original casing
    const firstChar = prompt.charAt(0).toLowerCase();
    const restOfPrompt = prompt.slice(1);
    return `${randomPrefix} ${firstChar}${restOfPrompt}`;
  }

  private calculateOverallPersonalizationScore(user: User): number {
    let score = 0.5; // Base score

    // Profile completeness
    if (user.profile.name) score += 0.1;
    if (user.profile.skills && user.profile.skills.length > 0) score += 0.1;
    if (user.profile.education) score += 0.05;

    // Context completeness  
    if (user.contexts.goals.target_salary > 0) score += 0.1;
    if (user.contexts.goals.location_preference) score += 0.1;
    if (user.contexts.goals.timeline) score += 0.05;

    // Emotional state data availability
    if (user.contexts.emotional_state.last_updated) score += 0.1;

    return Math.min(1, score);
  }
}
import { Hono } from 'hono';
import type { Env, User } from '../../shared/types';
import { HopeGenerationEngine } from '../services/hope-generation';
import { SuccessPatternEngine } from '../services/success-pattern';
import { PromptOrchestrationEngine } from '../services/prompt-orchestration';
import { createSuccessResponse } from '../../shared/utils';

export const publicRoutes = new Hono<{ Bindings: Env }>();

// Public demo endpoints - no authentication required
publicRoutes.get('/demo/info', (c) => {
  return c.json({
    success: true,
    data: {
      message: 'PathPilot Demo Mode',
      description: 'これはPathPilotのデモモードです。認証なしで主要機能をお試しいただけます。',
      available_endpoints: [
        'GET /api/public/demo/info',
        'POST /api/public/demo/hope-experience',
        'GET /api/public/demo/success-patterns',
        'POST /api/public/demo/prompt'
      ],
      demo_user: {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@pathpilot.app',
        target_role: 'Software Engineer',
        target_industry: 'Technology'
      }
    }
  });
});

// Demo hope experience generation
publicRoutes.post('/demo/hope-experience', async (c) => {
  const hopeEngine = new HopeGenerationEngine(c.env);
  
  // Use demo user context
  const demoUserContext = {
    currentSituation: 'job_searching',
    stressLevel: 'medium',
    goalCompany: 'Demo Tech Company',
    skills: ['JavaScript', 'React', 'Node.js'],
    personality: 'analytical'
  };
  
  const experience = await hopeEngine.generateHopeExperience(JSON.stringify(demoUserContext));
  
  return c.json(createSuccessResponse({
    message: 'デモ版の希望体験を生成しました',
    experience,
    note: 'これはデモデータです。実際のサービスではパーソナライズされた体験が生成されます。'
  }));
});

// Demo success patterns
publicRoutes.get('/demo/success-patterns', async (c) => {
  const successEngine = new SuccessPatternEngine(c.env);
  
  // Demo user profile
  const demoProfile = {
    name: 'Demo Developer',
    experience_years: 2,
    current_role: 'Junior Developer',
    target_role: 'Senior Developer',
    skills: ['JavaScript', 'React', 'Node.js'],
    target_industry: 'Technology'
  };
  
  // Create a demo user for success pattern matching
  const demoUser: User = {
    id: 'demo-user',
    email: 'demo@pathpilot.app',
    profile: demoProfile,
    contexts: {
      emotional_state: {
        stress_level: 0.5,
        motivation_level: 'medium',
        confidence_level: 0.6,
        last_updated: new Date().toISOString()
      },
      goals: {
        target_salary: 90000,
        location_preference: 'Tokyo',
        work_style: 'hybrid',
        timeline: '6 months'
      }
    },
    subscription: {
      tier: 'free',
      phase: '1',
      usage_limits: {
        daily_prompts: 1000,
        daily_recommendations: 1000,
        monthly_applications: 1000,
        ai_analysis_credits: 1000
      }
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const patterns = await successEngine.findSimilarSuccessStories(demoUser);
  
  return c.json(createSuccessResponse({
    message: 'デモ版の成功パターンを取得しました',
    patterns,
    note: 'これはサンプルデータです。実際のサービスではより多くのパターンが利用可能です。'
  }));
});

// Demo prompt generation
publicRoutes.post('/demo/prompt', async (c) => {
  const promptEngine = new PromptOrchestrationEngine(c.env);
  
  // Demo context
  const demoContext = {
    goal: 'interview_preparation',
    personality: 'analytical',
    experience_level: 'junior',
    target_industry: 'Technology',
    target_role: 'Software Engineer'
  };
  
  // For demo, we'll create a simple prompt without template
  const demoPrompt = {
    content: `あなたはTechnology業界のSoftware Engineer職の面接準備をサポートするキャリアコーチです。
Junior levelの経験を持つ分析的な性格の候補者に対して、以下の観点でアドバイスしてください：

1. 技術的な質問への準備
2. 行動面接（STAR法）の対策
3. 企業研究のポイント
4. 質問すべき内容の準備

具体的で実践的なアドバイスを提供してください。`,
    personalization_score: 0.85,
    context_variables: demoContext,
    generated_at: new Date().toISOString()
  };
  
  return c.json(createSuccessResponse({
    message: 'デモ版のプロンプトを生成しました',
    prompt: demoPrompt,
    note: 'これはデモ用の固定プロンプトです。実際のサービスでは高度にパーソナライズされたプロンプトが生成されます。'
  }));
});

// Demo statistics
publicRoutes.get('/demo/stats', (c) => {
  return c.json({
    success: true,
    data: {
      total_users: '10,000+',
      success_rate: '87%',
      average_time_to_offer: '45日',
      satisfaction_score: 4.8,
      active_companies: '500+',
      total_prompts_generated: '100,000+',
      demo_mode: true
    }
  });
});
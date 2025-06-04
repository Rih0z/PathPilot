import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env, User } from '../../shared/types';
import { PromptOrchestrationEngine } from '../services/prompt-orchestration';
import { demoAuth } from '../middleware/optional-auth';

type Variables = {
  user?: User;
  isAuthenticated: boolean;
};

export const promptOrchestrationRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// Apply demo/optional authentication middleware to all routes
promptOrchestrationRoutes.use('*', demoAuth);

// Schema validations
const generatePromptSchema = z.object({
  templateId: z.string().min(1),
  additionalContext: z.record(z.any()).optional().default({})
});

const feedbackSchema = z.object({
  promptId: z.string().min(1),
  feedback: z.object({
    effectiveness_rating: z.number().min(1).max(5),
    user_satisfaction: z.number().min(1).max(5),
    actual_results: z.string(),
    improvement_suggestions: z.array(z.string())
  })
});

// Generate personalized prompt
promptOrchestrationRoutes.post('/generate', zValidator('json', generatePromptSchema), async (c) => {
  const user = c.get('user') as User;
  const { templateId, additionalContext } = c.req.valid('json');
  const engine = new PromptOrchestrationEngine(c.env);
  
  const result = await engine.generatePersonalizedPrompt({
    userId: user.id,
    templateId,
    additionalContext: additionalContext || {}
  });
  
  if (result.success) {
    return c.json(result);
  } else {
    const statusCode = result.error?.code === 'TEMPLATE_NOT_FOUND' ? 404 : 500;
    return c.json(result, statusCode);
  }
});

// Analyze user context
promptOrchestrationRoutes.get('/analyze', async (c) => {
  const user = c.get('user') as User;
  const engine = new PromptOrchestrationEngine(c.env);
  
  const result = await engine.analyzeUserContext(user.id);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});

// Record prompt feedback
promptOrchestrationRoutes.post('/feedback', zValidator('json', feedbackSchema), async (c) => {
  const user = c.get('user') as User;
  const { promptId, feedback } = c.req.valid('json');
  const engine = new PromptOrchestrationEngine(c.env);
  
  const result = await engine.recordFeedback({
    promptId,
    userId: user.id,
    feedback
  });
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});
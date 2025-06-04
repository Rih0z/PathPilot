import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env, User } from '../../shared/types';
import { SuccessPatternEngine } from '../services/success-pattern';
import { demoAuth } from '../middleware/optional-auth';

type Variables = {
  user?: User;
  isAuthenticated: boolean;
};

export const successPatternRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// Apply demo/optional authentication middleware to all routes
successPatternRoutes.use('*', demoAuth);

// Schema validations
const completedActionSchema = z.object({
  action: z.string().min(1),
  outcome: z.string().min(1),
  confidence_boost: z.number().min(0).max(1)
});

// Find similar success stories
successPatternRoutes.get('/similar', async (c) => {
  const user = c.get('user') as User;
  const engine = new SuccessPatternEngine(c.env);
  
  const result = await engine.findSimilarSuccessStories(user);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});

// Calculate success probability
successPatternRoutes.post('/probability', async (c) => {
  const user = c.get('user') as User;
  const engine = new SuccessPatternEngine(c.env);
  
  // First get similar patterns
  const patternsResult = await engine.findSimilarSuccessStories(user);
  
  if (!patternsResult.success || !patternsResult.data) {
    return c.json({
      success: false,
      error: {
        code: 'NO_PATTERNS_FOUND',
        message: 'Could not find similar patterns to calculate probability'
      },
      timestamp: new Date().toISOString()
    }, 404);
  }
  
  const result = await engine.calculateSuccessProbability(user, patternsResult.data.patterns);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});

// Generate success roadmap
successPatternRoutes.post('/roadmap', async (c) => {
  const user = c.get('user') as User;
  const engine = new SuccessPatternEngine(c.env);
  
  // This would need real success patterns from KV storage
  // For now, returning empty array
  const result = await engine.generateSuccessRoadmap(user, []);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});

// Track progress and momentum
successPatternRoutes.post('/progress', zValidator('json', completedActionSchema), async (c) => {
  const user = c.get('user') as User;
  const completedAction = c.req.valid('json');
  const engine = new SuccessPatternEngine(c.env);
  
  const result = await engine.trackProgressAndMomentum(user.id, completedAction);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});
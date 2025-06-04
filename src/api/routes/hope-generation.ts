import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env, User } from '../../shared/types';
import { HopeGenerationEngine } from '../services/hope-generation';
import { demoAuth } from '../middleware/optional-auth';

type Variables = {
  user?: User;
  isAuthenticated: boolean;
};

export const hopeGenerationRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

// Apply demo/optional authentication middleware to all routes
hopeGenerationRoutes.use('*', demoAuth);

// Schema validations
const visualizationSchema = z.object({
  targetCompany: z.string().min(1)
});

const momentumSchema = z.object({
  currentMomentum: z.number().min(0).max(1).optional().default(0.5)
});

const hopeScoreSchema = z.object({
  evidence: z.object({
    success_patterns_found: z.number(),
    similarity_score: z.number(),
    success_probability: z.number(),
    timeline_clarity: z.number()
  })
});

// Generate hope experience
hopeGenerationRoutes.post('/experience', async (c) => {
  const user = c.get('user');
  const isAuthenticated = c.get('isAuthenticated');
  const engine = new HopeGenerationEngine(c.env);
  
  if (!user) {
    return c.json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      },
      timestamp: new Date().toISOString()
    }, 404);
  }
  
  const result = await engine.generateHopeExperience(user.id);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});

// Create visualization path
hopeGenerationRoutes.post('/visualization', zValidator('json', visualizationSchema), async (c) => {
  const user = c.get('user') as User;
  const { targetCompany } = c.req.valid('json');
  const engine = new HopeGenerationEngine(c.env);
  
  const result = await engine.createVisualizationPath(user, targetCompany);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});

// Generate momentum actions
hopeGenerationRoutes.post('/momentum', zValidator('json', momentumSchema), async (c) => {
  const user = c.get('user') as User;
  const { currentMomentum } = c.req.valid('json');
  const engine = new HopeGenerationEngine(c.env);
  
  const result = await engine.generateMomentumActions(user.id, currentMomentum);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});

// Calculate hope score
hopeGenerationRoutes.post('/score', zValidator('json', hopeScoreSchema), async (c) => {
  const user = c.get('user') as User;
  const { evidence } = c.req.valid('json');
  const engine = new HopeGenerationEngine(c.env);
  
  const result = await engine.calculateHopeScore(user, evidence);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 500);
  }
});
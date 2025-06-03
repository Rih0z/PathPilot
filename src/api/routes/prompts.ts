import { Hono } from 'hono';
import type { Env } from '../../shared/types';

export const promptRoutes = new Hono<{ Bindings: Env }>();

// TODO: Implement prompt orchestration routes
promptRoutes.get('/', async (c) => {
  return c.json({ message: 'Prompt templates endpoint - to be implemented' });
});

promptRoutes.post('/generate', async (c) => {
  return c.json({ message: 'Generate personalized prompt endpoint - to be implemented' });
});
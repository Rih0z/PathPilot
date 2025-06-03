import { Hono } from 'hono';
import type { Env } from '../../shared/types';

export const applicationRoutes = new Hono<{ Bindings: Env }>();

// TODO: Implement application tracking routes
applicationRoutes.get('/', async (c) => {
  return c.json({ message: 'Applications list endpoint - to be implemented' });
});

applicationRoutes.post('/', async (c) => {
  return c.json({ message: 'Create application endpoint - to be implemented' });
});

applicationRoutes.put('/:id', async (c) => {
  return c.json({ message: 'Update application endpoint - to be implemented' });
});
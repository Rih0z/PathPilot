import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { Env } from './shared/types';
import { authRoutes } from './api/routes/auth';
import { successPatternRoutes } from './api/routes/success-patterns';
import { promptOrchestrationRoutes } from './api/routes/prompt-orchestration';
import { hopeGenerationRoutes } from './api/routes/hope-generation';
import { adminRoutes } from './api/routes/admin';
import { publicRoutes } from './api/routes/public';

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true
}));

// Health check
app.get('/', (c) => {
  return c.json({
    name: 'PathPilot API',
    version: '1.0.0',
    status: 'operational',
    environment: c.env.ENVIRONMENT || 'development',
    phase: c.env.MONETIZATION_PHASE || '1',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.route('/api/auth', authRoutes);
app.route('/api/success-patterns', successPatternRoutes);
app.route('/api/prompts', promptOrchestrationRoutes);
app.route('/api/hope', hopeGenerationRoutes);
app.route('/api/admin', adminRoutes);
app.route('/api/public', publicRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found'
    },
    timestamp: new Date().toISOString()
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Global error:', err);
  return c.json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: c.env.DEBUG_MODE === 'true' ? err.message : 'An internal error occurred'
    },
    timestamp: new Date().toISOString()
  }, 500);
});

export default app;
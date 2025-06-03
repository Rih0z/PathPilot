import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import type { Env } from '../shared/types';
import { createErrorResponse, ErrorCodes, createAPIError } from '../shared/utils';

// Import route handlers
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { promptRoutes } from './routes/prompts';
import { applicationRoutes } from './routes/applications';
import { analyticsRoutes } from './routes/analytics';

const app = new Hono<{ Bindings: Env }>();

// Global middleware
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://pathpilot.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger());
app.use('*', secureHeaders());

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    version: '1.0.0',
    phase: c.env.MONETIZATION_PHASE,
    environment: c.env.ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

// API versioning
const v1 = app.basePath('/api/v1');

// Mount route handlers
v1.route('/auth', authRoutes);
v1.route('/user', userRoutes);
v1.route('/prompts', promptRoutes);
v1.route('/applications', applicationRoutes);
v1.route('/analytics', analyticsRoutes);

// Global error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  
  const errorResponse = createErrorResponse(
    createAPIError(
      ErrorCodes.INTERNAL_ERROR,
      'An internal server error occurred',
      { message: err.message }
    )
  );
  
  return c.json(errorResponse, 500);
});

// 404 handler
app.notFound((c) => {
  const errorResponse = createErrorResponse(
    createAPIError(
      ErrorCodes.NOT_FOUND,
      'API endpoint not found',
      { path: c.req.path, method: c.req.method }
    )
  );
  
  return c.json(errorResponse, 404);
});

export default app;
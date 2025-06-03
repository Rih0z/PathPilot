import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env } from '../../shared/types';
import { UserAuthService } from '../services/user-auth';

export const authRoutes = new Hono<{ Bindings: Env }>();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  profile: z.object({
    name: z.string().min(1, 'Name is required'),
    current_role: z.string().min(1, 'Current role is required'),
    experience_years: z.number().min(0, 'Experience years must be non-negative'),
    target_role: z.string().min(1, 'Target role is required'),
    target_industry: z.string().min(1, 'Target industry is required'),
    skills: z.array(z.string()).optional(),
    education: z.string().optional()
  })
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

// Register endpoint
authRoutes.post('/register', zValidator('json', registerSchema), async (c) => {
  const data = c.req.valid('json');
  const authService = new UserAuthService(c.env);
  
  const result = await authService.register(data);
  
  if (result.success) {
    return c.json(result, 201);
  } else {
    const statusCode = result.error?.code === 'VALIDATION_ERROR' ? 400 : 500;
    return c.json(result, statusCode);
  }
});

// Login endpoint
authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const data = c.req.valid('json');
  const authService = new UserAuthService(c.env);
  
  const result = await authService.login(data);
  
  if (result.success) {
    return c.json(result);
  } else {
    const statusCode = result.error?.code === 'INVALID_CREDENTIALS' ? 401 : 500;
    return c.json(result, statusCode);
  }
});

// Token validation endpoint
authRoutes.get('/validate', async (c) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authorization header required'
      },
      timestamp: new Date().toISOString()
    }, 401);
  }

  const token = authHeader.substring(7);
  const authService = new UserAuthService(c.env);
  
  const result = await authService.validateToken(token);
  
  if (result.success) {
    return c.json(result);
  } else {
    return c.json(result, 401);
  }
});
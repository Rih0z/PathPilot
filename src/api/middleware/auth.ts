import type { Context, Next } from 'hono';
import type { Env, User } from '../../shared/types';
import { UserAuthService } from '../services/user-auth';

type Variables = {
  user: User;
};

export const bearerAuth = async (c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) => {
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
  
  if (!result.success || !result.data) {
    return c.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token'
      },
      timestamp: new Date().toISOString()
    }, 401);
  }
  
  // Set user in context for downstream handlers
  c.set('user', result.data.user);
  
  await next();
};
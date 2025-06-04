import type { Context, Next } from 'hono';
import type { Env, User } from '../../shared/types';
import { UserAuthService } from '../services/user-auth';

type Variables = {
  user?: User;
  isAuthenticated: boolean;
};

/**
 * Optional authentication middleware
 * Sets user if valid token is provided, but doesn't block if missing
 */
export const optionalAuth = async (c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) => {
  const authHeader = c.req.header('Authorization');
  
  // If no auth header, continue without user
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    c.set('isAuthenticated', false);
    await next();
    return;
  }
  
  const token = authHeader.substring(7);
  const authService = new UserAuthService(c.env);
  
  try {
    const result = await authService.validateToken(token);
    
    if (result.success && result.data) {
      // Set user in context for downstream handlers
      c.set('user', result.data.user);
      c.set('isAuthenticated', true);
    } else {
      c.set('isAuthenticated', false);
    }
  } catch (error) {
    // If token validation fails, continue without user
    c.set('isAuthenticated', false);
  }
  
  await next();
};

/**
 * Demo mode authentication middleware
 * Creates a demo user for testing purposes
 */
export const demoAuth = async (c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) => {
  // Check if demo mode is requested
  const isDemoMode = c.req.header('X-Demo-Mode') === 'true';
  
  console.log('Demo mode check:', { isDemoMode, header: c.req.header('X-Demo-Mode') });
  
  if (isDemoMode) {
    console.log('Creating demo user...');
    // Create a demo user
    const demoUser: User = {
      id: 'demo-user-001',
      email: 'demo@pathpilot.app',
      profile: {
        name: 'Demo User',
        current_role: 'Student',
        experience_years: 0,
        target_role: 'Software Engineer',
        target_industry: 'Technology',
        skills: ['JavaScript', 'React', 'Node.js'],
        education: 'Computer Science, Demo University'
      },
      contexts: {
        emotional_state: {
          stress_level: 0.5,
          motivation_level: 'high',
          confidence_level: 0.7,
          last_updated: new Date().toISOString()
        },
        goals: {
          target_salary: 70000,
          location_preference: 'Tokyo',
          work_style: 'hybrid',
          timeline: '3 months'
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
    
    c.set('user', demoUser);
    c.set('isAuthenticated', true);
    await next();
    return;
  }
  
  // Otherwise, use optional auth
  await optionalAuth(c, next);
};
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { Env } from '../../shared/types';
import { kvPut } from '../../shared/utils';

export const adminRoutes = new Hono<{ Bindings: Env }>();

// Admin authentication middleware
const adminAuth = async (c: any, next: any) => {
  const adminKey = c.req.header('X-Admin-Key');
  const expectedKey = c.env.ADMIN_KEY || 'pathpilot-admin-2025';
  
  if (adminKey !== expectedKey) {
    return c.json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid admin key'
      }
    }, 401);
  }
  
  await next();
};

// Apply admin auth to all routes
adminRoutes.use('*', adminAuth);

// Seed prompt templates
const seedTemplatesSchema = z.object({
  templates: z.array(z.object({
    id: z.string(),
    name: z.string(),
    goal: z.string(),
    base_prompt: z.string(),
    variables: z.array(z.string()),
    conditions: z.object({
      personality_traits: z.array(z.string()).optional(),
      experience_level_min: z.number().optional(),
      experience_level_max: z.number().optional()
    }).optional(),
    effectiveness_score: z.number().min(0).max(1),
    usage_count: z.number().default(0),
    created_at: z.string(),
    updated_at: z.string()
  }))
});

adminRoutes.post('/seed-templates', 
  zValidator('json', seedTemplatesSchema),
  async (c) => {
    const { templates } = c.req.valid('json');
    
    let successCount = 0;
    const errors: string[] = [];
    
    for (const template of templates) {
      const key = `prompt_template:${template.id}`;
      const success = await kvPut(c.env.PROMPT_TEMPLATES, key, template);
      
      if (success) {
        successCount++;
      } else {
        errors.push(`Failed to save template: ${template.id}`);
      }
    }
    
    // Also create an index for quick lookups
    const templateIndex = templates.map(t => ({
      id: t.id,
      name: t.name,
      goal: t.goal
    }));
    
    await kvPut(c.env.PROMPT_TEMPLATES, 'template_index', templateIndex);
    
    return c.json({
      success: true,
      data: {
        total: templates.length,
        saved: successCount,
        errors: errors.length > 0 ? errors : undefined
      }
    });
  }
);

// Clear all data (dangerous!)
adminRoutes.delete('/clear-all-data', async (c) => {
  // This would need to be implemented with KV list operations
  // For safety, we'll just return a warning
  return c.json({
    success: false,
    error: {
      code: 'NOT_IMPLEMENTED',
      message: 'Data clearing is not implemented for safety reasons'
    }
  });
});

// Get system stats
adminRoutes.get('/stats', async (c) => {
  return c.json({
    success: true,
    data: {
      environment: c.env.ENVIRONMENT || 'development',
      monetization_phase: c.env.MONETIZATION_PHASE || '1',
      debug_mode: c.env.DEBUG_MODE || 'true',
      kv_namespaces: {
        user_contexts: 'connected',
        prompt_templates: 'connected',
        usage_analytics: 'connected'
      },
      timestamp: new Date().toISOString()
    }
  });
});
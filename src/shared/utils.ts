import type { APIResponse, APIError, UsageLimits } from './types';

// Response helpers
export const createSuccessResponse = <T>(data: T): APIResponse<T> => ({
  success: true,
  data,
  timestamp: new Date().toISOString()
});

export const createErrorResponse = (error: APIError): APIResponse => ({
  success: false,
  error,
  timestamp: new Date().toISOString()
});

// Error creation helpers
export const createAPIError = (
  code: string, 
  message: string, 
  details?: Record<string, any>
): APIError => ({
  code,
  message,
  details
});

// Common error types
export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  TEMPLATE_NOT_FOUND: 'TEMPLATE_NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_TOKEN: 'INVALID_TOKEN',
  USAGE_LIMIT_EXCEEDED: 'USAGE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  MONETIZATION_REQUIRED: 'MONETIZATION_REQUIRED'
} as const;

// Usage limit helpers
export const getUsageLimitsForPhase = (phase: '1' | '2' | '3', tier: 'free' | 'premium'): UsageLimits => {
  switch (phase) {
    case '1': // Phase 1: Completely free
      return {
        daily_prompts: 1000,
        daily_recommendations: 1000,
        monthly_applications: 1000,
        ai_analysis_credits: 1000
      };
      
    case '2': // Phase 2: Freemium
      if (tier === 'premium') {
        return {
          daily_prompts: 1000,
          daily_recommendations: 1000,
          monthly_applications: 1000,
          ai_analysis_credits: 1000
        };
      }
      return {
        daily_prompts: 10,
        daily_recommendations: 20,
        monthly_applications: 5,
        ai_analysis_credits: 3
      };
      
    case '3': // Phase 3: AI integrated
      if (tier === 'premium') {
        return {
          daily_prompts: 1000,
          daily_recommendations: 1000,
          monthly_applications: 1000,
          ai_analysis_credits: 500
        };
      }
      return {
        daily_prompts: 5,
        daily_recommendations: 10,
        monthly_applications: 3,
        ai_analysis_credits: 1
      };
      
    default:
      throw new Error(`Unknown phase: ${phase}`);
  }
};

// ID generation
export const generateId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
};

// Date helpers
export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isThisMonth = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

export const startOfDay = (): string => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
};

export const startOfMonth = (): string => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
};

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, contains letter and number
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
};

// Prompt personalization helpers
export const calculatePersonalizationScore = (
  templateVariables: string[],
  providedContext: Record<string, any>
): number => {
  const availableVariables = Object.keys(providedContext);
  const matchedVariables = templateVariables.filter(
    variable => availableVariables.includes(variable) && providedContext[variable] !== null
  );
  
  return templateVariables.length > 0 ? matchedVariables.length / templateVariables.length : 0;
};

export const interpolateTemplate = (
  template: string,
  variables: Record<string, any>
): string => {
  let result = template;
  
  for (const [key, value] of Object.entries(variables)) {
    if (value !== null && value !== undefined) {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(regex, String(value));
    }
  }
  
  return result;
};

// Success probability calculation
export const calculateSuccessProbability = (
  userProfile: any,
  jobRequirements: any,
  historicalData?: any
): number => {
  // Simplified success probability calculation
  // In real implementation, this would use ML models
  
  let score = 0.5; // Base probability
  
  // Experience match
  if (userProfile.experience_years >= (jobRequirements.min_experience || 0)) {
    score += 0.2;
  }
  
  // Skill match (simplified)
  if (userProfile.skills && jobRequirements.required_skills) {
    const skillMatch = userProfile.skills.filter((skill: string) =>
      jobRequirements.required_skills.includes(skill)
    ).length / jobRequirements.required_skills.length;
    score += skillMatch * 0.3;
  }
  
  return Math.min(1, Math.max(0, score));
};

// Logging helper
export const createLogger = (context: string) => ({
  info: (message: string, data?: any) => {
    console.log(`[${context}] INFO: ${message}`, data || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[${context}] WARN: ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[${context}] ERROR: ${message}`, error || '');
  }
});

// KV helpers
export const kvGet = async <T>(
  kv: KVNamespace,
  key: string
): Promise<T | null> => {
  try {
    const value = await kv.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Failed to get key ${key} from KV:`, error);
    return null;
  }
};

export const kvPut = async (
  kv: KVNamespace,
  key: string,
  value: any,
  options?: { expirationTtl?: number }
): Promise<boolean> => {
  try {
    await kv.put(key, JSON.stringify(value), options);
    return true;
  } catch (error) {
    console.error(`Failed to put key ${key} to KV:`, error);
    return false;
  }
};
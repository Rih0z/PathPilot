import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  createAPIError, 
  ErrorCodes,
  generateId,
  isValidEmail,
  isValidPassword,
  getUsageLimitsForPhase,
  kvGet,
  kvPut
} from '../../shared/utils';
import type { User, UserProfile, APIResponse, Env } from '../../shared/types';

interface RegisterData {
  email: string;
  password: string;
  profile: UserProfile;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResult {
  user: User;
  token: string;
}

interface UserWithPassword extends User {
  password_hash: string;
}

export class UserAuthService {
  private env: Env;
  private jwtSecret: Uint8Array;

  constructor(env: Env) {
    this.env = env;
    // In production, this should be from environment variable
    const secretKey = env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    this.jwtSecret = new TextEncoder().encode(secretKey);
  }

  async register(data: RegisterData): Promise<APIResponse<AuthResult>> {
    try {
      // Validate input
      if (!isValidEmail(data.email)) {
        return createErrorResponse(
          createAPIError(ErrorCodes.VALIDATION_ERROR, 'Invalid email format')
        );
      }

      if (!isValidPassword(data.password)) {
        return createErrorResponse(
          createAPIError(
            ErrorCodes.VALIDATION_ERROR, 
            'Password must be at least 8 characters and contain letters and numbers'
          )
        );
      }

      // Check if user already exists
      const existingUser = await kvGet<UserWithPassword>(
        this.env.USER_CONTEXTS, 
        `user:${data.email}`
      );

      if (existingUser) {
        return createErrorResponse(
          createAPIError(ErrorCodes.USER_ALREADY_EXISTS, 'User already exists')
        );
      }

      // Hash password
      const passwordHash = await bcrypt.hash(data.password, 10);

      // Create user
      const userId = generateId('user');
      const now = new Date().toISOString();
      
      const user: UserWithPassword = {
        id: userId,
        email: data.email,
        profile: data.profile,
        contexts: {
          emotional_state: {
            stress_level: 0.5,
            motivation_level: 'medium',
            confidence_level: 0.5,
            last_updated: now
          },
          goals: {
            target_salary: 0,
            location_preference: '',
            work_style: 'hybrid',
            timeline: ''
          }
        },
        subscription: {
          tier: 'free',
          phase: this.env.MONETIZATION_PHASE as '1' | '2' | '3',
          usage_limits: getUsageLimitsForPhase(
            this.env.MONETIZATION_PHASE as '1' | '2' | '3',
            'free'
          )
        },
        created_at: now,
        updated_at: now,
        password_hash: passwordHash
      };

      // Save user to KV
      await kvPut(this.env.USER_CONTEXTS, `user:${data.email}`, user);
      await kvPut(this.env.USER_CONTEXTS, `user_id:${userId}`, { email: data.email });

      // Generate JWT token
      const token = await this.generateToken(user);

      // Remove password hash from response
      const { password_hash, ...userResponse } = user;

      return createSuccessResponse<AuthResult>({
        user: userResponse,
        token
      });

    } catch (error) {
      console.error('Registration error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Registration failed')
      );
    }
  }

  async login(data: LoginData): Promise<APIResponse<AuthResult>> {
    try {
      // Get user by email
      const user = await kvGet<UserWithPassword>(
        this.env.USER_CONTEXTS, 
        `user:${data.email}`
      );

      if (!user) {
        return createErrorResponse(
          createAPIError(ErrorCodes.INVALID_CREDENTIALS, 'Invalid email or password')
        );
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(data.password, user.password_hash);
      
      if (!isValidPassword) {
        return createErrorResponse(
          createAPIError(ErrorCodes.INVALID_CREDENTIALS, 'Invalid email or password')
        );
      }

      // Generate JWT token
      const token = await this.generateToken(user);

      // Remove password hash from response
      const { password_hash, ...userResponse } = user;

      return createSuccessResponse<AuthResult>({
        user: userResponse,
        token
      });

    } catch (error) {
      console.error('Login error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INTERNAL_ERROR, 'Login failed')
      );
    }
  }

  async validateToken(token: string): Promise<APIResponse<{ user: User }>> {
    try {
      // Verify JWT token
      const { payload } = await jwtVerify(token, this.jwtSecret);
      
      if (!payload.sub || !payload.email) {
        return createErrorResponse(
          createAPIError(ErrorCodes.INVALID_TOKEN, 'Invalid token payload')
        );
      }

      // Get user from KV
      const user = await kvGet<UserWithPassword>(
        this.env.USER_CONTEXTS, 
        `user:${payload.email}`
      );

      if (!user || user.id !== payload.sub) {
        return createErrorResponse(
          createAPIError(ErrorCodes.INVALID_TOKEN, 'User not found')
        );
      }

      // Remove password hash from response
      const { password_hash, ...userResponse } = user;

      return createSuccessResponse({ user: userResponse });

    } catch (error) {
      console.error('Token validation error:', error);
      return createErrorResponse(
        createAPIError(ErrorCodes.INVALID_TOKEN, 'Invalid or expired token')
      );
    }
  }

  private async generateToken(user: UserWithPassword): Promise<string> {
    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      tier: user.subscription.tier,
      phase: user.subscription.phase
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(this.jwtSecret);

    return token;
  }
}
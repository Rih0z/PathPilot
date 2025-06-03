import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserAuthService } from '../user-auth';
import { createMockEnv, createMockUser } from '../../../tests/setup';
import type { MockEnv } from '../../../tests/setup';

// Mock bcryptjs
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('$2a$10$hashedpassword'),
    compare: vi.fn()
  }
}));

// Mock jose
vi.mock('jose', () => ({
  SignJWT: vi.fn().mockImplementation(() => ({
    setProtectedHeader: vi.fn().mockReturnThis(),
    setIssuedAt: vi.fn().mockReturnThis(),
    setExpirationTime: vi.fn().mockReturnThis(),
    sign: vi.fn().mockResolvedValue('mock.jwt.token')
  })),
  jwtVerify: vi.fn()
}));

describe('UserAuthService', () => {
  let authService: UserAuthService;
  let mockEnv: MockEnv;

  beforeEach(() => {
    mockEnv = createMockEnv();
    authService = new UserAuthService(mockEnv);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'securepassword123',
        profile: {
          name: 'Test User',
          current_role: 'Developer',
          experience_years: 3,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        }
      };

      // Mock KV to return null for existing user check
      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(null);
      vi.mocked(mockEnv.USER_CONTEXTS.put).mockResolvedValueOnce(undefined);

      // Act
      const result = await authService.register(userData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.user.email).toBe('test@example.com');
      expect(result.data?.user.id).toMatch(/^user-/);
      expect(result.data?.token).toBeDefined();
      
      // Verify password is not returned
      expect((result.data?.user as any).password).toBeUndefined();
    });

    it('should fail when user already exists', async () => {
      // Arrange
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        profile: {
          name: 'Existing User',
          current_role: 'Developer',
          experience_years: 2,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        }
      };

      // Mock existing user
      const existingUser = createMockUser({ email: 'existing@example.com' });
      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(existingUser));

      // Act
      const result = await authService.register(userData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('USER_ALREADY_EXISTS');
      expect(result.error?.message).toContain('already exists');
    });

    it('should validate email format', async () => {
      // Arrange
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        profile: {
          name: 'Test User',
          current_role: 'Developer',
          experience_years: 3,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        }
      };

      // Act
      const result = await authService.register(userData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('VALIDATION_ERROR');
      expect(result.error?.message).toContain('Invalid email format');
    });

    it('should validate password strength', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: '123',
        profile: {
          name: 'Test User',
          current_role: 'Developer',
          experience_years: 3,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        }
      };

      // Act
      const result = await authService.register(userData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('VALIDATION_ERROR');
      expect(result.error?.message).toContain('Password must be at least 8 characters');
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      // Arrange
      const credentials = {
        email: 'test@example.com',
        password: 'securepassword123'
      };

      const mockUser = createMockUser({
        email: 'test@example.com',
        password_hash: '$2a$10$hashedpassword' // Mock bcrypt hash
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(mockUser));

      // Mock bcrypt compare to return true
      const bcrypt = await import('bcryptjs');
      vi.mocked(bcrypt.default.compare).mockResolvedValueOnce(true);

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.user.email).toBe('test@example.com');
      expect(result.data?.token).toBeDefined();
      expect((result.data?.user as any).password_hash).toBeUndefined();
    });

    it('should fail with invalid credentials', async () => {
      // Arrange
      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const mockUser = createMockUser({
        email: 'test@example.com',
        password_hash: '$2a$10$hashedpassword'
      });

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(mockUser));

      // Mock bcrypt compare to return false
      const bcrypt = await import('bcryptjs');
      vi.mocked(bcrypt.default.compare).mockResolvedValueOnce(false);

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('INVALID_CREDENTIALS');
    });

    it('should fail when user does not exist', async () => {
      // Arrange
      const credentials = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(null);

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('validateToken', () => {
    it('should validate a valid token', async () => {
      // Arrange
      const validToken = 'valid.jwt.token';
      const mockUser = createMockUser();

      // Mock JWT verification
      const { jwtVerify } = await import('jose');
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { sub: mockUser.id, email: mockUser.email }
      } as any);

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(JSON.stringify(mockUser));

      // Act
      const result = await authService.validateToken(validToken);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.user.id).toBe(mockUser.id);
    });

    it('should fail with invalid token', async () => {
      // Arrange
      const invalidToken = 'invalid.token';

      // Mock JWT verification to throw error
      const { jwtVerify } = await import('jose');
      vi.mocked(jwtVerify).mockRejectedValueOnce(new Error('Invalid token'));

      // Act
      const result = await authService.validateToken(invalidToken);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('INVALID_TOKEN');
    });
  });

  describe('Phase 1 specific behavior', () => {
    it('should create user with unlimited usage limits in Phase 1', async () => {
      // Arrange
      mockEnv.MONETIZATION_PHASE = '1';
      const userData = {
        email: 'phase1@example.com',
        password: 'password123',
        profile: {
          name: 'Phase 1 User',
          current_role: 'Developer',
          experience_years: 3,
          target_role: 'Senior Developer',
          target_industry: 'Tech'
        }
      };

      vi.mocked(mockEnv.USER_CONTEXTS.get).mockResolvedValueOnce(null);
      vi.mocked(mockEnv.USER_CONTEXTS.put).mockResolvedValueOnce(undefined);

      // Act
      const result = await authService.register(userData);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data?.user.subscription.tier).toBe('free');
      expect(result.data?.user.subscription.phase).toBe('1');
      expect(result.data?.user.subscription.usage_limits.daily_prompts).toBe(1000);
    });
  });
});
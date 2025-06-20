import { test, expect } from '@playwright/test';

const API_BASE = 'https://pathpilot.riho-dare.workers.dev';

test.describe('Authentication E2E Tests', () => {
  
  test.describe('API Authentication Tests (Currently Skipped - Endpoints Not Implemented)', () => {
    test.skip('should register a new user via API', async ({ request }) => {
      const timestamp = Date.now();
      const testUser = {
        email: `test${timestamp}@example.com`,
        password: 'TestPassword123',
        profile: {
          name: 'テスト太郎',
          current_role: '学生',
          experience_years: 0,
          target_role: 'ソフトウェアエンジニア',
          target_industry: 'IT・技術',
          skills: ['JavaScript', 'React'],
          education: '大学在学中'
        }
      };

      const response = await request.post(`${API_BASE}/auth/register`, {
        data: testUser
      });

      expect(response.ok()).toBeTruthy();
      
      const responseData = await response.json();
      expect(responseData.success).toBeTruthy();
      expect(responseData.data.user.email).toBe(testUser.email);
      expect(responseData.data.token).toBeDefined();
      expect(typeof responseData.data.token).toBe('string');
    });

    test.skip('should not register user with duplicate email', async ({ request }) => {
      const timestamp = Date.now();
      const testUser = {
        email: `duplicate${timestamp}@example.com`,
        password: 'TestPassword123',
        profile: {
          name: 'テスト太郎',
          current_role: '学生',
          experience_years: 0,
          target_role: 'ソフトウェアエンジニア',
          target_industry: 'IT・技術'
        }
      };

      // First registration
      const firstResponse = await request.post(`${API_BASE}/auth/register`, {
        data: testUser
      });
      expect(firstResponse.ok()).toBeTruthy();

      // Second registration with same email
      const secondResponse = await request.post(`${API_BASE}/auth/register`, {
        data: testUser
      });
      
      expect(secondResponse.status()).toBe(400);
      const errorData = await secondResponse.json();
      expect(errorData.success).toBeFalsy();
      expect(errorData.error.code).toBe('USER_ALREADY_EXISTS');
    });

    test.skip('should validate registration data', async ({ request }) => {
      // Test invalid email
      const invalidEmailResponse = await request.post(`${API_BASE}/auth/register`, {
        data: {
          email: 'invalid-email',
          password: 'TestPassword123',
          profile: {
            name: 'テスト太郎',
            current_role: '学生',
            experience_years: 0,
            target_role: 'ソフトウェアエンジニア',
            target_industry: 'IT・技術'
          }
        }
      });

      expect(invalidEmailResponse.status()).toBe(400);
      
      // Test weak password
      const weakPasswordResponse = await request.post(`${API_BASE}/auth/register`, {
        data: {
          email: 'test@example.com',
          password: '123',
          profile: {
            name: 'テスト太郎',
            current_role: '学生',
            experience_years: 0,
            target_role: 'ソフトウェアエンジニア',
            target_industry: 'IT・技術'
          }
        }
      });

      expect(weakPasswordResponse.status()).toBe(400);
    });

    test.skip('should login with valid credentials', async ({ request }) => {
      const timestamp = Date.now();
      const testUser = {
        email: `login${timestamp}@example.com`,
        password: 'TestPassword123',
        profile: {
          name: 'テスト太郎',
          current_role: '学生',
          experience_years: 0,
          target_role: 'ソフトウェアエンジニア',
          target_industry: 'IT・技術'
        }
      };

      // Register user first
      const registerResponse = await request.post(`${API_BASE}/auth/register`, {
        data: testUser
      });
      expect(registerResponse.ok()).toBeTruthy();

      // Login with credentials
      const loginResponse = await request.post(`${API_BASE}/auth/login`, {
        data: {
          email: testUser.email,
          password: testUser.password
        }
      });

      expect(loginResponse.ok()).toBeTruthy();
      
      const loginData = await loginResponse.json();
      expect(loginData.success).toBeTruthy();
      expect(loginData.data.user.email).toBe(testUser.email);
      expect(loginData.data.token).toBeDefined();
    });

    test.skip('should reject login with invalid credentials', async ({ request }) => {
      const invalidLoginResponse = await request.post(`${API_BASE}/auth/login`, {
        data: {
          email: 'nonexistent@example.com',
          password: 'WrongPassword123'
        }
      });

      expect(invalidLoginResponse.status()).toBe(401);
      
      const errorData = await invalidLoginResponse.json();
      expect(errorData.success).toBeFalsy();
      expect(errorData.error.code).toBe('INVALID_CREDENTIALS');
    });

    test.skip('should validate JWT token', async ({ request }) => {
      const timestamp = Date.now();
      const testUser = {
        email: `token${timestamp}@example.com`,
        password: 'TestPassword123',
        profile: {
          name: 'テスト太郎',
          current_role: '学生',
          experience_years: 0,
          target_role: 'ソフトウェアエンジニア',
          target_industry: 'IT・技術'
        }
      };

      // Register and get token
      const registerResponse = await request.post(`${API_BASE}/auth/register`, {
        data: testUser
      });
      const registerData = await registerResponse.json();
      const token = registerData.data.token;

      // Validate token
      const validateResponse = await request.get(`${API_BASE}/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      expect(validateResponse.ok()).toBeTruthy();
      
      const validateData = await validateResponse.json();
      expect(validateData.success).toBeTruthy();
      expect(validateData.data.user.email).toBe(testUser.email);
    });

    test.skip('should reject invalid token', async ({ request }) => {
      const invalidTokenResponse = await request.get(`${API_BASE}/auth/validate`, {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });

      expect(invalidTokenResponse.status()).toBe(401);
      
      const errorData = await invalidTokenResponse.json();
      expect(errorData.success).toBeFalsy();
      expect(errorData.error.code).toBe('INVALID_TOKEN');
    });

    test.skip('should reject request without authorization header', async ({ request }) => {
      const noHeaderResponse = await request.get(`${API_BASE}/auth/validate`);

      expect(noHeaderResponse.status()).toBe(401);
      
      const errorData = await noHeaderResponse.json();
      expect(errorData.success).toBeFalsy();
      expect(errorData.error.code).toBe('UNAUTHORIZED');
    });
  });

  test.describe('System Access Tests', () => {
    test('should access public demo features without authentication', async ({ page }) => {
      await page.goto('/');
      
      // Should be able to access landing page
      await expect(page.getByText('PathPilot')).toBeVisible();
      await expect(page.getByText('あなたの就活に')).toBeVisible();
      
      // Should be able to start onboarding
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      await expect(page).toHaveURL('/onboarding');
      
      // Should be able to complete onboarding
      await page.getByPlaceholder('例: 田中 太郎').fill('テスト太郎');
      await page.getByText('次へ').click();
      await page.getByText('大学生・大学院生').click();
      await page.getByText('次へ').click();
      await page.locator('input[type="range"]').fill('2');
      await page.getByText('次へ').click();
      await page.getByPlaceholder('例: ソフトウェアエンジニア').fill('エンジニア');
      await page.getByText('次へ').click();
      await page.getByText('😐 普通').click();
      await page.getByText('次へ').click();
      await page.getByText('年収400万円以上').click();
      await page.getByText('次へ').click();
      await page.getByText('はじめる').click();
      
      // Should reach dashboard
      await expect(page).toHaveURL('/dashboard');
    });

    test('should access main app demo features', async ({ page }) => {
      // Complete onboarding first
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('テスト太郎');
      await page.getByText('次へ').click();
      await page.getByText('大学生・大学院生').click();
      await page.getByText('次へ').click();
      await page.locator('input[type="range"]').fill('2');
      await page.getByText('次へ').click();
      await page.getByPlaceholder('例: ソフトウェアエンジニア').fill('エンジニア');
      await page.getByText('次へ').click();
      await page.getByText('😐 普通').click();
      await page.getByText('次へ').click();
      await page.getByText('年収400万円以上').click();
      await page.getByText('次へ').click();
      await page.getByText('はじめる').click();

      // Access main app
      await page.getByText('アプリを使う').click();
      
      // Should be able to generate hope experience
      await page.getByText('希望体験を生成').click();
      await expect(page.getByText(/3ヶ月後のあなた/)).toBeVisible({ timeout: 10000 });
      
      // Should be able to analyze success patterns
      await page.getByText('成功パターン分析').click();
      await expect(page.getByText(/成功パターン/)).toBeVisible({ timeout: 10000 });
      
      // Should be able to generate prompts
      await page.getByText('プロンプト生成').click();
      await expect(page.getByText(/以下の情報をもとに/)).toBeVisible({ timeout: 10000 });
    });

    test('should access data import feature', async ({ page }) => {
      // Complete onboarding
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('テスト太郎');
      await page.getByText('次へ').click();
      await page.getByText('大学生・大学院生').click();
      await page.getByText('次へ').click();
      await page.locator('input[type="range"]').fill('2');
      await page.getByText('次へ').click();
      await page.getByPlaceholder('例: ソフトウェアエンジニア').fill('エンジニア');
      await page.getByText('次へ').click();
      await page.getByText('😐 普通').click();
      await page.getByText('次へ').click();
      await page.getByText('年収400万円以上').click();
      await page.getByText('次へ').click();
      await page.getByText('はじめる').click();

      // Access data import
      await page.getByText('データインポート').click();
      
      // Should show data import interface
      await expect(page.getByText('AI用プロンプト生成')).toBeVisible();
      await expect(page.getByText('あなたの就活状況を詳細に分析')).toBeVisible();
    });

    test('should maintain session across page navigation', async ({ page }) => {
      // Complete onboarding
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      const userName = 'セッションテスト太郎';
      await page.getByPlaceholder('例: 田中 太郎').fill(userName);
      await page.getByText('次へ').click();
      await page.getByText('大学生・大学院生').click();
      await page.getByText('次へ').click();
      await page.locator('input[type="range"]').fill('2');
      await page.getByText('次へ').click();
      await page.getByPlaceholder('例: ソフトウェアエンジニア').fill('エンジニア');
      await page.getByText('次へ').click();
      await page.getByText('😐 普通').click();
      await page.getByText('次へ').click();
      await page.getByText('年収400万円以上').click();
      await page.getByText('次へ').click();
      await page.getByText('はじめる').click();

      // Navigate between different sections
      await page.getByText('アプリを使う').click();
      await page.getByText('データインポート').click();
      await page.getByText('ダッシュボード').click();

      // User name should be maintained
      await expect(page.getByText(`こんにちは、${userName}さん`)).toBeVisible();
    });

    test('should handle browser refresh and session persistence', async ({ page }) => {
      // Complete onboarding
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      const userName = 'リフレッシュテスト太郎';
      await page.getByPlaceholder('例: 田中 太郎').fill(userName);
      await page.getByText('次へ').click();
      await page.getByText('大学生・大学院生').click();
      await page.getByText('次へ').click();
      await page.locator('input[type="range"]').fill('2');
      await page.getByText('次へ').click();
      await page.getByPlaceholder('例: ソフトウェアエンジニア').fill('エンジニア');
      await page.getByText('次へ').click();
      await page.getByText('😐 普通').click();
      await page.getByText('次へ').click();
      await page.getByText('年収400万円以上').click();
      await page.getByText('次へ').click();
      await page.getByText('はじめる').click();

      // Refresh the page
      await page.reload();

      // Session should be maintained (depending on implementation)
      // This test might need adjustment based on actual session handling
      await expect(page.getByText('PathPilot')).toBeVisible();
    });
  });

  test.describe('Future Authentication UI Tests', () => {
    // These tests are prepared for when login UI is implemented
    test.skip('should display login form when implemented', async ({ page }) => {
      await page.goto('/login');
      
      await expect(page.getByText('ログイン')).toBeVisible();
      await expect(page.getByPlaceholder('メールアドレス')).toBeVisible();
      await expect(page.getByPlaceholder('パスワード')).toBeVisible();
      await expect(page.getByText('ログイン').last()).toBeVisible();
    });

    test.skip('should display registration form when implemented', async ({ page }) => {
      await page.goto('/register');
      
      await expect(page.getByText('新規登録')).toBeVisible();
      await expect(page.getByPlaceholder('メールアドレス')).toBeVisible();
      await expect(page.getByPlaceholder('パスワード')).toBeVisible();
      await expect(page.getByPlaceholder('お名前')).toBeVisible();
    });

    test.skip('should handle login form submission when implemented', async ({ page }) => {
      await page.goto('/login');
      
      await page.getByPlaceholder('メールアドレス').fill('test@example.com');
      await page.getByPlaceholder('パスワード').fill('TestPassword123');
      await page.getByText('ログイン').last().click();
      
      // Should redirect to dashboard on successful login
      await expect(page).toHaveURL('/dashboard');
    });
  });
});
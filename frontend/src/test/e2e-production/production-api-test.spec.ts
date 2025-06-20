import { test, expect } from '@playwright/test';

const PRODUCTION_BACKEND = 'https://pathpilot.riho-dare.workers.dev';

test.describe('Production API Tests', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
  });

  test('should successfully communicate with production API endpoints', async ({ page, request }) => {
    // Test demo info endpoint
    const infoResponse = await request.get(`${PRODUCTION_BACKEND}/api/public/demo/info`);
    expect(infoResponse.ok()).toBeTruthy();
    
    const infoData = await infoResponse.json();
    expect(infoData).toHaveProperty('title');
    console.log('Demo info response:', infoData);

    // Test stats endpoint
    const statsResponse = await request.get(`${PRODUCTION_BACKEND}/api/public/demo/stats`);
    expect(statsResponse.ok()).toBeTruthy();
    
    const statsData = await statsResponse.json();
    expect(statsData).toHaveProperty('totalUsers');
    expect(typeof statsData.totalUsers).toBe('number');
    console.log('Stats response:', statsData);

    // Test success patterns endpoint
    const patternsResponse = await request.get(`${PRODUCTION_BACKEND}/api/public/demo/success-patterns`);
    expect(patternsResponse.ok()).toBeTruthy();
    
    const patternsData = await patternsResponse.json();
    expect(Array.isArray(patternsData.patterns)).toBeTruthy();
    console.log('Success patterns count:', patternsData.patterns.length);
  });

  test('should test hope experience generation API in production', async ({ page, request }) => {
    const hopePayload = {
      userType: 'student',
      targetRole: 'ソフトウェアエンジニア',
      experience: 2,
      stress: 'medium',
      goals: ['年収400万円以上', 'リモートワーク']
    };

    const hopeResponse = await request.post(`${PRODUCTION_BACKEND}/api/public/demo/hope-experience`, {
      data: hopePayload
    });

    expect(hopeResponse.ok()).toBeTruthy();
    
    const hopeData = await hopeResponse.json();
    expect(hopeData).toHaveProperty('experience');
    expect(hopeData).toHaveProperty('probability');
    expect(hopeData).toHaveProperty('evidence');
    
    console.log('Hope experience generated:', {
      probability: hopeData.probability,
      experienceLength: hopeData.experience?.length || 0
    });
  });

  test('should test prompt generation API in production', async ({ page, request }) => {
    const promptPayload = {
      userType: 'student',
      targetRole: 'ソフトウェアエンジニア',
      experience: 2
    };

    const promptResponse = await request.post(`${PRODUCTION_BACKEND}/api/public/demo/prompt`, {
      data: promptPayload
    });

    expect(promptResponse.ok()).toBeTruthy();
    
    const promptData = await promptResponse.json();
    expect(promptData).toHaveProperty('prompt');
    expect(typeof promptData.prompt).toBe('string');
    expect(promptData.prompt.length).toBeGreaterThan(100);
    
    console.log('Prompt generated length:', promptData.prompt.length);
  });

  test('should handle CORS correctly in production', async ({ page, request }) => {
    const response = await request.get(`${PRODUCTION_BACKEND}/api/public/demo/info`);
    
    const headers = response.headers();
    expect(headers['access-control-allow-origin']).toBeDefined();
    expect(headers['access-control-allow-methods']).toBeDefined();
    
    console.log('CORS headers:', {
      origin: headers['access-control-allow-origin'],
      methods: headers['access-control-allow-methods']
    });
  });

  test('should test authentication endpoints in production', async ({ page, request }) => {
    const timestamp = Date.now();
    const testUser = {
      email: `prod-test-${timestamp}@example.com`,
      password: 'ProductionTest123!',
      profile: {
        name: '本番テスト太郎',
        current_role: '学生',
        experience_years: 0,
        target_role: 'ソフトウェアエンジニア',
        target_industry: 'IT・技術',
        skills: ['JavaScript', 'React'],
        education: '大学在学中'
      }
    };

    // Test user registration
    const registerResponse = await request.post(`${PRODUCTION_BACKEND}/auth/register`, {
      data: testUser
    });

    expect(registerResponse.ok()).toBeTruthy();
    
    const registerData = await registerResponse.json();
    expect(registerData.success).toBeTruthy();
    expect(registerData.data.user.email).toBe(testUser.email);
    expect(registerData.data.token).toBeDefined();
    
    console.log('User registered successfully in production');

    // Test user login
    const loginResponse = await request.post(`${PRODUCTION_BACKEND}/auth/login`, {
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
    
    console.log('User login successful in production');

    // Test token validation
    const token = loginData.data.token;
    const validateResponse = await request.get(`${PRODUCTION_BACKEND}/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    expect(validateResponse.ok()).toBeTruthy();
    
    const validateData = await validateResponse.json();
    expect(validateData.success).toBeTruthy();
    expect(validateData.data.user.email).toBe(testUser.email);
    
    console.log('Token validation successful in production');
  });

  test('should test API error handling in production', async ({ page, request }) => {
    // Test invalid endpoint
    const invalidResponse = await request.get(`${PRODUCTION_BACKEND}/api/invalid/endpoint`);
    expect(invalidResponse.status()).toBe(404);

    // Test invalid hope experience payload
    const invalidHopeResponse = await request.post(`${PRODUCTION_BACKEND}/api/public/demo/hope-experience`, {
      data: { invalid: 'data' }
    });
    
    // Should handle gracefully
    expect([200, 400, 422].includes(invalidHopeResponse.status())).toBeTruthy();

    // Test invalid login
    const invalidLoginResponse = await request.post(`${PRODUCTION_BACKEND}/auth/login`, {
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

  test('should test API performance in production', async ({ page, request }) => {
    const performanceTests = [
      { name: 'Demo Info', endpoint: `/api/public/demo/info` },
      { name: 'Stats', endpoint: `/api/public/demo/stats` },
      { name: 'Success Patterns', endpoint: `/api/public/demo/success-patterns` }
    ];

    for (const test of performanceTests) {
      const startTime = Date.now();
      
      const response = await request.get(`${PRODUCTION_BACKEND}${test.endpoint}`);
      
      const responseTime = Date.now() - startTime;
      
      expect(response.ok()).toBeTruthy();
      expect(responseTime).toBeLessThan(5000); // 5 second max response time
      
      console.log(`${test.name} API response time: ${responseTime}ms`);
    }
  });

  test('should test integrated frontend-backend communication', async ({ page }) => {
    // Navigate through the app and trigger API calls
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Complete onboarding
    const primaryCTA = page.getByText('無料で希望体験を始める').first();
    await primaryCTA.click();
    
    await page.getByPlaceholder('例: 田中 太郎').fill('統合テスト太郎');
    await page.getByText('次へ').click();
    await page.getByText('大学生・大学院生').click();
    await page.getByText('次へ').click();
    await page.locator('input[type="range"]').fill('3');
    await page.getByText('次へ').click();
    await page.getByPlaceholder('例: ソフトウェアエンジニア').fill('フルスタックエンジニア');
    await page.getByText('次へ').click();
    await page.getByText('😐 普通').click();
    await page.getByText('次へ').click();
    await page.getByText('年収400万円以上').click();
    await page.getByText('リモートワーク').click();
    await page.getByText('次へ').click();
    await page.getByText('はじめる').click();

    // Access main app and test API integration
    await page.getByText('アプリを使う').click();
    
    // Test hope experience generation through UI
    await page.getByText('希望体験を生成').click();
    await expect(page.getByText(/3ヶ月後のあなた/)).toBeVisible({ timeout: 20000 });
    
    // Test success pattern analysis
    await page.getByText('成功パターン分析').click();
    await expect(page.getByText(/あなたと似た背景/)).toBeVisible({ timeout: 20000 });
    
    // Test prompt generation
    await page.getByText('プロンプト生成').click();
    await expect(page.getByText(/以下の情報をもとに/)).toBeVisible({ timeout: 20000 });
    
    console.log('Integrated frontend-backend communication successful');
  });
});
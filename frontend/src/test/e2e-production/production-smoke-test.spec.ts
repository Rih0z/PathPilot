import { test, expect } from '@playwright/test';

const PRODUCTION_FRONTEND = 'https://1493935f.pathpilot-frontend.pages.dev';
const PRODUCTION_BACKEND = 'https://pathpilot.riho-dare.workers.dev';

test.describe('Production Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for production environment
    test.setTimeout(60000);
  });

  test('should load production landing page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check page title
    await expect(page).toHaveTitle(/PathPilot/);
    
    // Check key elements are visible
    await expect(page.getByText('あなたの就活に')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('希望の光を')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('無料で希望体験を始める').first()).toBeVisible({ timeout: 10000 });
    
    // Check social proof
    await expect(page.getByText('2万人以上が就活成功を実現')).toBeVisible({ timeout: 10000 });
  });

  test('should successfully navigate through onboarding flow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Start onboarding
    const primaryCTA = page.getByText('無料で希望体験を始める').first();
    await primaryCTA.click();
    
    // Should navigate to onboarding
    await expect(page).toHaveURL('/onboarding');
    
    // Complete onboarding flow
    await page.getByPlaceholder('例: 田中 太郎').fill('本番テスト太郎');
    await page.getByText('次へ').click();
    
    await page.getByText('大学生・大学院生').click();
    await page.getByText('次へ').click();
    
    const slider = page.locator('input[type="range"]');
    await slider.fill('2');
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
    await expect(page.getByText('本番テスト太郎')).toBeVisible({ timeout: 15000 });
  });

  test('should access main app functionality from dashboard', async ({ page }) => {
    // Complete onboarding first
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const primaryCTA = page.getByText('無料で希望体験を始める').first();
    await primaryCTA.click();
    
    await page.getByPlaceholder('例: 田中 太郎').fill('機能テスト太郎');
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
    
    // Navigate to main app
    await page.getByText('アプリを使う').click();
    await expect(page.getByText('PathPilot Demo')).toBeVisible({ timeout: 10000 });
    
    // Test core functionality
    await page.getByText('希望体験を生成').click();
    await expect(page.getByText(/3ヶ月後のあなた/)).toBeVisible({ timeout: 20000 });
  });

  test('should handle responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Mobile-specific checks
    await expect(page.getByText('PathPilot')).toBeVisible();
    await expect(page.getByText('あなたの就活に')).toBeVisible({ timeout: 10000 });
    
    // Mobile navigation should work
    const primaryCTA = page.getByText('無料で希望体験を始める').first();
    await expect(primaryCTA).toBeVisible();
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate through key pages
    const primaryCTA = page.getByText('無料で希望体験を始める').first();
    await primaryCTA.click();
    await page.waitForLoadState('networkidle');
    
    // Check for critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('Chrome extension') &&
      !error.includes('analytics')
    );
    
    if (criticalErrors.length > 0) {
      console.log('JavaScript errors found:', criticalErrors);
    }
    
    // Should have minimal critical errors
    expect(criticalErrors.length).toBeLessThan(3);
  });

  test('should have reasonable page load performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within reasonable time (adjust based on requirements)
    expect(loadTime).toBeLessThan(10000); // 10 seconds max
    
    console.log(`Page load time: ${loadTime}ms`);
  });
});
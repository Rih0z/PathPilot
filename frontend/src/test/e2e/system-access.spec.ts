import { test, expect } from '@playwright/test';

const API_BASE = 'https://pathpilot.riho-dare.workers.dev';

test.describe('System Access E2E Tests', () => {
  
  test.describe('Core System Access', () => {
    test('should access all main system functions without authentication', async ({ page }) => {
      // Start from landing page
      await page.goto('/');
      await expect(page.getByText('PathPilot')).toBeVisible();
      
      // Complete full onboarding flow
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      await expect(page).toHaveURL('/onboarding');
      
      await page.getByPlaceholder('例: 田中 太郎').fill('システムテスト太郎');
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
      
      // Verify dashboard access
      await expect(page).toHaveURL('/dashboard');
      await expect(page.getByText('システムテスト太郎')).toBeVisible();
      
      // Test main app access
      await page.getByText('アプリを使う').click();
      await expect(page.getByText('PathPilot Demo')).toBeVisible();
      
      // Test all core functions
      await page.getByText('希望体験を生成').click();
      await expect(page.getByText(/3ヶ月後のあなた/)).toBeVisible({ timeout: 15000 });
      
      await page.getByText('成功パターン分析').click();
      await expect(page.getByText(/あなたと似た背景/)).toBeVisible({ timeout: 15000 });
      
      await page.getByText('プロンプト生成').click();
      await expect(page.getByText(/以下の情報をもとに/)).toBeVisible({ timeout: 15000 });
      
      // Test data import access
      await page.getByText('データインポート').click();
      await expect(page.getByText('AI用プロンプト生成')).toBeVisible();
      
      // Test dashboard access again
      await page.getByText('ダッシュボード').click();
      await expect(page.getByText('システムテスト太郎')).toBeVisible();
    });

    test('should maintain consistent navigation across all sections', async ({ page }) => {
      // Complete onboarding
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('ナビテスト太郎');
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

      // Test navigation consistency
      const sections = ['アプリを使う', 'データインポート', 'ダッシュボード'];
      
      for (const section of sections) {
        await page.getByText(section).click();
        
        // Verify PathPilot header is always visible
        await expect(page.getByText('PathPilot')).toBeVisible();
        
        // Verify navigation menu is accessible
        for (const otherSection of sections) {
          await expect(page.getByText(otherSection)).toBeVisible();
        }
        
        // Verify user name is maintained
        await expect(page.getByText('ナビテスト太郎')).toBeVisible();
      }
    });

    test('should handle concurrent API calls correctly', async ({ page }) => {
      // Complete onboarding
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('並行テスト太郎');
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

      await page.getByText('アプリを使う').click();
      
      // Trigger multiple API calls quickly
      await Promise.all([
        page.getByText('希望体験を生成').click(),
        page.waitForTimeout(100),
        page.getByText('成功パターン分析').click(),
        page.waitForTimeout(100),
        page.getByText('プロンプト生成').click()
      ]);
      
      // All should complete successfully
      await expect(page.getByText(/3ヶ月後のあなた/)).toBeVisible({ timeout: 20000 });
      await expect(page.getByText(/成功パターン/)).toBeVisible({ timeout: 20000 });
      await expect(page.getByText(/以下の情報をもとに/)).toBeVisible({ timeout: 20000 });
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle network interruption gracefully', async ({ page }) => {
      // Complete onboarding
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('ネットワークテスト太郎');
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

      await page.getByText('アプリを使う').click();
      
      // Simulate network failure
      await page.route('**/api/public/demo/**', route => route.abort());
      
      await page.getByText('希望体験を生成').click();
      
      // Should handle error gracefully (not crash)
      // The exact error handling depends on implementation
      await page.waitForTimeout(3000);
      
      // Clear route interception
      await page.unroute('**/api/public/demo/**');
      
      // Should be able to retry
      await page.getByText('希望体験を生成').click();
      await expect(page.getByText(/3ヶ月後のあなた/)).toBeVisible({ timeout: 15000 });
    });

    test('should handle API server errors correctly', async ({ page }) => {
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('エラーテスト太郎');
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

      await page.getByText('アプリを使う').click();
      
      // Simulate server error
      await page.route('**/api/public/demo/**', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' })
        });
      });
      
      await page.getByText('希望体験を生成').click();
      
      // Should handle 500 error gracefully
      await page.waitForTimeout(3000);
      
      // Clear route interception
      await page.unroute('**/api/public/demo/**');
    });

    test('should handle incomplete onboarding data', async ({ page }) => {
      await page.goto('/dashboard');
      
      // Should handle direct access to dashboard
      // Behavior depends on implementation (redirect to onboarding or show empty state)
      await expect(page.getByText('PathPilot')).toBeVisible();
    });

    test('should handle browser back/forward navigation', async ({ page }) => {
      // Start from landing
      await page.goto('/');
      
      // Go through onboarding
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('ナビゲーションテスト太郎');
      await page.getByText('次へ').click();
      
      // Use browser back
      await page.goBack();
      await expect(page.getByText('1 / 7')).toBeVisible();
      
      // Use browser forward
      await page.goForward();
      await expect(page.getByText('2 / 7')).toBeVisible();
      
      // Continue to complete onboarding
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
      
      // Navigate to different sections
      await page.getByText('アプリを使う').click();
      await page.getByText('データインポート').click();
      
      // Test browser back navigation
      await page.goBack();
      await expect(page.getByText('PathPilot Demo')).toBeVisible();
      
      await page.goBack();
      await expect(page.getByText('ナビゲーションテスト太郎')).toBeVisible();
    });
  });

  test.describe('Performance and Load Tests', () => {
    test('should handle rapid user interactions', async ({ page }) => {
      // Complete onboarding quickly
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('パフォーマンステスト太郎');
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

      // Rapid navigation between sections
      for (let i = 0; i < 5; i++) {
        await page.getByText('アプリを使う').click();
        await page.waitForTimeout(100);
        await page.getByText('データインポート').click();
        await page.waitForTimeout(100);
        await page.getByText('ダッシュボード').click();
        await page.waitForTimeout(100);
      }
      
      // Should still be functional
      await expect(page.getByText('パフォーマンステスト太郎')).toBeVisible();
    });

    test('should maintain responsiveness during API calls', async ({ page }) => {
      await page.goto('/');
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('レスポンシブテスト太郎');
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

      await page.getByText('アプリを使う').click();
      
      // Start API call
      await page.getByText('希望体験を生成').click();
      
      // UI should remain responsive during API call
      await page.getByText('データインポート').click();
      await expect(page.getByText('AI用プロンプト生成')).toBeVisible();
      
      await page.getByText('ダッシュボード').click();
      await expect(page.getByText('レスポンシブテスト太郎')).toBeVisible();
    });
  });

  test.describe('Cross-browser Compatibility', () => {
    test('should work consistently across different viewport sizes', async ({ page }) => {
      // Test desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await expect(page.getByText('PathPilot')).toBeVisible();
      
      // Test tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.getByText('PathPilot')).toBeVisible();
      
      // Test mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.getByText('PathPilot')).toBeVisible();
      
      // Complete onboarding on mobile
      const primaryCTA = page.getByText('無料で希望体験を始める').first();
      await primaryCTA.click();
      
      await page.getByPlaceholder('例: 田中 太郎').fill('モバイルテスト太郎');
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
      
      // Should reach dashboard on mobile
      await expect(page).toHaveURL('/dashboard');
      await expect(page.getByText('モバイルテスト太郎')).toBeVisible();
    });
  });
});
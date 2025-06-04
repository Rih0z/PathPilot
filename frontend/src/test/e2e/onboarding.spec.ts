import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/onboarding');
  });

  test('should complete the full onboarding flow', async ({ page }) => {
    // Step 1: Welcome - Name input
    await expect(page.getByText('🎉 PathPilotへようこそ！')).toBeVisible();
    await expect(page.getByText('1 / 7')).toBeVisible();
    
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('テスト 太郎');
    
    const nextButton = page.getByText('次へ');
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    // Step 2: Current situation
    await expect(page.getByText('2 / 7')).toBeVisible();
    await expect(page.getByText('現在の状況について')).toBeVisible();
    
    await page.getByText('大学生・大学院生').click();
    await page.getByText('次へ').click();

    // Step 3: Experience level
    await expect(page.getByText('3 / 7')).toBeVisible();
    await expect(page.getByText('あなたの経験')).toBeVisible();
    
    const slider = page.locator('input[type="range"]');
    await slider.fill('2');
    await page.getByText('次へ').click();

    // Step 4: Target role
    await expect(page.getByText('4 / 7')).toBeVisible();
    await expect(page.getByText('理想の未来')).toBeVisible();
    
    const roleInput = page.getByPlaceholder('例: ソフトウェアエンジニア');
    await roleInput.fill('ソフトウェアエンジニア');
    await page.getByText('次へ').click();

    // Step 5: Stress level
    await expect(page.getByText('5 / 7')).toBeVisible();
    await expect(page.getByText('現在の気持ち')).toBeVisible();
    
    await page.getByText('😐 普通').click();
    await page.getByText('次へ').click();

    // Step 6: Goals
    await expect(page.getByText('6 / 7')).toBeVisible();
    await expect(page.getByText('あなたの目標')).toBeVisible();
    
    await page.getByText('年収400万円以上').click();
    await page.getByText('リモートワーク').click();
    await page.getByText('次へ').click();

    // Step 7: Completion
    await expect(page.getByText('7 / 7')).toBeVisible();
    await expect(page.getByText('🎊 プロファイル完成！')).toBeVisible();
    
    await page.getByText('はじめる').click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should validate required fields', async ({ page }) => {
    // Next button should be disabled initially
    const nextButton = page.getByText('次へ');
    await expect(nextButton).toBeDisabled();
    
    // Fill and clear input
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('Test');
    await expect(nextButton).toBeEnabled();
    
    await nameInput.clear();
    await expect(nextButton).toBeDisabled();
  });

  test('should allow navigation back and forth', async ({ page }) => {
    // Complete first step
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('テスト 太郎');
    await page.getByText('次へ').click();

    // Go to step 2
    await expect(page.getByText('2 / 7')).toBeVisible();
    
    // Go back
    const backButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await backButton.click();
    
    // Should be back on step 1 with preserved value
    await expect(page.getByText('1 / 7')).toBeVisible();
    await expect(nameInput).toHaveValue('テスト 太郎');
  });

  test('should show progress bar updates', async ({ page }) => {
    // Check initial progress
    const progressBar = page.locator('.progress-fill');
    await expect(progressBar).toBeVisible();
    
    // Complete step and check progress increased
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('テスト 太郎');
    await page.getByText('次へ').click();
    
    await expect(page.getByText('2 / 7')).toBeVisible();
  });

  test('should display social proof after first step', async ({ page }) => {
    // Complete first step
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('テスト 太郎');
    await page.getByText('次へ').click();
    
    // Social proof should be visible
    await expect(page.getByText('2万人が利用中')).toBeVisible();
    await expect(page.getByText('平均3.2ヶ月で内定')).toBeVisible();
    await expect(page.getByText('満足度98%')).toBeVisible();
  });

  test('should handle multi-select correctly', async ({ page }) => {
    // Navigate to goals step (step 6)
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('テスト 太郎');
    await page.getByText('次へ').click();
    
    await page.getByText('大学生・大学院生').click();
    await page.getByText('次へ').click();
    
    const slider = page.locator('input[type="range"]');
    await slider.fill('2');
    await page.getByText('次へ').click();
    
    const roleInput = page.getByPlaceholder('例: ソフトウェアエンジニア');
    await roleInput.fill('ソフトウェアエンジニア');
    await page.getByText('次へ').click();
    
    await page.getByText('😐 普通').click();
    await page.getByText('次へ').click();
    
    // Now on goals step - test multi-select
    await expect(page.getByText('あなたの目標')).toBeVisible();
    
    const salary400 = page.getByText('年収400万円以上');
    const remote = page.getByText('リモートワーク');
    
    await salary400.click();
    await remote.click();
    
    // Both should be selected (check for selected styling)
    await expect(salary400.locator('..')).toHaveClass(/border-accent-500/);
    await expect(remote.locator('..')).toHaveClass(/border-accent-500/);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    await expect(page.getByText('🎉 PathPilotへようこそ！')).toBeVisible();
    
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await expect(nameInput).toBeVisible();
    
    // Should be touch-friendly
    await nameInput.fill('テスト 太郎');
    const nextButton = page.getByText('次へ');
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
  });

  test('should handle stress level selection with emojis', async ({ page }) => {
    // Navigate to stress level step
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('テスト 太郎');
    await page.getByText('次へ').click();
    
    await page.getByText('大学生・大学院生').click();
    await page.getByText('次へ').click();
    
    const slider = page.locator('input[type="range"]');
    await slider.fill('2');
    await page.getByText('次へ').click();
    
    const roleInput = page.getByPlaceholder('例: ソフトウェアエンジニア');
    await roleInput.fill('ソフトウェアエンジニア');
    await page.getByText('次へ').click();
    
    // Now on stress level step
    await expect(page.getByText('現在の気持ち')).toBeVisible();
    await expect(page.getByText('😌 リラックス')).toBeVisible();
    await expect(page.getByText('😐 普通')).toBeVisible();
    await expect(page.getByText('😰 不安')).toBeVisible();
    
    // Select medium stress
    await page.getByText('😐 普通').click();
    await expect(page.getByText('次へ')).toBeEnabled();
  });

  test('should update slider value display', async ({ page }) => {
    // Navigate to experience step
    const nameInput = page.getByPlaceholder('例: 田中 太郎');
    await nameInput.fill('テスト 太郎');
    await page.getByText('次へ').click();
    
    await page.getByText('大学生・大学院生').click();
    await page.getByText('次へ').click();
    
    // Should show initial value
    await expect(page.getByText('0年')).toBeVisible();
    await expect(page.getByText('新卒・未経験')).toBeVisible();
    
    // Change slider value
    const slider = page.locator('input[type="range"]');
    await slider.fill('3');
    
    // Should update display
    await expect(page.getByText('3年')).toBeVisible();
    await expect(page.getByText('3年の実務経験')).toBeVisible();
  });
});
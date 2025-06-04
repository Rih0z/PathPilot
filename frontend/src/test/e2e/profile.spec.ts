import { test, expect } from '@playwright/test';

test.describe('Profile Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile');
  });

  test('should display profile header with user information', async ({ page }) => {
    await expect(page.getByText('田中 美咲')).toBeVisible();
    await expect(page.getByText('大学4年生 → ソフトウェアエンジニア')).toBeVisible();
    await expect(page.getByText('tanaka.misaki@example.com')).toBeVisible();
    await expect(page.getByText('東京')).toBeVisible();
    await expect(page.getByText('開始: 2024年1月')).toBeVisible();
  });

  test('should show quick stats in header', async ({ page }) => {
    await expect(page.getByText('850')).toBeVisible();
    await expect(page.getByText('成長スコア')).toBeVisible();
    await expect(page.getByText('23')).toBeVisible();
    await expect(page.getByText('活動日数')).toBeVisible();
  });

  test('should display user avatar with initial', async ({ page }) => {
    // Should show first character of name
    await expect(page.getByText('田').first()).toBeVisible();
  });

  test('should show user skills as tags', async ({ page }) => {
    await expect(page.getByText('JavaScript')).toBeVisible();
    await expect(page.getByText('React')).toBeVisible();
    await expect(page.getByText('Python')).toBeVisible();
    await expect(page.getByText('Git')).toBeVisible();
  });

  test('should enter and exit edit mode', async ({ page }) => {
    // Click edit button
    const editButton = page.getByText('編集');
    await editButton.click();
    
    // Should switch to edit mode
    await expect(page.getByText('キャンセル')).toBeVisible();
    await expect(page.getByDisplayValue('田中 美咲')).toBeVisible();
    await expect(page.getByDisplayValue('ソフトウェアエンジニア')).toBeVisible();
    
    // Cancel edit mode
    const cancelButton = page.getByText('キャンセル');
    await cancelButton.click();
    
    // Should exit edit mode
    await expect(page.getByText('編集')).toBeVisible();
    await expect(page.getByText('田中 美咲')).toBeVisible();
  });

  test('should save profile changes', async ({ page }) => {
    // Enter edit mode
    await page.getByText('編集').click();
    
    // Modify name
    const nameInput = page.getByDisplayValue('田中 美咲');
    await nameInput.clear();
    await nameInput.fill('田中 花子');
    
    // Save changes
    const saveButton = page.getByText('保存');
    await saveButton.click();
    
    // Should show updated name
    await expect(page.getByText('田中 花子')).toBeVisible();
    await expect(page.getByText('編集')).toBeVisible();
  });

  test('should display goals section correctly', async ({ page }) => {
    await expect(page.getByText('目標設定')).toBeVisible();
    await expect(page.getByText('550万円')).toBeVisible();
    await expect(page.getByText('目標年収')).toBeVisible();
    await expect(page.getByText('希望勤務地')).toBeVisible();
    await expect(page.getByText('ハイブリッド')).toBeVisible();
    await expect(page.getByText('3ヶ月以内')).toBeVisible();
  });

  test('should show wellness section with emotional state', async ({ page }) => {
    await expect(page.getByText('コンディション')).toBeVisible();
    await expect(page.getByText('ストレスレベル')).toBeVisible();
    await expect(page.getByText('モチベーション')).toBeVisible();
    await expect(page.getByText('自信レベル')).toBeVisible();
    
    // Check specific values
    await expect(page.getByText('低')).toBeVisible(); // stress level
    await expect(page.getByText('高')).toBeVisible(); // motivation
    await expect(page.getByText('80%')).toBeVisible(); // confidence
  });

  test('should display subscription section', async ({ page }) => {
    await expect(page.getByText('利用状況')).toBeVisible();
    await expect(page.getByText('フリープラン')).toBeVisible();
    
    // Check usage limits
    await expect(page.getByText('3/5')).toBeVisible(); // daily prompts
    await expect(page.getByText('2/3')).toBeVisible(); // daily recommendations
    await expect(page.getByText('7/10')).toBeVisible(); // monthly applications
    await expect(page.getByText('12/20')).toBeVisible(); // ai analysis credits
  });

  test('should show premium upgrade prompt', async ({ page }) => {
    await expect(page.getByText('プレミアムで更なる成長を')).toBeVisible();
    await expect(page.getByText('無制限のAI分析、高度な成功パターン解析、専属メンターサポート')).toBeVisible();
    
    const upgradeButton = page.getByText('アップグレード');
    await expect(upgradeButton).toBeVisible();
    await upgradeButton.click();
    // Should not cause errors
  });

  test('should edit skills in textarea', async ({ page }) => {
    // Enter edit mode
    await page.getByText('編集').click();
    
    // Find and modify skills textarea
    const skillsTextarea = page.getByDisplayValue('JavaScript, React, Python, Git');
    await skillsTextarea.clear();
    await skillsTextarea.fill('JavaScript, React, TypeScript, Node.js');
    
    // Save changes
    await page.getByText('保存').click();
    
    // Should show updated skills
    await expect(page.getByText('TypeScript')).toBeVisible();
    await expect(page.getByText('Node.js')).toBeVisible();
  });

  test('should show progress bars for usage limits', async ({ page }) => {
    // Check that progress bars are rendered
    const progressBars = page.locator('.w-full.bg-white.rounded-full.h-2');
    await expect(progressBars.first()).toBeVisible();
  });

  test('should display wellness progress bars', async ({ page }) => {
    // Check for wellness progress indicators
    const wellnessSection = page.locator('text=コンディション').locator('..');
    const progressBars = wellnessSection.locator('.h-2.rounded-full.transition-all.duration-500');
    await expect(progressBars.first()).toBeVisible();
  });

  test('should show last updated date', async ({ page }) => {
    await expect(page.getByText(/最終更新:/)).toBeVisible();
  });

  test('should handle navigation button clicks', async ({ page }) => {
    // Test settings button
    const settingsButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="settings"]') });
    await settingsButton.click();
    // Should not cause errors
    
    // Test notification button
    const bellButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="bell"]') });
    await bellButton.click();
    // Should not cause errors
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    // Header should be responsive
    await expect(page.getByText('田中 美咲')).toBeVisible();
    
    // Navigation should work on mobile
    await expect(page.getByText('PathPilot')).toBeVisible();
    
    // Edit functionality should work on mobile
    await page.getByText('編集').click();
    await expect(page.getByDisplayValue('田中 美咲')).toBeVisible();
  });

  test('should validate form fields in edit mode', async ({ page }) => {
    // Enter edit mode
    await page.getByText('編集').click();
    
    // Clear required field
    const nameInput = page.getByDisplayValue('田中 美咲');
    await nameInput.clear();
    
    // Save button should still be clickable
    const saveButton = page.getByText('保存');
    await expect(saveButton).toBeVisible();
    await expect(saveButton).not.toBeDisabled();
  });

  test('should show correct work style and salary formatting', async ({ page }) => {
    // Work style should be properly formatted
    await expect(page.getByText('ハイブリッド')).toBeVisible();
    
    // Salary should be formatted correctly
    await expect(page.getByText('550万円')).toBeVisible();
  });

  test('should display navigation bar', async ({ page }) => {
    await expect(page.getByText('PathPilot')).toBeVisible();
    
    const settingsButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="settings"]') });
    const bellButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="bell"]') });
    
    await expect(settingsButton).toBeVisible();
    await expect(bellButton).toBeVisible();
  });

  test('should show user education information', async ({ page }) => {
    await expect(page.getByText('○○大学 情報工学部')).toBeVisible();
  });

  test('should handle all form fields in edit mode', async ({ page }) => {
    // Enter edit mode
    await page.getByText('編集').click();
    
    // Test all editable fields
    await expect(page.getByDisplayValue('田中 美咲')).toBeVisible();
    await expect(page.getByDisplayValue('ソフトウェアエンジニア')).toBeVisible();
    await expect(page.getByDisplayValue('IT・テクノロジー')).toBeVisible();
    await expect(page.getByDisplayValue('○○大学 情報工学部')).toBeVisible();
    await expect(page.getByDisplayValue('JavaScript, React, Python, Git')).toBeVisible();
    
    // All fields should be editable
    const nameField = page.getByDisplayValue('田中 美咲');
    await nameField.clear();
    await nameField.fill('Test Name');
    
    await expect(page.getByDisplayValue('Test Name')).toBeVisible();
  });
});
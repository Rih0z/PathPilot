import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display dashboard header with user information', async ({ page }) => {
    await expect(page.getByText(/こんにちは、田中 美咲さん/)).toBeVisible();
    await expect(page.getByText(/今日も一歩ずつ|あなたの努力は|新しい可能性が|今日が人生を変える日/)).toBeVisible();
  });

  test('should show navigation bar with all elements', async ({ page }) => {
    await expect(page.getByText('PathPilot')).toBeVisible();
    
    // Check for navigation buttons
    const refreshButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="refresh-cw"]') });
    const bellButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="bell"]') });
    const userButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="user"]') });
    
    await expect(refreshButton).toBeVisible();
    await expect(bellButton).toBeVisible();
    await expect(userButton).toBeVisible();
  });

  test('should display user condition percentage', async ({ page }) => {
    await expect(page.getByText('40%')).toBeVisible();
    await expect(page.getByText('コンディション')).toBeVisible();
  });

  test('should show quick stats cards', async ({ page }) => {
    await expect(page.getByText('目標達成率')).toBeVisible();
    await expect(page.getByText('76%')).toBeVisible();
    
    await expect(page.getByText('活動日数')).toBeVisible();
    await expect(page.getByText('23日')).toBeVisible();
    
    await expect(page.getByText('成長スコア')).toBeVisible();
    await expect(page.getByText('850')).toBeVisible();
    
    await expect(page.getByText('モチベーション')).toBeVisible();
    await expect(page.getByText('中')).toBeVisible();
  });

  test('should display hope experience card', async ({ page }) => {
    await expect(page.getByText('あなたの希望体験')).toBeVisible();
    await expect(page.getByText('3ヶ月後のあなた')).toBeVisible();
    await expect(page.getByText(/3ヶ月後、某大手IT企業から年収550万円の内定を獲得し/)).toBeVisible();
  });

  test('should show success probability and similarity stats', async ({ page }) => {
    await expect(page.getByText('成功確率')).toBeVisible();
    await expect(page.getByText('85%').first()).toBeVisible();
    
    await expect(page.getByText('類似成功例')).toBeVisible();
    await expect(page.getByText('92%')).toBeVisible();
    await expect(page.getByText('あなたとの類似度')).toBeVisible();
  });

  test('should expand hope experience details', async ({ page }) => {
    // Find and click the more options button
    const moreButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="more-vertical"]') });
    await moreButton.click();
    
    // Should show expanded content
    await expect(page.getByText('詳細な根拠データ')).toBeVisible();
    await expect(page.getByText('類似点:')).toBeVisible();
    await expect(page.getByText('同じ情報工学部出身')).toBeVisible();
    await expect(page.getByText('JavaScriptとReactのスキル保有')).toBeVisible();
  });

  test('should display next action card', async ({ page }) => {
    await expect(page.getByText('今日のアクション')).toBeVisible();
    await expect(page.getByText('高優先度')).toBeVisible();
    await expect(page.getByText('GitHubプロフィールの充実とポートフォリオリポジトリの整理')).toBeVisible();
    
    await expect(page.getByText('所要時間: 2時間')).toBeVisible();
    await expect(page.getByText(/期待効果: 技術力の証明と採用担当者への印象向上/)).toBeVisible();
  });

  test('should handle action completion', async ({ page }) => {
    // Find the action checkbox/button
    const checkboxButton = page.locator('button').filter({ hasText: '' }).first(); // Empty text button (checkbox)
    await checkboxButton.click();
    
    // Should show completion message
    await expect(page.getByText('素晴らしい！次のアクションが準備されました')).toBeVisible();
    
    // Action description should be struck through
    const actionDescription = page.getByText('GitHubプロフィールの充実とポートフォリオリポジトリの整理');
    await expect(actionDescription).toHaveClass(/line-through/);
  });

  test('should handle refresh button functionality', async ({ page }) => {
    const refreshButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="refresh-cw"]') });
    
    // Click refresh
    await refreshButton.click();
    
    // Should show loading state (spinner animation)
    const refreshIcon = refreshButton.locator('svg');
    await expect(refreshIcon).toHaveClass(/animate-spin/);
    
    // Wait for loading to finish (timeout to avoid indefinite wait)
    await page.waitForTimeout(2500); // 2.5 seconds
    
    // Should not be spinning anymore
    await expect(refreshIcon).not.toHaveClass(/animate-spin/);
  });

  test('should display detailed success path button', async ({ page }) => {
    const detailButton = page.getByText('詳細な成功パスを確認');
    await expect(detailButton).toBeVisible();
    
    // Button should be full width
    await expect(detailButton).toHaveClass(/w-full/);
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    // Header should be visible
    await expect(page.getByText(/こんにちは、田中 美咲さん/)).toBeVisible();
    
    // Navigation should be responsive
    await expect(page.getByText('PathPilot')).toBeVisible();
    
    // Stats cards should stack on mobile
    await expect(page.getByText('目標達成率')).toBeVisible();
    await expect(page.getByText('活動日数')).toBeVisible();
  });

  test('should show correct priority styling for actions', async ({ page }) => {
    const priorityBadge = page.getByText('高優先度');
    await expect(priorityBadge).toBeVisible();
    
    // Should have red styling for high priority
    await expect(priorityBadge).toHaveClass(/border-red-200/);
    await expect(priorityBadge).toHaveClass(/bg-red-50/);
    await expect(priorityBadge).toHaveClass(/text-red-700/);
  });

  test('should display stats with correct change indicators', async ({ page }) => {
    await expect(page.getByText('+12%')).toBeVisible(); // goal achievement change
    await expect(page.getByText('継続中')).toBeVisible(); // activity days
    await expect(page.getByText('+45')).toBeVisible(); // growth score change
    await expect(page.getByText('安定')).toBeVisible(); // motivation change
  });

  test('should handle navigation button clicks', async ({ page }) => {
    // Test bell notification button
    const bellButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="bell"]') });
    await bellButton.click();
    // Should not cause errors
    
    // Test user profile button
    const userButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="user"]') });
    await userButton.click();
    // Should not cause errors
  });

  test('should display time-based greeting correctly', async ({ page }) => {
    // Should show appropriate greeting based on current time
    // Note: This test might vary based on when it's run
    const greetingPattern = /おはようございます|こんにちは|こんばんは/;
    await expect(page.locator('text=' + greetingPattern.source)).toBeVisible();
  });

  test('should show evidence preview in expanded section', async ({ page }) => {
    // Expand hope experience details
    const moreButton = page.locator('button').filter({ has: page.locator('svg[data-lucide="more-vertical"]') });
    await moreButton.click();
    
    // Should show evidence text
    await expect(page.getByText(/127人中108人が目標達成/)).toBeVisible();
  });

  test('should have responsive grid layout for stats', async ({ page }) => {
    // Desktop: should have 4 columns
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const statsContainer = page.locator('.grid').filter({ hasText: '目標達成率' });
    await expect(statsContainer).toHaveClass(/grid-cols-2/);
    await expect(statsContainer).toHaveClass(/lg:grid-cols-4/);
    
    // Mobile: should stack in 2 columns
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(statsContainer).toHaveClass(/grid-cols-2/);
  });
});
import { test, expect } from '@playwright/test';

test.describe('Landing Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with main headline', async ({ page }) => {
    await expect(page.getByText('あなたの就活に')).toBeVisible();
    await expect(page.getByText('希望の光を')).toBeVisible();
  });

  test('should show social proof elements', async ({ page }) => {
    await expect(page.getByText('2万人以上が就活成功を実現')).toBeVisible();
    await expect(page.getByText('2万人が利用中')).toBeVisible();
    await expect(page.getByText('平均3.2ヶ月で内定')).toBeVisible();
    await expect(page.getByText('満足度98%')).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    const primaryCTA = page.getByText('無料で希望体験を始める').first();
    await expect(primaryCTA).toBeVisible();
    
    // Click should navigate to onboarding
    await primaryCTA.click();
    await expect(page).toHaveURL('/onboarding');
  });

  test('should display key statistics', async ({ page }) => {
    await expect(page.getByText('3.2ヶ月')).toBeVisible();
    await expect(page.getByText('94.5%')).toBeVisible();
    await expect(page.getByText('98%')).toBeVisible();
  });

  test('should show testimonial carousel', async ({ page }) => {
    // Check for testimonial content
    const testimonialSection = page.locator('[data-testid="testimonial-carousel"]').or(
      page.locator('text=田中 美咲さん').or(
        page.locator('text=佐藤 健太さん').or(
          page.locator('text=山田 あやさん')
        )
      )
    );
    
    await expect(testimonialSection.first()).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await expect(page.getByText('なぜPathPilotで')).toBeVisible();
    await expect(page.getByText('希望が見える')).toBeVisible();
    
    // Check for feature titles
    await expect(page.getByText('パーソナライズドAI')).toBeVisible();
    await expect(page.getByText('希望体験生成')).toBeVisible();
    await expect(page.getByText('成功パターン分析')).toBeVisible();
    await expect(page.getByText('ステップバイステップ')).toBeVisible();
  });

  test('should handle video button interaction', async ({ page }) => {
    const videoButton = page.getByText('2分で分かる紹介動画');
    await expect(videoButton).toBeVisible();
    await videoButton.click();
    // Video functionality would be implemented in real app
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    await expect(page.getByText('あなたの就活に')).toBeVisible();
    await expect(page.getByText('無料で希望体験を始める').first()).toBeVisible();
  });

  test('should have smooth scrolling behavior', async ({ page }) => {
    // Test scroll to features section
    await page.evaluate(() => {
      const featuresSection = document.querySelector('text=パーソナライズドAI')?.closest('section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    await expect(page.getByText('パーソナライズドAI')).toBeVisible();
  });

  test('should display final CTA section', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.getByText('今すぐ始めて、')).toBeVisible();
    await expect(page.getByText('明日から変わる就活を')).toBeVisible();
  });

  test('should show daily user count', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await expect(page.locator('text=/今日 \\d+人 が新しい希望を見つけました/')).toBeVisible();
  });
});
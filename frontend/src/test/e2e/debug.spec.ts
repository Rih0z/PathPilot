import { test, expect } from '@playwright/test';

test.describe('Debug Tests', () => {
  test('should show page content for debugging', async ({ page }) => {
    await page.goto('/');
    
    // Wait a bit for the page to load
    await page.waitForTimeout(3000);
    
    // Get the page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Get page content
    const content = await page.content();
    console.log('Page content length:', content.length);
    console.log('Page content (first 500 chars):', content.substring(0, 500));
    
    // Check if React is loading
    const bodyText = await page.locator('body').textContent();
    console.log('Body text:', bodyText?.substring(0, 200));
    
    // Check for any errors in console
    const errors: string[] = [];
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Wait a bit more
    await page.waitForTimeout(2000);
    
    if (errors.length > 0) {
      console.log('Page errors:', errors);
    }
    
    // Simple assertion to see the page state
    await expect(page.locator('body')).toBeVisible();
  });
});
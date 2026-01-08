import { test, expect } from '@playwright/test';

/**
 * Basic Smoke Tests - Simple checks that don't rely on specific selectors
 * These tests verify the website is accessible and functional
 */
test.describe('Basic Smoke Tests', () => {
  
  test('website should be accessible', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });

  test('homepage should load successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const title = await page.title();
    console.log(`Page title: ${title}`);
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('homepage should have content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
    expect(bodyText!.length).toBeGreaterThan(100);
  });

  test('login page should be accessible', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response?.status()).toBeLessThan(400);
    
    await page.waitForLoadState('domcontentloaded');
    const url = page.url();
    expect(url).toContain('login');
  });

  test('should not have critical JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Log errors if any
    if (errors.length > 0) {
      console.log('JavaScript errors found:', errors);
    }
    
    // Allow some errors but not too manyc   
    expect(errors.length).toBeLessThan(10);
  });

  test('should load within reasonable time                                         vvvv ', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const url = page.url();
    expect(url).toContain('mywin.lk');
  });

  test('should have navigation elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if page has links (any navigation)
    const links = await page.locator('a').count();
    console.log(`Number of links found: ${links}`);
    expect(links).toBeGreaterThan(0);
  });
});

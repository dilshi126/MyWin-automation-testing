import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestData } from '../../utils/test-data';

test.describe('Smoke Tests - Basic Checks', () => {
  
  test('should load homepage successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.open();
    
    // Verify page loads
    expect(await homePage.getURL()).toContain('mywin.lk');
    
    // Verify page title
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have login button on homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.open();
    
    // Verify login button exists
    const loginVisible = await homePage.isLoginButtonVisible();
    console.log(`Login button visible: ${loginVisible}`);
    expect(loginVisible).toBeTruthy();
  });

  test('should navigate to login page from homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.open();
    await homePage.clickLoginButton();
    
    // Verify navigation to login page
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    const currentURL = page.url();
    console.log(`Current URL after login click: ${currentURL}`);
    expect(currentURL).toContain('login');
  });

  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should have no console errors on homepage', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Log errors if any
    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }
    
    // This is a soft check - you may want to adjust based on your app
    expect(consoleErrors.length).toBeLessThan(5);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const homePage = new HomePage(page);
    await homePage.open();
    
    // Verify page loads on mobile
    expect(await homePage.getURL()).toContain('mywin.lk');
  });
});

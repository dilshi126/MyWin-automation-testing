import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Mywin.lk Website Tests', () => {
  
  test('should open Mywin.lk website in Chromium', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.open();
    
    // Verify the page loaded successfully
    expect(await homePage.getURL()).toContain('mywin.lk');
    
    // Verify page title is not empty
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
    
    console.log(`Page Title: ${title}`);
    console.log(`Page URL: ${await homePage.getURL()}`);
  });

  test('should verify page loads completely', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.open();
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for verification
    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
    
    expect(await homePage.getURL()).toContain('mywin.lk');
  });
});

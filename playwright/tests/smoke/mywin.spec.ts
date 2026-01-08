import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * MyWin Smoke Test - Verify application accessibility
 * Ensures the MyWin web application is accessible and correctly loading
 */
test.describe('MyWin Accessibility Smoke Test', () => {
  
  test('should load MyWin page successfully with HTTP 200', async ({ page }) => {
    // Ensure screenshots directory exists
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Navigate to MyWin URL and capture response
    const response = await page.goto('/');
    
    // Get HTTP status code
    const status = response?.status();
    console.log(`HTTP Status: ${status}`);

    // Fail immediately if status is 404, 500, or any non-2xx error
    if (!status || status === 404 || status === 500 || status >= 400) {
      throw new Error(`Page returned error status: ${status}. Expected HTTP 200.`);
    }

    // Verify main page returns HTTP 200 status
    expect(status).toBe(200);

    // Wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Take screenshot only on successful load
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(screenshotsDir, `mywin-success-${timestamp}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    console.log(`Screenshot saved: ${screenshotPath}`);
  });
});

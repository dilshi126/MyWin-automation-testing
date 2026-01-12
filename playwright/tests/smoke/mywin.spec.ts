import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * MyWin Smoke Test
 * Verifies the application is accessible and loading correctly
 */
test.describe('MyWin Accessibility Smoke Test', () => {
  
  test('should load MyWin page successfully with HTTP 200', async ({ page }) => {
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const response = await page.goto('/');
    const status = response?.status();

    if (!status || status === 404 || status === 500 || status >= 400) {
      throw new Error('Page returned error status: ' + status + '. Expected HTTP 200.');
    }

    expect(status).toBe(200);

    await page.waitForLoadState('domcontentloaded');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(screenshotsDir, 'mywin-success-' + timestamp + '.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
  });
});

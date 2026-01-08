import { Page } from '@playwright/test';

export class Helpers {
  /**
   * Wait for a specific amount of time
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Take a screenshot with a custom name
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Get current timestamp
   */
  static getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Scroll to bottom of page
   */
  static async scrollToBottom(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  /**
   * Scroll to top of page
   */
  static async scrollToTop(page: Page): Promise<void> {
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  /**
   * Clear browser cookies
   */
  static async clearCookies(page: Page): Promise<void> {
    await page.context().clearCookies();
  }

  /**
   * Clear local storage
   */
  static async clearLocalStorage(page: Page): Promise<void> {
    await page.evaluate(() => localStorage.clear());
  }

  /**
   * Get local storage item
   */
  static async getLocalStorageItem(page: Page, key: string): Promise<string | null> {
    return await page.evaluate((k) => localStorage.getItem(k), key);
  }

  /**
   * Set local storage item
   */
  static async setLocalStorageItem(page: Page, key: string, value: string): Promise<void> {
    await page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: key, v: value });
  }

  /**
   * Wait for API response
   */
  static async waitForAPIResponse(page: Page, urlPattern: string, timeout: number = 10000): Promise<void> {
    await page.waitForResponse(
      response => response.url().includes(urlPattern) && response.status() === 200,
      { timeout }
    );
  }
}

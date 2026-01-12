import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly loginButton: Locator;
  readonly englishLanguageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.locator('button.banner-log-btn');
    this.englishLanguageButton = page.locator('span.ln-btn:has-text("English")');
  }

  async open() {
    await this.navigate('/');
    await this.waitForPageLoad();
    await this.selectLanguageIfNeeded();
  }

  async selectLanguageIfNeeded() {
    try {
      const isLanguagePopupVisible = await this.englishLanguageButton.isVisible({ timeout: 3000 });
      if (isLanguagePopupVisible) {
        await this.englishLanguageButton.click();
        await this.page.waitForTimeout(1000);
      }
    } catch {
      // Language popup not present
    }
  }

  async clickLoginButton() {
    await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async isLoginButtonVisible(): Promise<boolean> {
    try {
      await this.loginButton.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

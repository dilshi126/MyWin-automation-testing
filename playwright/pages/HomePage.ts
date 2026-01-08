import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly loginButton: Locator;
  readonly englishLanguageButton: Locator;

  constructor(page: Page) {
    super(page);
    // Login button with exact class from MyWin.lk
    this.loginButton = page.locator('button.banner-log-btn');
    // Language selection button
    this.englishLanguageButton = page.locator('span.ln-btn:has-text("English")');
  }

  async open() {
    await this.navigate('/');
    await this.waitForPageLoad();
    // Handle language selection popup if it appears
    await this.selectLanguageIfNeeded();
  }

  async selectLanguageIfNeeded() {
    try {
      // Check if language selection popup is visible
      const isLanguagePopupVisible = await this.englishLanguageButton.isVisible({ timeout: 3000 });
      if (isLanguagePopupVisible) {
        console.log('Language selection popup detected, selecting English...');
        await this.englishLanguageButton.click();
        await this.page.waitForTimeout(1000); // Wait for popup to close
        console.log('✅ English language selected');
      }
    } catch {
      // Language popup not present, continue
      console.log('No language popup detected');
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

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly myAccountButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    // Logged-in user elements with exact selectors from MyWin.lk
    this.myAccountButton = page.locator('button.profile-btn:has-text("My Account")');
    this.loginButton = page.locator('button.banner-log-btn:has-text("Login")');
  }

  async open() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async isUserLoggedIn(): Promise<boolean> {
    try {
      // Check if "My Account" button is visible (indicates logged in)
      await this.myAccountButton.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isLoginButtonVisible(): Promise<boolean> {
    try {
      await this.loginButton.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickMyAccount() {
    await this.myAccountButton.click();
    await this.waitForPageLoad();
  }
}

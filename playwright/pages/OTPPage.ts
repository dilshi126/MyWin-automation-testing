import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OTPPage extends BasePage {
  readonly otpInput: Locator;
  readonly loginButton: Locator;
  readonly goBackButton: Locator;

  constructor(page: Page) {
    super(page);
    // OTP page elements with exact selectors from MyWin.lk
    this.otpInput = page.locator('input.mobile-number-verify-input[placeholder="Enter OTP number"]');
    this.loginButton = page.locator('button.verify-btn:has-text("Login")');
    this.goBackButton = page.locator('button.goback-verify-btn:has-text("Go Back")');
  }

  async enterOTP(otpCode: string) {
    await this.otpInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.otpInput.clear();
    await this.otpInput.fill(otpCode);
  }

  async clickLogin() {
    await this.loginButton.click();
    // Wait for navigation after login
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
  }

  async submitOTP(otpCode: string) {
    await this.enterOTP(otpCode);
    await this.clickLogin();
  }

  async isOTPPageDisplayed(): Promise<boolean> {
    try {
      await this.otpInput.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickGoBack() {
    await this.goBackButton.click();
    await this.waitForPageLoad();
  }
}

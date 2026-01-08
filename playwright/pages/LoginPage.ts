import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly mobileNumberInput: Locator;
  readonly sendVerificationCodeButton: Locator;

  constructor(page: Page) {
    super(page);
    // Login page elements with exact selectors from MyWin.lk
    this.mobileNumberInput = page.locator('input.mobile-number-verify-input[placeholder="Enter Mobile Number"]');
    this.sendVerificationCodeButton = page.locator('button.verify-btn:has-text("Send Verification Code")');
  }

  async open() {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  async enterMobileNumber(phoneNumber: string) {
    await this.mobileNumberInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.mobileNumberInput.clear();
    await this.mobileNumberInput.fill(phoneNumber);
  }

  async clickSendVerificationCode() {
    await this.sendVerificationCodeButton.click();
    // Wait for OTP page to load
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
  }

  async sendVerificationCode(phoneNumber: string) {
    await this.enterMobileNumber(phoneNumber);
    await this.clickSendVerificationCode();
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    try {
      await this.mobileNumberInput.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }
}

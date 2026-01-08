import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OTPPage } from '../pages/OTPPage';
import { DashboardPage } from '../pages/DashboardPage';

type AuthFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  otpPage: OTPPage;
  dashboardPage: DashboardPage;
  authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  otpPage: async ({ page }, use) => {
    const otpPage = new OTPPage(page);
    await use(otpPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  authenticatedPage: async ({ page }, use) => {
    // This fixture automatically logs in before each test
    // NOTE: This requires manual OTP entry or a test OTP setup
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const otpPage = new OTPPage(page);
    
    // Navigate to home and click login
    await homePage.open();
    await homePage.clickLoginButton();
    
    // Enter phone number and send verification code
    const phoneNumber = process.env.TEST_PHONE_NUMBER || '0711996825';
    await loginPage.sendVerificationCode(phoneNumber);
    
    // For automated tests, you would need to:
    // 1. Use a test phone number with known OTP
    // 2. Mock the SMS service
    // 3. Use an API to retrieve the OTP
    
    // If you have a test OTP:
    const testOTP = process.env.TEST_OTP;
    if (testOTP) {
      await otpPage.submitOTP(testOTP);
      await page.waitForLoadState('networkidle', { timeout: 15000 });
    } else {
      console.warn('⚠️  No TEST_OTP provided. Manual OTP entry required.');
      // You can uncomment the line below to pause for manual entry
      // await page.pause();
    }
    
    await use();
  },
});

export { expect } from '@playwright/test';

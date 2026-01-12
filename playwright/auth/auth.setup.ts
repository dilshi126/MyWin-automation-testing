import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OTPPage } from '../pages/OTPPage';

const authFile = 'playwright/.auth/user.json';

/**
 * Authentication Setup
 * Runs once before all tests to create a logged-in session.
 * The session is saved to a file and reused by all tests.
 */
setup('authenticate', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const otpPage = new OTPPage(page);

  await homePage.open();

  await homePage.clickLoginButton();

  const phoneNumber = process.env.TEST_PHONE_NUMBER || '0711996825';
  await loginPage.sendVerificationCode(phoneNumber);

  await page.waitForTimeout(1000);

  const testOTP = process.env.TEST_OTP;
  
  if (testOTP) {
    await otpPage.submitOTP(testOTP);
  } else {
    console.log('Please enter the OTP manually in the browser.');
    console.log('After entering OTP and logging in, press Resume in the Playwright Inspector.');
    await page.pause();
  }

  await page.waitForLoadState('networkidle', { timeout: 30000 });
  
  const walletBalance = page.locator('.wallet-balance-lg');
  const isLoggedIn = await walletBalance.isVisible({ timeout: 10000 }).catch(() => false);
  
  if (!isLoggedIn) {
    await page.waitForTimeout(3000);
  }

  await page.context().storageState({ path: authFile });
});

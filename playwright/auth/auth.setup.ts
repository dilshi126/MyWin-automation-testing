import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OTPPage } from '../pages/OTPPage';

const authFile = 'playwright/.auth/user.json';

/**
 * Authentication Setup
 * 
 * This setup runs once before all tests to create a logged-in session.
 * The session is saved to a file and reused by all tests.
 * 
 * Run this setup with: npx playwright test --project=setup
 */
setup('authenticate', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const otpPage = new OTPPage(page);

  // Navigate to home page
  await homePage.open();
  console.log('✓ Opened home page');

  // Click login button
  await homePage.clickLoginButton();
  console.log('✓ Clicked login button');

  // Enter phone number
  const phoneNumber = process.env.TEST_PHONE_NUMBER || '0711996825';
  await loginPage.sendVerificationCode(phoneNumber);
  console.log(`✓ Sent verification code to ${phoneNumber}`);

  // Wait for OTP page
  await page.waitForTimeout(1000);

  // Check if we have a test OTP in environment
  const testOTP = process.env.TEST_OTP;
  
  if (testOTP) {
    // Use automated OTP entry
    await otpPage.submitOTP(testOTP);
    console.log('✓ Submitted OTP automatically');
  } else {
    // Pause for manual OTP entry
    console.log('⏸️  Please enter the OTP manually in the browser...');
    console.log('   After entering OTP and logging in, press "Resume" in the Playwright Inspector');
    await page.pause();
  }

  // Wait for successful login - check for logged-in state
  // Wait for navigation to complete after login
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  
  // Verify login was successful by checking for wallet balance or user menu
  const walletBalance = page.locator('.wallet-balance-lg');
  const isLoggedIn = await walletBalance.isVisible({ timeout: 10000 }).catch(() => false);
  
  if (isLoggedIn) {
    console.log('✓ Login successful! Wallet balance visible.');
  } else {
    // Alternative check - look for any logged-in indicator
    console.log('⚠️  Wallet balance not found, checking alternative login indicators...');
    await page.waitForTimeout(3000);
  }

  // Save the authenticated state
  await page.context().storageState({ path: authFile });
  console.log(`✓ Authentication state saved to ${authFile}`);
});

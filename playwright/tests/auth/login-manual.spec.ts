import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { OTPPage } from '../../pages/OTPPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TestData } from '../../utils/test-data';

/**
 * Manual Login Test
 * This test requires manual OTP entry from SMS
 * Run with: npm run test:debug or npm run test:headed
 */
test.describe('Manual Login Test - With OTP Entry', () => {
  
  test('should complete full login with manual OTP entry', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const otpPage = new OTPPage(page);
    const dashboardPage = new DashboardPage(page);
    
    console.log('Starting manual login test...');
    
    // Step 1: Navigate to home page
    console.log('Step 1: Opening home page...');
    await homePage.open();
    expect(await homePage.isLoginButtonVisible()).toBeTruthy();
    console.log('Home page loaded');
    
    // Step 2: Click Login button
    console.log('Step 2: Clicking Login button...');
    await homePage.clickLoginButton();
    await expect(page).toHaveURL(/.*login/);
    console.log('Navigated to login page');
    
    // Step 3: Enter phone number
    console.log('Step 3: Entering phone number...');
    const { phoneNumber } = TestData.users.validUser;
    await loginPage.enterMobileNumber(phoneNumber);
    console.log(`Entered phone number: ${phoneNumber}`);
    
    // Step 4: Click Send Verification Code
    console.log('Step 4: Sending verification code...');
    await loginPage.clickSendVerificationCode();
    console.log('Verification code sent');
    
    // Step 5: Verify OTP page
    console.log('Step 5: Verifying OTP page...');
    expect(await otpPage.isOTPPageDisplayed()).toBeTruthy();
    console.log('OTP page displayed');
    
    // Step 6: PAUSE FOR MANUAL OTP ENTRY
    console.log('\n PAUSED - Please enter the OTP code manually');
    console.log(`Check SMS on phone: ${phoneNumber}`);
    console.log('Enter the OTP in the browser and click Login');
    console.log('Then click Resume in the Playwright Inspector\n');
    
    await page.pause(); // This will pause the test for manual OTP entry
    
    // Step 7: Verify logged in state
    console.log('Step 7: Verifying logged-in state...');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    // Check if user is logged in
    const isLoggedIn = await dashboardPage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    console.log(' User is logged in');
    
    // Step 8: Verify My Account button is visible
    console.log('Step 8: Verifying My Account button...');
    expect(await dashboardPage.myAccountButton.isVisible()).toBeTruthy();
    console.log('My Account button is visible');
    
    // Take a screenshot of logged-in state
    await page.screenshot({ path: 'screenshots/logged-in-state.png', fullPage: true });
    console.log('Screenshot saved: screenshots/logged-in-state.png');
    
    console.log('\n Login test completed successfully!');
  });
});

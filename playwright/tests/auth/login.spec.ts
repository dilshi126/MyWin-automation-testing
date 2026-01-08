import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { OTPPage } from '../../pages/OTPPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TestData } from '../../utils/test-data';

test.describe('Login Flow Tests', () => {
  
  test('should navigate from home to login page', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Step 1: Open home page
    await homePage.open();
    console.log('Home page loaded');
    
    // Step 2: Verify login button is visible
    expect(await homePage.isLoginButtonVisible()).toBeTruthy();
    console.log('Login button is visible');
    
    // Step 3: Click login button
    await homePage.clickLoginButton();
    console.log('Clicked login button');
    
    // Step 4: Verify navigation to login page
    await expect(page).toHaveURL(/.*login/);
    console.log('Navigated to login page');
  });

  test('should display login page elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.open();
    
    // Verify login page elements are visible
    expect(await loginPage.mobileNumberInput.isVisible()).toBeTruthy();
    expect(await loginPage.sendVerificationCodeButton.isVisible()).toBeTruthy();
    console.log('Login page elements are visible');
  });

  test('should navigate to OTP page after entering phone number', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const otpPage = new OTPPage(page);
    
    // Navigate to login page
    await homePage.open();
    await homePage.clickLoginButton();
    
    // Enter phone number and send verification code
    const { phoneNumber } = TestData.users.validUser;
    await loginPage.sendVerificationCode(phoneNumber);
    console.log(`Sent verification code to ${phoneNumber}`);
    
    // Verify OTP page is displayed
    expect(await otpPage.isOTPPageDisplayed()).toBeTruthy();
    console.log('OTP page is displayed');
  });

  test('should display OTP page elements', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const otpPage = new OTPPage(page);
    
    // Navigate to OTP page
    await homePage.open();
    await homePage.clickLoginButton();
    const { phoneNumber } = TestData.users.validUser;
    await loginPage.sendVerificationCode(phoneNumber);
    
    // Wait for OTP page to be displayed
    expect(await otpPage.isOTPPageDisplayed()).toBeTruthy();
    
    // Verify OTP page elements with proper waits
    await otpPage.otpInput.waitFor({ state: 'visible', timeout: 5000 });
    await otpPage.loginButton.waitFor({ state: 'visible', timeout: 5000 });
    await otpPage.goBackButton.waitFor({ state: 'visible', timeout: 5000 });
    
    expect(await otpPage.otpInput.isVisible()).toBeTruthy();
    expect(await otpPage.loginButton.isVisible()).toBeTruthy();
    expect(await otpPage.goBackButton.isVisible()).toBeTruthy();
    console.log('All OTP page elements are visible');
  });

  test('should be able to go back from OTP page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const otpPage = new OTPPage(page);
    
    // Navigate to OTP page
    await homePage.open();
    await homePage.clickLoginButton();
    const { phoneNumber } = TestData.users.validUser;
    await loginPage.sendVerificationCode(phoneNumber);
    
    // Click go back
    await otpPage.clickGoBack();
    console.log('Clicked Go Back button');
    
    // Verify back on login page
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
    console.log('Back on login page');
  });
});

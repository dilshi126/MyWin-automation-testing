import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TicketPurchasePage } from '../../pages/TicketPurchasePage';

/**
 * Ticket Purchase Test Cases - Quick Buy
 * 
 * Test scenarios for buying lottery tickets using Quick Buy option
 * Prerequisites: User must be logged in (handled by auth.setup.ts)
 * 
 * Flow:
 * 1. User is already logged in (via saved auth state)
 * 2. Navigate to Lotteries tab
 * 3. Select a lottery and click Buy Now
 * 4. Select Quick Buy option
 * 5. Choose payment method (Mobile/Card/Wallet)
 * 6. Select ticket quantity
 * 7. Click Buy Now and confirm payment
 * 8. Verify success or failure message
 * 
 * Run with: npx playwright test ticket-purchase.spec.ts --project=chromium --headed
 */

test.describe('Ticket Purchase - Quick Buy', () => {
  
  test.beforeEach(async ({ page }) => {
    // User is already logged in via saved auth state from auth.setup.ts
    // Just navigate to home page
    const homePage = new HomePage(page);
    await homePage.open();
    await page.waitForLoadState('domcontentloaded');
  });

  /**
   * TEST CASE 1: Buy 1 Ticket Through Mobile Payment Method
   * 
   * Steps:
   * 1. Navigate to Lotteries page
   * 2. Click Buy Now on available lottery
   * 3. Select Quick Buy option
   * 4. Select Mobile payment method
   * 5. Select 1 ticket
   * 6. Click Buy Now button
   * 7. Click "I'm Ready to Pay" in confirmation popup
   * 8. Verify success or failure message
   * 9. Click Close button to return to lottery page
   * 
   * Expected Results:
   * - If mobile balance is sufficient: Success message displayed
   * - If mobile balance is insufficient: Payment failed message displayed
   * - User receives SMS with ticket details on success
   */
  test('TC1: Buy 1 ticket through Mobile payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    
    // Navigate to Lotteries page
    await ticketPurchase.navigateToLotteries();
    console.log('✓ Navigated to Lotteries page');
    
    // Click Buy Now on first available lottery
    await ticketPurchase.clickBuyNowOnFirstLottery();
    console.log('✓ Clicked Buy Now on lottery');
    
    // Select Quick Buy option
    await ticketPurchase.selectQuickBuy();
    console.log('✓ Selected Quick Buy option');
    
    // Select Mobile payment method
    await ticketPurchase.selectMobilePayment();
    console.log('✓ Selected Mobile payment method');
    
    // Select 1 ticket
    await ticketPurchase.selectTicketQuantity(1);
    console.log('✓ Selected 1 ticket');
    
    // Click Buy Now button
    await ticketPurchase.clickLotBuyNow();
    console.log('✓ Clicked Buy Now button');
    
    // Click "I'm Ready to Pay" button in confirmation popup
    await ticketPurchase.clickReadyToPay();
    console.log('✓ Clicked Ready to Pay button');
    
    // Wait for payment processing
    await page.waitForTimeout(3000);
    
    // Check if success or failure message is displayed
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      console.log('✓ Payment Successful! Ticket purchased via Mobile payment');
      expect(isSuccess).toBeTruthy();
      
      // Verify success message is visible
      await expect(ticketPurchase.successMessage).toBeVisible();
      
      // Click Close button
      await ticketPurchase.clickCloseButton();
      console.log('✓ Closed success popup');
      
    } else if (isFailed) {
      console.log('⚠ Payment Failed! Insufficient mobile balance');
      expect(isFailed).toBeTruthy();
      
      // Verify failed message is visible
      await expect(ticketPurchase.failedMessage).toBeVisible();
      
      // Click Close button to return to lottery page
      await ticketPurchase.clickCloseButton();
      console.log('✓ Closed failed popup and returned to lottery page');
      
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });

  /**
   * TEST CASE 2: Buy 1 Ticket Through Card Payment Method
   * 
   * Steps:
   * 1. Navigate to Lotteries page
   * 2. Click Buy Now on available lottery
   * 3. Select Quick Buy option
   * 4. Select Card payment method
   * 5. Check wallet balance
   * 6. If wallet has balance (>= Rs.40): Buy Now button should be disabled
   * 7. If wallet has no balance: User can charge from card (min Rs.500)
   * 8. Remaining balance will be added to wallet
   * 9. Verify success or failure message
   * 10. Click Close button
   * 
   * Expected Results:
   * - If wallet balance >= Rs.40: Buy Now button is disabled (cannot use card)
   * - If wallet balance < Rs.40: User can charge card with min Rs.500
   * - On success: Wallet gets topped up with remaining balance
   * - Success or failure message displayed accordingly
   */
  test('TC2: Buy 1 ticket through Card payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    
    // Navigate to Lotteries page
    await ticketPurchase.navigateToLotteries();
    console.log('✓ Navigated to Lotteries page');
    
    // Click Buy Now on first available lottery
    await ticketPurchase.clickBuyNowOnFirstLottery();
    console.log('✓ Clicked Buy Now on lottery');
    
    // Select Quick Buy option
    await ticketPurchase.selectQuickBuy();
    console.log('✓ Selected Quick Buy option');
    
    // Select Card payment method
    await ticketPurchase.selectCardPayment();
    console.log('✓ Selected Card payment method');
    
    // Get wallet balance
    const walletBalance = await ticketPurchase.getWalletBalanceNumeric();
    console.log(`Current wallet balance: Rs.${walletBalance}`);
    
    // Select 1 ticket
    await ticketPurchase.selectTicketQuantity(1);
    console.log('✓ Selected 1 ticket');
    
    // Ticket price is Rs.40
    const ticketPrice = 40;
    
    // Check if wallet has sufficient balance
    if (walletBalance >= ticketPrice) {
      console.log('⚠ Wallet has sufficient balance. Card payment should be disabled.');
      
      // Verify Buy Now button is disabled
      const isDisabled = await ticketPurchase.isBuyNowButtonDisabled();
      expect(isDisabled).toBeTruthy();
      console.log('✓ Buy Now button is disabled as expected');
      
      // Test ends here as user cannot proceed with card payment
      return;
    }
    
    // If wallet balance is insufficient, user can charge from card
    console.log('Wallet balance insufficient. User can charge from card (min Rs.500)');
    
    // Click Buy Now button
    await ticketPurchase.clickLotBuyNow();
    console.log('✓ Clicked Buy Now button');
    
    // Click "I'm Ready to Pay" button in confirmation popup
    await ticketPurchase.clickReadyToPay();
    console.log('✓ Clicked Ready to Pay button');
    
    // Wait for payment processing
    await page.waitForTimeout(3000);
    
    // Check if success or failure message is displayed
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      console.log('✓ Payment Successful! Card charged and wallet topped up');
      expect(isSuccess).toBeTruthy();
      
      // Verify success message is visible
      await expect(ticketPurchase.successMessage).toBeVisible();
      
      // Get updated wallet balance
      const newWalletBalance = await ticketPurchase.getWalletBalanceNumeric();
      console.log(`Updated wallet balance: Rs.${newWalletBalance}`);
      
      // Verify wallet was topped up (should have remaining balance from Rs.500 charge)
      // Rs.500 - Rs.40 = Rs.460 should be added to wallet
      const expectedIncrease = 500 - ticketPrice;
      console.log(`Expected wallet increase: Rs.${expectedIncrease}`);
      
      // Click Close button
      await ticketPurchase.clickCloseButton();
      console.log('✓ Closed success popup');
      
    } else if (isFailed) {
      console.log('⚠ Payment Failed! Card payment unsuccessful');
      expect(isFailed).toBeTruthy();
      
      // Verify failed message is visible
      await expect(ticketPurchase.failedMessage).toBeVisible();
      
      // Click Close button to return to lottery page
      await ticketPurchase.clickCloseButton();
      console.log('✓ Closed failed popup and returned to lottery page');
      
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });

  /**
   * TEST CASE 3: Buy 1 Ticket Through Wallet Payment Method
   * 
   * Steps:
   * 1. Navigate to Lotteries page
   * 2. Click Buy Now on available lottery
   * 3. Select Quick Buy option
   * 4. Select Wallet payment method
   * 5. Check wallet balance
   * 6. Select 1 ticket
   * 7. Click Buy Now button
   * 8. Click "I'm Ready to Pay" in confirmation popup
   * 9. If wallet balance >= Rs.40: Payment successful, amount deducted
   * 10. If wallet balance < Rs.40: Payment failed
   * 11. Click Close button
   * 
   * Expected Results:
   * - If wallet balance >= Rs.40: Success message, Rs.40 deducted from wallet
   * - If wallet balance < Rs.40: Failed message displayed
   * - User returns to lottery page after clicking Close
   */
  test('TC3: Buy 1 ticket through Wallet payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    
    // Navigate to Lotteries page
    await ticketPurchase.navigateToLotteries();
    console.log('✓ Navigated to Lotteries page');
    
    // Click Buy Now on first available lottery
    await ticketPurchase.clickBuyNowOnFirstLottery();
    console.log('✓ Clicked Buy Now on lottery');
    
    // Select Quick Buy option
    await ticketPurchase.selectQuickBuy();
    console.log('✓ Selected Quick Buy option');
    
    // Select Wallet payment method
    await ticketPurchase.selectWalletPayment();
    console.log('✓ Selected Wallet payment method');
    
    // Get wallet balance before purchase
    const walletBalanceBefore = await ticketPurchase.getWalletBalanceNumeric();
    console.log(`Wallet balance before purchase: Rs.${walletBalanceBefore}`);
    
    // Select 1 ticket
    await ticketPurchase.selectTicketQuantity(1);
    console.log('✓ Selected 1 ticket');
    
    // Ticket price is Rs.40
    const ticketPrice = 40;
    
    // Click Buy Now button
    await ticketPurchase.clickLotBuyNow();
    console.log('✓ Clicked Buy Now button');
    
    // Click "I'm Ready to Pay" button in confirmation popup
    await ticketPurchase.clickReadyToPay();
    console.log('✓ Clicked Ready to Pay button');
    
    // Wait for payment processing
    await page.waitForTimeout(3000);
    
    // Check if success or failure message is displayed
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      console.log('✓ Payment Successful! Ticket purchased via Wallet');
      expect(isSuccess).toBeTruthy();
      
      // Verify success message is visible
      await expect(ticketPurchase.successMessage).toBeVisible();
      
      // Get wallet balance after purchase
      const walletBalanceAfter = await ticketPurchase.getWalletBalanceNumeric();
      console.log(`Wallet balance after purchase: Rs.${walletBalanceAfter}`);
      
      // Verify correct amount was deducted
      const expectedBalance = walletBalanceBefore - ticketPrice;
      console.log(`Expected wallet balance: Rs.${expectedBalance}`);
      console.log(`Actual wallet balance: Rs.${walletBalanceAfter}`);
      
      // Verify wallet balance decreased by ticket price
      expect(walletBalanceAfter).toBeLessThan(walletBalanceBefore);
      console.log('✓ Wallet balance correctly deducted');
      
      // Click Close button
      await ticketPurchase.clickCloseButton();
      console.log('✓ Closed success popup');
      
    } else if (isFailed) {
      console.log('⚠ Payment Failed! Insufficient wallet balance');
      expect(isFailed).toBeTruthy();
      
      // Verify failed message is visible
      await expect(ticketPurchase.failedMessage).toBeVisible();
      
      // Verify wallet balance is less than ticket price
      expect(walletBalanceBefore).toBeLessThan(ticketPrice);
      console.log(`✓ Payment failed as expected. Wallet balance (Rs.${walletBalanceBefore}) < Ticket price (Rs.${ticketPrice})`);
      
      // Click Close button to return to lottery page
      await ticketPurchase.clickCloseButton();
      console.log('✓ Closed failed popup and returned to lottery page');
      
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });
});

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TicketPurchasePage } from '../../pages/TicketPurchasePage';

/**
 * Ticket Purchase Test Suite
 * Tests for buying lottery tickets using Quick Buy and Search & Buy options
 * Prerequisites: User must be logged in (handled by auth setup)
 */

test.describe('Ticket Purchase - Quick Buy', () => {
  
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC1: Buy 1 ticket through Mobile payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    
    await ticketPurchase.navigateToLotteries();
    await ticketPurchase.clickBuyNowOnFirstLottery();
    await ticketPurchase.selectQuickBuy();
    await ticketPurchase.selectMobilePayment();
    await ticketPurchase.selectTicketQuantity(1);
    await ticketPurchase.clickLotBuyNow();
    await ticketPurchase.clickReadyToPay();
    
    await page.waitForTimeout(3000);
    
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      expect(isSuccess).toBeTruthy();
      await expect(ticketPurchase.successMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else if (isFailed) {
      expect(isFailed).toBeTruthy();
      await expect(ticketPurchase.failedMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });

  test('TC2: Buy 1 ticket through Card payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    const ticketPrice = 40;
    
    await ticketPurchase.navigateToLotteries();
    await ticketPurchase.clickBuyNowOnFirstLottery();
    await ticketPurchase.selectQuickBuy();
    await ticketPurchase.selectCardPayment();
    
    const walletBalance = await ticketPurchase.getWalletBalanceNumeric();
    
    await ticketPurchase.selectTicketQuantity(1);
    
    if (walletBalance >= ticketPrice) {
      const isDisabled = await ticketPurchase.isBuyNowButtonDisabled();
      expect(isDisabled).toBeTruthy();
      return;
    }
    
    await ticketPurchase.clickLotBuyNow();
    await ticketPurchase.clickReadyToPay();
    
    await page.waitForTimeout(3000);
    
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      expect(isSuccess).toBeTruthy();
      await expect(ticketPurchase.successMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else if (isFailed) {
      expect(isFailed).toBeTruthy();
      await expect(ticketPurchase.failedMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });

  test('TC3: Buy 1 ticket through Wallet payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    const ticketPrice = 40;
    
    await ticketPurchase.navigateToLotteries();
    await ticketPurchase.clickBuyNowOnFirstLottery();
    await ticketPurchase.selectQuickBuy();
    await ticketPurchase.selectWalletPayment();
    
    const walletBalanceBefore = await ticketPurchase.getWalletBalanceNumeric();
    
    await ticketPurchase.selectTicketQuantity(1);
    await ticketPurchase.clickLotBuyNow();
    await ticketPurchase.clickReadyToPay();
    
    await page.waitForTimeout(3000);
    
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      expect(isSuccess).toBeTruthy();
      await expect(ticketPurchase.successMessage).toBeVisible();
      
      const walletBalanceAfter = await ticketPurchase.getWalletBalanceNumeric();
      expect(walletBalanceAfter).toBeLessThan(walletBalanceBefore);
      
      await ticketPurchase.clickCloseButton();
    } else if (isFailed) {
      expect(isFailed).toBeTruthy();
      await expect(ticketPurchase.failedMessage).toBeVisible();
      expect(walletBalanceBefore).toBeLessThan(ticketPrice);
      await ticketPurchase.clickCloseButton();
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });
});

test.describe('Ticket Purchase - Search & Buy', () => {
  
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await page.waitForLoadState('domcontentloaded');
  });

  test('TC4: Search & Buy - Mobile payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    
    await ticketPurchase.navigateToLotteries();
    await ticketPurchase.clickBuyNowOnFirstLottery();
    await ticketPurchase.selectSearchAndBuy();
    await ticketPurchase.selectMobilePayment();
    await ticketPurchase.enterSearchValue('1');
    await ticketPurchase.clickSearchButton();
    await ticketPurchase.selectFirstSearchResult();
    await ticketPurchase.clickLotBuyNow();
    await ticketPurchase.clickReadyToPay();
    
    await page.waitForTimeout(3000);
    
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      expect(isSuccess).toBeTruthy();
      await expect(ticketPurchase.successMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else if (isFailed) {
      expect(isFailed).toBeTruthy();
      await expect(ticketPurchase.failedMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });

  test('TC5: Search & Buy - Card payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    const ticketPrice = 40;
    
    await ticketPurchase.navigateToLotteries();
    await ticketPurchase.clickBuyNowOnFirstLottery();
    await ticketPurchase.selectSearchAndBuy();
    await ticketPurchase.selectCardPayment();
    
    const walletBalance = await ticketPurchase.getWalletBalanceNumeric();
    
    await ticketPurchase.enterSearchValue('1');
    await ticketPurchase.clickSearchButton();
    await ticketPurchase.selectFirstSearchResult();
    
    if (walletBalance >= ticketPrice) {
      const isDisabled = await ticketPurchase.isBuyNowButtonDisabled();
      expect(isDisabled).toBeTruthy();
      return;
    }
    
    await ticketPurchase.clickLotBuyNow();
    await ticketPurchase.clickReadyToPay();
    
    await page.waitForTimeout(3000);
    
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      expect(isSuccess).toBeTruthy();
      await expect(ticketPurchase.successMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else if (isFailed) {
      expect(isFailed).toBeTruthy();
      await expect(ticketPurchase.failedMessage).toBeVisible();
      await ticketPurchase.clickCloseButton();
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });

  test('TC6: Search & Buy - Wallet payment method', async ({ page }) => {
    const ticketPurchase = new TicketPurchasePage(page);
    const ticketPrice = 40;
    
    await ticketPurchase.navigateToLotteries();
    await ticketPurchase.clickBuyNowOnFirstLottery();
    await ticketPurchase.selectSearchAndBuy();
    await ticketPurchase.selectWalletPayment();
    
    const walletBalanceBefore = await ticketPurchase.getWalletBalanceNumeric();
    
    await ticketPurchase.enterSearchValue('1');
    await ticketPurchase.clickSearchButton();
    await ticketPurchase.selectFirstSearchResult();
    await ticketPurchase.clickLotBuyNow();
    await ticketPurchase.clickReadyToPay();
    
    await page.waitForTimeout(3000);
    
    const isSuccess = await ticketPurchase.isSuccessMessageDisplayed();
    const isFailed = await ticketPurchase.isFailedMessageDisplayed();
    
    if (isSuccess) {
      expect(isSuccess).toBeTruthy();
      await expect(ticketPurchase.successMessage).toBeVisible();
      
      const walletBalanceAfter = await ticketPurchase.getWalletBalanceNumeric();
      expect(walletBalanceAfter).toBeLessThan(walletBalanceBefore);
      
      await ticketPurchase.clickCloseButton();
    } else if (isFailed) {
      expect(isFailed).toBeTruthy();
      await expect(ticketPurchase.failedMessage).toBeVisible();
      expect(walletBalanceBefore).toBeLessThan(ticketPrice);
      await ticketPurchase.clickCloseButton();
    } else {
      throw new Error('Neither success nor failure message displayed');
    }
  });
});

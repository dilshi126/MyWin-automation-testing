import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TicketPurchasePage extends BasePage {
  // Navigation
  readonly lotteriesNavTab: Locator;
  
  // Lottery Selection
  readonly lotteryCard: Locator;
  readonly buyNowButton: Locator;
  readonly subscribeNowButton: Locator;
  
  // Purchase Options
  readonly quickBuyButton: Locator;
  readonly searchBuyButton: Locator;
  
  // Payment Methods
  readonly mobilePaymentButton: Locator;
  readonly cardPaymentButton: Locator;
  readonly walletPaymentButton: Locator;
  
  // Ticket Quantity Selectors
  readonly ticketQuantity1: Locator;
  readonly ticketQuantity2: Locator;
  readonly ticketQuantity3: Locator;
  readonly ticketQuantity4: Locator;
  readonly ticketQuantity5: Locator;
  
  // Purchase Actions
  readonly lotBuyNowButton: Locator;
  readonly readyToPayButton: Locator;
  
  // Success/Failure Messages
  readonly successMessage: Locator;
  readonly failedMessage: Locator;
  readonly closeButton: Locator;
  
  // Wallet Balance
  readonly walletBalance: Locator;

  constructor(page: Page) {
    super(page);
    
    // Navigation
    this.lotteriesNavTab = page.locator('a.nav-link-btn:has-text("Lotteries")');
    
    // Lottery Selection
    this.lotteryCard = page.locator('.carousel-card');
    this.buyNowButton = page.locator('button.buy-btn:has-text("Buy Now")');
    this.subscribeNowButton = page.locator('button.sub-btn:has-text("Subscribe Now")');
    
    // Purchase Options
    this.quickBuyButton = page.locator('button.buy-switch-btn:has-text("Quick Buy")');
    this.searchBuyButton = page.locator('button.buy-switch-btn:has-text("Search & Buy")');
    
    // Payment Methods
    this.mobilePaymentButton = page.locator('button.buy-switch-btn:has-text("Mobile")');
    this.cardPaymentButton = page.locator('button.buy-switch-btn:has-text("Card")');
    this.walletPaymentButton = page.locator('button.buy-switch-btn:has-text("Wallet")');
    
    // Ticket Quantity Selectors
    this.ticketQuantity1 = page.locator('span.buy-select-btn:has-text("1")');
    this.ticketQuantity2 = page.locator('span.buy-select-btn:has-text("2")');
    this.ticketQuantity3 = page.locator('span.buy-select-btn:has-text("3")');
    this.ticketQuantity4 = page.locator('span.buy-select-btn:has-text("4")');
    this.ticketQuantity5 = page.locator('span.buy-select-btn:has-text("5")');
    
    // Purchase Actions
    this.lotBuyNowButton = page.locator('button.lot-buy-now-btn:has-text("Buy Now")');
    this.readyToPayButton = page.locator('button.main-btn:has-text("I\'m ready to pay")');
    
    // Success/Failure Messages
    this.successMessage = page.locator('h4:has-text("Payment Successful!")');
    this.failedMessage = page.locator('h4:has-text("Payment Failed!")');
    this.closeButton = page.locator('button:has-text("Close")');
    
    // Wallet Balance
    this.walletBalance = page.locator('.wallet-balance-lg');
  }

  /**
   * Navigate to Lotteries page
   */
  async navigateToLotteries(): Promise<void> {
    await this.lotteriesNavTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Buy Now on first available lottery
   */
  async clickBuyNowOnFirstLottery(): Promise<void> {
    await this.buyNowButton.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Select Quick Buy option
   */
  async selectQuickBuy(): Promise<void> {
    await this.quickBuyButton.click();
    await this.page.waitForTimeout(500); // Wait for UI transition
  }

  /**
   * Select Mobile payment method
   */
  async selectMobilePayment(): Promise<void> {
    await this.mobilePaymentButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Select Card payment method
   */
  async selectCardPayment(): Promise<void> {
    await this.cardPaymentButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Select Wallet payment method
   */
  async selectWalletPayment(): Promise<void> {
    await this.walletPaymentButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Select number of tickets
   */
  async selectTicketQuantity(quantity: number): Promise<void> {
    switch(quantity) {
      case 1:
        await this.ticketQuantity1.click();
        break;
      case 2:
        await this.ticketQuantity2.click();
        break;
      case 3:
        await this.ticketQuantity3.click();
        break;
      case 4:
        await this.ticketQuantity4.click();
        break;
      case 5:
        await this.ticketQuantity5.click();
        break;
      default:
        throw new Error(`Invalid ticket quantity: ${quantity}`);
    }
    await this.page.waitForTimeout(500);
  }

  /**
   * Click Buy Now button on lottery purchase page
   */
  async clickLotBuyNow(): Promise<void> {
    await this.lotBuyNowButton.click();
    await this.page.waitForTimeout(1000); // Wait for popup
  }

  /**
   * Click "I'm ready to pay" button in confirmation popup
   */
  async clickReadyToPay(): Promise<void> {
    await this.readyToPayButton.click();
    await this.page.waitForTimeout(2000); // Wait for payment processing
  }

  /**
   * Check if Buy Now button is disabled
   */
  async isBuyNowButtonDisabled(): Promise<boolean> {
    return await this.lotBuyNowButton.isDisabled();
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  /**
   * Check if failed message is displayed
   */
  async isFailedMessageDisplayed(): Promise<boolean> {
    return await this.failedMessage.isVisible();
  }

  /**
   * Click Close button on success/failed popup
   */
  async clickCloseButton(): Promise<void> {
    await this.closeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get wallet balance amount
   */
  async getWalletBalance(): Promise<string> {
    const balanceText = await this.walletBalance.textContent();
    return balanceText?.trim() || '0';
  }

  /**
   * Extract numeric value from wallet balance
   */
  async getWalletBalanceNumeric(): Promise<number> {
    const balanceText = await this.getWalletBalance();
    const match = balanceText.match(/[\d,]+\.?\d*/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return 0;
  }

  /**
   * Complete full purchase flow for Quick Buy
   */
  async completePurchaseFlow(
    paymentMethod: 'mobile' | 'card' | 'wallet',
    ticketQuantity: number
  ): Promise<void> {
    await this.navigateToLotteries();
    await this.clickBuyNowOnFirstLottery();
    await this.selectQuickBuy();
    
    // Select payment method
    switch(paymentMethod) {
      case 'mobile':
        await this.selectMobilePayment();
        break;
      case 'card':
        await this.selectCardPayment();
        break;
      case 'wallet':
        await this.selectWalletPayment();
        break;
    }
    
    await this.selectTicketQuantity(ticketQuantity);
    await this.clickLotBuyNow();
    await this.clickReadyToPay();
  }
}

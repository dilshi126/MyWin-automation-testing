import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for Ticket Purchase functionality
 * Handles both Quick Buy and Search & Buy flows
 */
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

  // Search & Buy Elements
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultSelectButton: Locator;

  constructor(page: Page) {
    super(page);
    
    this.lotteriesNavTab = page.locator('a.nav-link-btn:has-text("Lotteries")');
    
    this.lotteryCard = page.locator('.carousel-card');
    this.buyNowButton = page.locator('button.buy-btn:has-text("Buy Now")');
    this.subscribeNowButton = page.locator('button.sub-btn:has-text("Subscribe Now")');
    
    this.quickBuyButton = page.locator('button.buy-switch-btn').filter({ hasText: 'Quick Buy' });
    this.searchBuyButton = page.locator('button.buy-switch-btn').filter({ hasText: 'Search & Buy' });
    
    this.mobilePaymentButton = page.locator('button.buy-switch-btn:has-text("Mobile")');
    this.cardPaymentButton = page.locator('button.buy-switch-btn:has-text("Card")');
    this.walletPaymentButton = page.locator('button.buy-switch-btn:has-text("Wallet")');
    
    this.ticketQuantity1 = page.locator('span.buy-select-btn').filter({ hasText: /^1$/ });
    this.ticketQuantity2 = page.locator('span.buy-select-btn').filter({ hasText: /^2$/ });
    this.ticketQuantity3 = page.locator('span.buy-select-btn').filter({ hasText: /^3$/ });
    this.ticketQuantity4 = page.locator('span.buy-select-btn').filter({ hasText: /^4$/ });
    this.ticketQuantity5 = page.locator('span.buy-select-btn').filter({ hasText: /^5$/ });
    
    this.lotBuyNowButton = page.locator('button.lot-buy-now-btn:has-text("Buy Now")');
    this.readyToPayButton = page.locator('button.main-btn:has-text("I\'m ready to pay")');
    
    this.successMessage = page.locator('h4:has-text("Payment Successful!")');
    this.failedMessage = page.locator('h4:has-text("Payment Failed!")');
    this.closeButton = page.locator('button:has-text("Close")');
    
    this.walletBalance = page.locator('.wallet-balance-lg');

    this.searchInput = page.locator('input.lucky-number-input').first();
    this.searchButton = page.locator('button.lucky-number-search-btn');
    this.searchResultSelectButton = page.locator('button.lucky-number-span-select-btn');
  }

  async navigateToLotteries(): Promise<void> {
    await this.lotteriesNavTab.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async clickBuyNowOnFirstLottery(): Promise<void> {
    await this.page.waitForTimeout(3000);
    
    const lotteryCards = this.page.locator('.carousel-card');
    const firstCard = lotteryCards.first();
    
    await firstCard.waitFor({ state: 'visible', timeout: 15000 });
    await firstCard.hover();
    await this.page.waitForTimeout(1000);
    
    const buyButton = firstCard.locator('button.buy-btn');
    await buyButton.waitFor({ state: 'visible', timeout: 5000 });
    await buyButton.click();
    
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);
  }

  async selectQuickBuy(): Promise<void> {
    await this.quickBuyButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.quickBuyButton.click();
    await this.page.waitForTimeout(1000);
  }

  async selectMobilePayment(): Promise<void> {
    await this.mobilePaymentButton.click();
    await this.page.waitForTimeout(500);
  }

  async selectCardPayment(): Promise<void> {
    await this.cardPaymentButton.click();
    await this.page.waitForTimeout(500);
  }

  async selectWalletPayment(): Promise<void> {
    await this.walletPaymentButton.click();
    await this.page.waitForTimeout(500);
  }

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
        throw new Error('Invalid ticket quantity: ' + quantity);
    }
    await this.page.waitForTimeout(500);
  }

  async clickLotBuyNow(): Promise<void> {
    await this.lotBuyNowButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickReadyToPay(): Promise<void> {
    await this.readyToPayButton.click();
    await this.page.waitForTimeout(2000);
  }

  async isBuyNowButtonDisabled(): Promise<boolean> {
    return await this.lotBuyNowButton.isDisabled();
  }

  async isSuccessMessageDisplayed(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async isFailedMessageDisplayed(): Promise<boolean> {
    return await this.failedMessage.isVisible();
  }

  async clickCloseButton(): Promise<void> {
    await this.closeButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getWalletBalance(): Promise<string> {
    const balanceText = await this.walletBalance.textContent();
    return balanceText?.trim() || '0';
  }

  async getWalletBalanceNumeric(): Promise<number> {
    const balanceText = await this.getWalletBalance();
    const match = balanceText.match(/[\d,]+\.?\d*/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return 0;
  }

  async selectSearchAndBuy(): Promise<void> {
    await this.searchBuyButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchBuyButton.click();
    await this.page.waitForTimeout(1000);
  }

  async enterSearchValue(value: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchInput.fill(value);
    await this.page.waitForTimeout(500);
  }

  async clickSearchButton(): Promise<void> {
    await this.searchButton.first().click();
    await this.page.waitForTimeout(2000);
  }

  async selectFirstSearchResult(): Promise<void> {
    await this.searchResultSelectButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.searchResultSelectButton.first().click();
    await this.page.waitForTimeout(1000);
  }
}

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

  // Search & Buy Elements
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultSelectButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Navigation
    this.lotteriesNavTab = page.locator('a.nav-link-btn:has-text("Lotteries")');
    
    // Lottery Selection
    this.lotteryCard = page.locator('.carousel-card');
    this.buyNowButton = page.locator('button.buy-btn:has-text("Buy Now")');
    this.subscribeNowButton = page.locator('button.sub-btn:has-text("Subscribe Now")');
    
    // Purchase Options - using more specific locators
    this.quickBuyButton = page.locator('button.buy-switch-btn').filter({ hasText: 'Quick Buy' });
    this.searchBuyButton = page.locator('button.buy-switch-btn').filter({ hasText: 'Search & Buy' });
    
    // Payment Methods
    this.mobilePaymentButton = page.locator('button.buy-switch-btn:has-text("Mobile")');
    this.cardPaymentButton = page.locator('button.buy-switch-btn:has-text("Card")');
    this.walletPaymentButton = page.locator('button.buy-switch-btn:has-text("Wallet")');
    
    // Ticket Quantity Selectors - using exact match
    this.ticketQuantity1 = page.locator('span.buy-select-btn').filter({ hasText: /^1$/ });
    this.ticketQuantity2 = page.locator('span.buy-select-btn').filter({ hasText: /^2$/ });
    this.ticketQuantity3 = page.locator('span.buy-select-btn').filter({ hasText: /^3$/ });
    this.ticketQuantity4 = page.locator('span.buy-select-btn').filter({ hasText: /^4$/ });
    this.ticketQuantity5 = page.locator('span.buy-select-btn').filter({ hasText: /^5$/ });
    
    // Purchase Actions
    this.lotBuyNowButton = page.locator('button.lot-buy-now-btn:has-text("Buy Now")');
    this.readyToPayButton = page.locator('button.main-btn:has-text("I\'m ready to pay")');
    
    // Success/Failure Messages
    this.successMessage = page.locator('h4:has-text("Payment Successful!")');
    this.failedMessage = page.locator('h4:has-text("Payment Failed!")');
    this.closeButton = page.locator('button:has-text("Close")');
    
    // Wallet Balance
    this.walletBalance = page.locator('.wallet-balance-lg');

    // Search & Buy Elements
    this.searchInput = page.locator('input.lucky-number-input').first();
    this.searchButton = page.locator('button.lucky-number-search-btn');
    this.searchResultSelectButton = page.locator('button.lucky-number-span-select-btn');
  }

  /**
   * Navigate to Lotteries page
   */
  async navigateToLotteries(): Promise<void> {
    await this.lotteriesNavTab.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000); // Wait for lottery cards to load
  }

  /**
   * Click Buy Now on first available lottery
   */
  async clickBuyNowOnFirstLottery(): Promise<void> {
    // Wait for page to load
    await this.page.waitForTimeout(3000);
    
    // Find the first lottery card and hover over it to reveal Buy Now button
    const lotteryCards = this.page.locator('.carousel-card');
    const firstCard = lotteryCards.first();
    
    // Wait for card to be visible
    await firstCard.waitFor({ state: 'visible', timeout: 15000 });
    
    // Hover over the card to reveal Buy Now button
    await firstCard.hover();
    await this.page.waitForTimeout(1000);
    
    // Now find and click the Buy Now button within this card
    const buyButton = firstCard.locator('button.buy-btn');
    await buyButton.waitFor({ state: 'visible', timeout: 5000 });
    await buyButton.click();
    
    console.log('✓ Clicked Buy Now on lottery');
    
    // Wait for navigation to MyWin page
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000); // Wait for page to fully render
  }

  /**
   * Select Quick Buy option
   */
  async selectQuickBuy(): Promise<void> {
    // Wait for the Quick Buy button to be visible
    await this.quickBuyButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.quickBuyButton.click();
    await this.page.waitForTimeout(1000); // Wait for UI transition
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

  // ==================== Search & Buy Methods ====================

  /**
   * Select Search & Buy option
   */
  async selectSearchAndBuy(): Promise<void> {
    await this.searchBuyButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchBuyButton.click();
    await this.page.waitForTimeout(1000); // Wait for UI transition
    console.log('✓ Selected Search & Buy option');
  }

  /**
   * Enter search value in the search input field
   */
  async enterSearchValue(value: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchInput.fill(value);
    await this.page.waitForTimeout(500);
    console.log(`✓ Entered search value: ${value}`);
  }

  /**
   * Click the search button
   */
  async clickSearchButton(): Promise<void> {
    await this.searchButton.first().click();
    await this.page.waitForTimeout(2000); // Wait for search results
    console.log('✓ Clicked Search button');
  }

  /**
   * Select first lottery from search results
   */
  async selectFirstSearchResult(): Promise<void> {
    await this.searchResultSelectButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.searchResultSelectButton.first().click();
    await this.page.waitForTimeout(1000);
    console.log('✓ Selected first lottery from search results');
  }

  /**
   * Complete Search & Buy flow
   */
  async completeSearchAndBuyFlow(
    paymentMethod: 'mobile' | 'card' | 'wallet',
    searchValue: string = '1'
  ): Promise<void> {
    // Select Search & Buy option
    await this.selectSearchAndBuy();
    
    // Select payment method first
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
    
    // Enter search value and search
    await this.enterSearchValue(searchValue);
    await this.clickSearchButton();
    
    // Select first result
    await this.selectFirstSearchResult();
  }
}

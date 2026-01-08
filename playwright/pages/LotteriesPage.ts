import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LotteriesPage extends BasePage {
  // Navigation
  readonly lotteriesLink: Locator;
  
  // Lottery selection
  readonly subscribeNowButton: Locator;
  readonly buyNowButton: Locator;
  
  // Payment method
  readonly mobilePaymentOption: Locator;
  
  // Ticket quantity
  readonly oneTicketOption: Locator;
  readonly fiveTicketsOption: Locator;
  
  // Purchase options
  readonly randomPickOption: Locator;
  readonly searchAndBuyOption: Locator;
  
  // Confirmation
  readonly confirmSubscribeButton: Locator;
  readonly confirmBuyButton: Locator;
  readonly readyToPayButton: Locator;
  
  // Popups
  readonly confirmationPopup: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    super(page);
    // TODO: Update these selectors with actual HTML from MyWin.lk
    this.lotteriesLink = page.locator('text=Lotteries');
    this.subscribeNowButton = page.locator('button:has-text("Subscribe Now")');
    this.buyNowButton = page.locator('button:has-text("Buy Now")');
    this.mobilePaymentOption = page.locator('text=Mobile');
    this.oneTicketOption = page.locator('text=1 Ticket');
    this.fiveTicketsOption = page.locator('text=5 Tickets');
    this.randomPickOption = page.locator('text=Random Pick');
    this.searchAndBuyOption = page.locator('text=Search and Buy');
    this.confirmSubscribeButton = page.locator('button:has-text("Subscribe Now")');
    this.confirmBuyButton = page.locator('button:has-text("Buy Now")');
    this.readyToPayButton = page.locator('button:has-text("I\'m Ready to Pay")');
    this.confirmationPopup = page.locator('.confirmation-popup, .modal');
    this.successNotification = page.locator('.success-notification, .alert-success');
  }

  async navigateToLotteries() {
    await this.lotteriesLink.click();
    await this.waitForPageLoad();
  }

  async selectLotteryForSubscription(lotteryName?: string) {
    // Click Subscribe Now for the lottery
    await this.subscribeNowButton.first().click();
    await this.waitForPageLoad();
  }

  async selectLotteryForPurchase(lotteryName?: string) {
    // Click Buy Now for the lottery
    await this.buyNowButton.first().click();
    await this.waitForPageLoad();
  }

  async selectMobilePayment() {
    await this.mobilePaymentOption.click();
  }

  async selectTicketQuantity(quantity: number) {
    if (quantity === 1) {
      await this.oneTicketOption.click();
    } else if (quantity === 5) {
      await this.fiveTicketsOption.click();
    }
  }

  async selectRandomPick() {
    await this.randomPickOption.click();
  }

  async selectSearchAndBuy() {
    await this.searchAndBuyOption.click();
  }

  async clickSubscribeNow() {
    await this.confirmSubscribeButton.click();
    await this.waitForPageLoad();
  }

  async clickBuyNow() {
    await this.confirmBuyButton.click();
    await this.waitForPageLoad();
  }

  async confirmPayment() {
    await this.readyToPayButton.click();
    await this.waitForPageLoad();
  }

  async isConfirmationPopupVisible(): Promise<boolean> {
    try {
      await this.confirmationPopup.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isSuccessNotificationVisible(): Promise<boolean> {
    try {
      await this.successNotification.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }
}

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyAccountPage extends BasePage {
  // Navigation
  readonly myAccountButton: Locator;
  
  // Tabs
  readonly subscriptionsTab: Locator;
  readonly myTicketsTab: Locator;
  
  // Subscription management
  readonly subscriptionsList: Locator;
  readonly activeSubscription: Locator;
  readonly deactivateButton: Locator;
  readonly confirmDeactivateButton: Locator;
  
  // Tickets
  readonly ticketsList: Locator;
  readonly ticketDetails: Locator;

  constructor(page: Page) {
    super(page);
    // TODO: Update these selectors with actual HTML from MyWin.lk
    this.myAccountButton = page.locator('button.profile-btn:has-text("My Account")');
    this.subscriptionsTab = page.locator('text=Subscriptions');
    this.myTicketsTab = page.locator('text=My Tickets');
    this.subscriptionsList = page.locator('.subscriptions-list, .subscription-item');
    this.activeSubscription = page.locator('.active-subscription, .subscription-active');
    this.deactivateButton = page.locator('button:has-text("Deactivate")');
    this.confirmDeactivateButton = page.locator('button:has-text("Confirm"), button:has-text("Yes")');
    this.ticketsList = page.locator('.tickets-list, .ticket-item');
    this.ticketDetails = page.locator('.ticket-details');
  }

  async navigateToMyAccount() {
    await this.myAccountButton.click();
    await this.waitForPageLoad();
  }

  async goToSubscriptionsTab() {
    await this.subscriptionsTab.click();
    await this.waitForPageLoad();
  }

  async goToMyTicketsTab() {
    await this.myTicketsTab.click();
    await this.waitForPageLoad();
  }

  async deactivateSubscription() {
    await this.deactivateButton.first().click();
    await this.page.waitForTimeout(1000);
  }

  async confirmDeactivation() {
    await this.confirmDeactivateButton.click();
    await this.waitForPageLoad();
  }

  async isActiveSubscriptionVisible(): Promise<boolean> {
    try {
      await this.activeSubscription.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async areTicketsVisible(): Promise<boolean> {
    try {
      await this.ticketsList.first().waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getTicketCount(): Promise<number> {
    return await this.ticketsList.count();
  }
}

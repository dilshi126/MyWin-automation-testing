import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly logo: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('img[alt*="logo"], img[alt*="Logo"], .logo');
    this.searchBox = page.locator('input[type="search"], input[placeholder*="Search"]');
  }

  async open() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async isLogoVisible(): Promise<boolean> {
    try {
      await this.logo.first().waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

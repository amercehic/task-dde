import type { Page, Locator } from '@playwright/test';

export class Header {
  private readonly accountFlyoutButton: Locator;

  constructor(private readonly page: Page) {
    this.accountFlyoutButton = page.getByTestId('account-flyout-profile-button');
  }

  async openAccountFlyout(): Promise<void> {
    await this.accountFlyoutButton.click();
  }
}

import { test as base } from '@playwright/test';
import { RegistrationPage } from '@pages/RegistrationPage';

type PageFixtures = {
  registrationPage: RegistrationPage;
};

export const test = base.extend<PageFixtures>({
  page: async ({ page }, use) => {
    await page.route(
      (url) => url.hostname.includes('usercentrics'),
      (route) => route.abort(),
    );
    await use(page);
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { expect } from '@playwright/test';

import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import type { RegistrationData } from '@app-types/index';
import { PasswordHint } from '@app-types/index';
import { Header } from './components';

export class RegistrationPage {
  readonly header: Header;

  private readonly form: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly dateOfBirthInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
    this.form = page.locator('form', { has: page.locator('[name="firstName"]') });
    this.firstNameInput = this.form.locator('[name="firstName"]');
    this.lastNameInput = this.form.locator('[name="lastName"]');
    this.dateOfBirthInput = this.form.locator('[name="dateOfBirth"]');
    this.emailInput = this.form.locator('[name="email"]');
    this.passwordInput = this.form.locator('[name="password"]');
    this.submitButton = this.form.getByTestId('button-primary');
  }

  async open(): Promise<void> {
    await this.header.openAccountFlyout();
  }

  async fillForm(data: RegistrationData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dateOfBirthInput.fill(data.dateOfBirth);
    await this.selectGender(data.gender);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
  }

  async selectGender(value: 'f' | 'm' | 'u'): Promise<void> {
    await this.form.locator(`[name="gender"][value="${value}"]`).click();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.open();
    await this.fillForm(data);
    await this.submit();
  }

  async expectFormFilled(data: RegistrationData): Promise<void> {
    await expect(this.firstNameInput).toHaveValue(data.firstName);
    await expect(this.lastNameInput).toHaveValue(data.lastName);
    await expect(this.dateOfBirthInput).toHaveValue(data.dateOfBirth);
    await expect(this.form.locator(`[name="gender"][value="${data.gender}"]`)).toBeChecked();
    await expect(this.emailInput).toHaveValue(data.email);
    await expect(this.passwordInput).toHaveValue(data.password);
  }

  async expectSubmitButtonVisible(): Promise<void> {
    await expect(this.submitButton).toBeVisible();
  }

  async expectDateOfBirthError(): Promise<void> {
    const errorText = this.form
      .locator('.registration__form-column', { has: this.page.locator('[name="dateOfBirth"]') })
      .getByTestId('input-error');
    await expect(errorText).toBeVisible();
  }

  async expectPasswordHintsInvalid(expected: PasswordHint[]): Promise<void> {
    const hints = this.form.getByTestId('password-hint-list').locator('li');
    for (const hint of expected) {
      await expect(hints.nth(hint)).toHaveAttribute('data-testid', 'password-hint-invalid');
    }
  }
}

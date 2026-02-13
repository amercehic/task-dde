import { test } from "@fixtures/index";
import { generateRegistrationData } from "@utils/test-data";
import { PasswordHint } from "@app-types/index";

test.describe("Registration", () => {
  test("should fill registration form up to submit", async ({
    page,
    registrationPage,
  }) => {
    const registrationData = generateRegistrationData();

    await page.goto("/");
    await registrationPage.open();
    await registrationPage.fillForm(registrationData);

    await registrationPage.expectFormFilled(registrationData);
    await registrationPage.expectSubmitButtonVisible();
  });

  test("should show error when user is not old enough", async ({
    page,
    registrationPage,
  }) => {
    const underageData = generateRegistrationData({
      dateOfBirth: "01.01.2025",
    });

    await page.goto("/");
    await registrationPage.open();
    await registrationPage.fillForm(underageData);
    await registrationPage.submit();

    await registrationPage.expectDateOfBirthError();
  });

  test("should show error when password is not strong enough", async ({
    page,
    registrationPage,
  }) => {
    const weakPasswordData = generateRegistrationData({
      password: "abc",
    });

    await page.goto("/");
    await registrationPage.open();
    await registrationPage.fillForm(weakPasswordData);
    await registrationPage.submit();

    await registrationPage.expectPasswordHintsInvalid([
      PasswordHint.MinLength,
      PasswordHint.Uppercase,
      PasswordHint.SpecialChar,
      PasswordHint.Number,
    ]);
  });
});

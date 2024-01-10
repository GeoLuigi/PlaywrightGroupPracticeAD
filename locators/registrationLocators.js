export const registrationLocators = {
    firstnameField : '#firstname',
    lastnameField : '#lastname',
    emailField : '#email_address',
    passwordField : '#password',
    confirmField : '#password-confirmation',
    strenghtText : '#password-strength-meter',
    createAccountButton: 'button[title="Create an Account"]',
    firstNameLabel: 'label:has-text("First Name")',
    lastNameLabel: 'label:has-text("Last Name")',
    emailLabel: 'label:has-text("Email")',
    passwordLabel: 'label:has-text("Password")',
    passwordStrengthLabel: '#password-strength-meter-label',
    passwordConfirmationError: '#password-confirmation-error',
    passwordError: '#password-error',
    emailError: '#email_address-error',
    lastNameError: '#lastname-error',
    firstNameError: '#firstname-error',
    
}
/* import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
  await page.getByRole('button', { name: 'Create an Account' }).click();
  await page.getByLabel('First Name').click();
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Email', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Password*', exact: true }).click();
  await page.getByText('Password Strength: No Password').click();
  await page.locator('#password-confirmation-error').click();
  await page.locator('#password-error').click();
  await page.locator('#email_address-error').click();
  await page.locator('#lastname-error').click();
  await page.locator('#firstname-error').click();
  await page.getByRole('button', { name: 'Create an Account' }).click();


  import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
  await page.getByText('First Name').click();
  await page.locator('label').filter({ hasText: 'First Name' }).click();
  await page.getByText('Last Name').click();
  await page.locator('label').filter({ hasText: 'Last Name' }).click();
  await page.getByText('Email', { exact: true }).click();
  await page.locator('label').filter({ hasText: /^Email$/ }).click();
  await page.locator('#form-validate').getByText('Password', { exact: true }).click();
  await page.locator('#form-validate label').filter({ hasText: /^Password$/ }).click();
  await page.getByText('Confirm Password').click();
  await page.locator('label').filter({ hasText: 'Confirm Password' }).click();
});
});*/
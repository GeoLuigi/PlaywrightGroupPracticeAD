// registrationTest.js
import { test , expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword } from '../helpers/faker';

test('First Test', async ({ page }) => {
    
    const registrationPage = new RegistrationPage(page);
    const firstName = generateRandomFirstName();
    const lastName = generateRandomLastName();
    const email = generateRandomEmail(); 
    
    await page.goto('https://magento.softwaretestingboard.com/customer/account/create/'); 
    await registrationPage.fillRegistrationForm(firstName,lastName,email,'.Hola123','.Hola12');
    await registrationPage.clickCreateAccountButton();
    
});

test('ECA-3 | Verify Presence of Mandatory Fields in Personal Information Section',async({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await page.goto('https://magento.softwaretestingboard.com/customer/account/create/'); 
    // Obtener los valores de aria-required
    
    const ariaRequiredValues = await registrationPage.getMandatoryFieldsAriaRequired();
    // Verificar que al menos un campo sea requerido
    expect(ariaRequiredValues.some(value => value === 'true')).toBe(true);
    // Obtener todos los textos de los labels utilizando un solo método
    const labelValues = await registrationPage.getLabelText();

    // Verificar que los textos de los labels sean correctos
    expect(labelValues.firstName).toBe('First Name');
    expect(labelValues.lastName).toBe('Last Name');
    expect(labelValues.email).toBe('Email');
    expect(labelValues.password).toBe('Password');
})

test('ECA-4 | Verify Mandatory Email Field in Sign-in Information Section', async({ page }) => {
    
})

test('ECA-5 | Verify Handling of Invalid Email After Clicking [Create an Account] Button', async({ page }) => {
    
})

test('ECA-6 | Verify Password Field and Dynamic Strength Indicator', async({ page }) => {
    
})

test('ECA-7 | Verify Handling of Invalid Password After Clicking [Create an Account]', async({ page }) => {
    
})

test('ECA-8 | Verify Presence of Mandatory Password Confirmation Field', async({ page }) => {
    
})

test('ECA-9 | Verify Handling of Password Mismatch After Clicking [Create an Account] Button', async({ page }) => {
    
})

test('ECA-10 | Verify Clear Error Messages for Blank/Missing Fields After Clicking [Create an Account]', async({ page }) => {
    
})

test('ECA-11 | Verify Successful Registration and Redirection to Profile Page', async({ page }) => {
    
})

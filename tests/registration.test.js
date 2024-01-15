// registrationTest.js
import { test , expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword, generateRandomInvalidEmail } from '../helpers/faker';

    const firstName = generateRandomFirstName();
    const lastName = generateRandomLastName();
    const email = generateRandomEmail();
    const invalidemail = 'invalid';
    let registrationPage;
    let url = 'https://magento.softwaretestingboard.com/customer/account/create/';

test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await page.goto(url);
});

test('ECA-3 | Verify Mandatory Fields on Registration Page form',async({ page }) => { 
    
    await page.waitForTimeout(2000)

    // Obtener los valores de aria-required
    const ariaRequiredValues = await registrationPage.getMandatoryFieldsAriaRequired();
    // Verificar que al menos un campo sea requerido
    expect(ariaRequiredValues.every(value => value === 'true')).toBe(true);
    // Obtener todos los textos de los labels utilizando un solo método
    const labelValues = await registrationPage.getLabelText();

    // Verificar que los textos de los labels sean correctos
    expect(labelValues.firstName).toBe('First Name');
    expect(labelValues.lastName).toBe('Last Name');
    expect(labelValues.email).toBe('Email');
    expect(labelValues.password).toBe('Password');
})
// deprecaded
test('ECA-4 | Verify Mandatory Email Field in Sign-in Information Section', async({ page }) => {
    
})

test('ECA-5 | Verify Handling of Invalid Email After Clicking [Create an Account] Button', async({ page }) => {
    
    await registrationPage.fillRegistrationForm('','',invalidemail,'','');
    await registrationPage.clickCreateAccountButton();
    const errorEmailMessage = await registrationPage.getErrorMessages();
    
    expect(errorEmailMessage.Invalidemail).toBe('Please enter a valid email address (Ex: johndoe@domain.com).')
    

})

test('ECA-6 | Verify Password Field and Dynamic Strength Indicator', async({ page }) => {
    
    await page.waitForTimeout(2000)
    let passwordStrengthLabel = await registrationPage.getPasswordStrengthText();
    await registrationPage.fillRegistrationForm('','','','','');
    expect(passwordStrengthLabel).toBe('No Password');
    
    await registrationPage.fillRegistrationForm('','','','Hola','');
    passwordStrengthLabel = await registrationPage.getPasswordStrengthText();
    
    await page.waitForTimeout(2000);
    expect(passwordStrengthLabel).toBe('Weak');
    
    await registrationPage.fillRegistrationForm('','','','.Hola123','');
    passwordStrengthLabel = await registrationPage.getPasswordStrengthText();
    await page.waitForTimeout(2000)
    expect(passwordStrengthLabel).toBe('Medium');

    
    await registrationPage.fillRegistrationForm('','','','.Hola123.','');
    passwordStrengthLabel = await registrationPage.getPasswordStrengthText();
    await page.waitForTimeout(2000)
    expect(passwordStrengthLabel).toBe('Strong');
    
    await registrationPage.fillRegistrationForm('','','','.Hola123.123','');
    passwordStrengthLabel = await registrationPage.getPasswordStrengthText();
    await page.waitForTimeout(2000)
    expect(passwordStrengthLabel).toBe('Very Strong');
    
    
})

test('ECA-7 | Verify Handling of Invalid Password', async({ page }) => {
    
    await registrationPage.fillRegistrationForm('','','','ola','');
    await page.waitForTimeout(2000)
    const passwordErrorMessage = await registrationPage.getPasswordErrorMessage(); // Debes llamarlo como una función asíncrona
    expect(passwordErrorMessage).toBe('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');})

// Deprecated, because its already on ECA3 
test('ECA-8 | Verify Presence of Mandatory Password Confirmation Field', async({ page }) => {
    
})

test('ECA-9 | Verify Handling of Password Mismatch After Clicking [Create an Account] Button', async({ page }) => {
    
    await registrationPage.fillRegistrationForm('','','','ola','passw');
    await registrationPage.clickCreateAccountButton();
    const errorMessages = await registrationPage.getErrorMessages();
    expect(errorMessages.passwordConfirmationError).toBe('Please enter the same value again.');
})

test('ECA-10 | Verify Clear Error Messages for Blank/Missing Fields After Clicking [Create an Account]', async({ page }) => {
    await registrationPage.fillRegistrationForm('','','','','')
    await registrationPage.clickCreateAccountButton();

    const requiredFields = await registrationPage.getErrorMessages();
    expect(requiredFields.firstNameErrorRequired).toBe('This is a required field.');
    expect(requiredFields.lastNameErrorRequired).toBe('This is a required field.');
    expect(requiredFields.Invalidemail).toBe('This is a required field.');
    expect(requiredFields.Invalidpassword).toBe('This is a required field.');
    expect(requiredFields.passwordConfirmationError).toBe('This is a required field.');
    
})

test('ECA-11 | Verify Successful Registration and Redirection to Profile Page', async({ page }) => {
    await registrationPage.fillRegistrationForm(firstName,lastName,email,'.Hola123','.Hola123');
    await registrationPage.clickCreateAccountButton();
    const currentUrl = page.url();
    expect(currentUrl).toBe('https://magento.softwaretestingboard.com/customer/account/');
})

import { test , expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { generateRandomPassword} from '../helpers/faker';

    const invalidEmail = 'invalid';
    const InvalidPassword = generateRandomPassword();
    const validEmail = 'Tester99@gmail.com'
    let loginPage;
    let url = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2NyZWF0ZS8%2C/';

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(url);
});

test('ECA-15 | Verify Login Section for Registered Customers',async({ page }) => { 

    const customerLoginText = await loginPage.getCustomerLoginText();
    expect(customerLoginText.trim()).toBe('Customer Login');
})

test('ECA-16 | Verify Mandatory Email and Password Fields in Login Section',async({ page }) => { 
        
        await loginPage.page.waitForTimeout(2000);
        // Obtener los valores de aria-required
        const ariaRequiredValues = await loginPage.getMandatoryFieldsAriaRequired();
        // Verificar que al menos un campo sea requerido
        expect(ariaRequiredValues.every(value => value === 'true')).toBe(true);
        // Obtener todos los textos de los labels utilizando un solo método
})

test('ECA-17 | Verify Handling of Missing Email and Password After Clicking [Sign In] Button',async({ page }) => { 
    
    await loginPage.page.waitForTimeout(1000);
    await loginPage.clickSignInButton();
    await loginPage.page.waitForTimeout(1000);

    const labelValues = await loginPage.getLabelErrorText();

    // Verificar que los textos de los labels sean correctos
    expect(labelValues.emailError).toBe('This is a required field.');
    expect(labelValues.passwordError).toBe('This is a required field.');

})

test('ECA-18 | Verify Handling of Invalid Email After Clicking [Sign In] Button',async({ page }) => { 
    await loginPage.fillLoginForm(invalidEmail,'');
    await loginPage.page.waitForTimeout(1000);
    await loginPage.clickSignInButton();
    await loginPage.page.waitForTimeout(1000);
    const labelValues = await loginPage.getLabelErrorText();
    expect(labelValues.emailError).toBe('Please enter a valid email address (Ex: johndoe@domain.com).');
})

test('ECA-19 | Verify Handling of Invalid Password for a valid Email After Clicking [Sign In] Button',async({ page }) => { 
    await loginPage.fillLoginForm(validEmail,InvalidPassword);
    await loginPage.page.waitForTimeout(1000);
    await loginPage.clickSignInButton();
    await loginPage.page.waitForTimeout(1000);

    const errorMessageText = await loginPage.getErrorMessageTextWrongPassword();
    expect(errorMessageText.trim()).toBe('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
})

test('ECA-20 | Verify "Forgot Your Password?" Link Functionality',async({ page }) => { 
    await loginPage.clickForgotPasswordLink();
    const updatedUrl = page.url();
    expect(updatedUrl).toBe('https://magento.softwaretestingboard.com/customer/account/forgotpassword/');

})

test('ECA-21 | Verify Presence of [Create an Account] Button',async({ page }) => { 
    await loginPage.clickCreateAccountLink();
    const updatedUrl = page.url();
    expect(updatedUrl).toBe('https://magento.softwaretestingboard.com/customer/account/create/');

})

//Deprecated, it testest on ECA-21
test('ECA-2 | Verify Redirection after Clicking on [Create an Account] button',async({ page }) => {

})

test('ECA-22 | Verify Successful Login and Redirection with Valid Credentials',async({ page }) => { 
    await loginPage.fillLoginForm(validEmail,'.Tester99');
    await loginPage.page.waitForTimeout(1000);
    await loginPage.clickSignInButton();
    await loginPage.page.waitForTimeout(1000);
    const updatedUrl = page.url();
    expect(updatedUrl).toBe('https://magento.softwaretestingboard.com/customer/account/');


})


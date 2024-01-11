import { test , expect } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword, generateRandomInvalidEmail } from '../helpers/faker';
import { LoginPage } from '../pages/loginPage';
import []
    const validEmail = 'Tester99@gmail.com'
    const password = '.Tester99'
    let cartPage;
    let loginPage;
    let urlLogin = 'https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2NyZWF0ZS8%2C/';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto(urlLogin);
        await loginPage.fillLoginForm(validEmail,password);
        await loginPage.page.waitForTimeout(1000);
        await loginPage.clickSignInButton();
});

test('ECA-3 | Verify Mandatory Fields on Registration Page form',async({ page }) => { 
    
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
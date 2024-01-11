import { registrationLocators } from "../locators/registrationLocators";

export class RegistrationPage {
    constructor(page){
        this.page = page;
        //this.url = 'https://magento.softwaretestingboard.com/customer/account/create/';
        this.firstnameField = registrationLocators.firstnameField;
        this.lastnameField = registrationLocators.lastnameField;
        this.emailField = registrationLocators.emailField;
        this.passwordField = registrationLocators.passwordField;
        this.confirmField = registrationLocators.confirmField;
        this.strengthText = registrationLocators.strengthText;
        this.createAccountButton = registrationLocators.createAccountButton;
        this.firstNameLabel = registrationLocators.firstNameLabel;
        this.lastNameLabel = registrationLocators.lastNameLabel;
        this.emailLabel = registrationLocators.emailLabel;
        this.passwordLabel = registrationLocators.passwordLabel;
        this.passwordStrengthLabel = registrationLocators.passwordStrengthLabel;
        this.passwordConfirmationError = registrationLocators.passwordConfirmationError;
        this.passwordError = registrationLocators.passwordError;
        this.emailError = registrationLocators.emailError;
        this.lastNameError = registrationLocators.lastNameError;
        this.firstNameError = registrationLocators.firstNameError;
    }
    async fillRegistrationForm(firstName, lastName, email, password, pswdConfirm) {
        await this.page.fill(this.firstnameField, firstName);
        await this.page.fill(this.lastnameField, lastName);
        await this.page.fill(this.emailField, email);
        await this.page.fill(this.passwordField, password);
        await this.page.fill(this.confirmField, pswdConfirm);

    }

    async clickCreateAccountButton() {
        await this.page.click(this.createAccountButton);
    }

    async getPasswordStrengthText() {
        return await this.page.textContent(this.strengthText);
    }
 // Dentro de RegistrationPage
    async getMandatoryFieldsAriaRequired() {
        const ariaRequiredValues = [
        await this.page.getAttribute(this.firstnameField, 'aria-required'),
        await this.page.getAttribute(this.lastnameField, 'aria-required'),
        await this.page.getAttribute(this.emailField, 'aria-required'),
        await this.page.getAttribute(this.passwordField, 'aria-required'),
    ];
    return ariaRequiredValues;
}
    async getLabelText(labelText) {
    const labelValues = {
        firstName: await this.page.textContent(this.firstNameLabel),
        lastName: await this.page.textContent(this.lastNameLabel),
        email: await this.page.textContent(this.emailLabel),
        password: await this.page.textContent(this.passwordLabel),
        // Puedes agregar otros labels según sea necesario
    };
    
    return labelValues;
    }
    async getErrorMessages() {
        const errorValues = {
            firstNameErrorRequired: await this.page.textContent(this.firstNameError),
            lastNameErrorRequired: await this.page.textContent(this.lastNameError),
            Invalidemail: await this.page.textContent(this.emailError),
            Invalidpassword: await this.page.textContent(this.passwordError),
            passwordConfirmationError: await this.page.textContent(this.passwordConfirmationError),
            // Agrega otros mensajes de error según sea necesario
        }
        return errorValues;
    }
    async getPasswordStrengthText() {
        // Utiliza el selector específico para el elemento span
        const passwordStrengthLabel = await this.page.textContent(this.passwordStrengthLabel);
        return passwordStrengthLabel.trim(); // Trima cualquier espacio en blanco alrededor del texto
    }
    async getPasswordErrorMessage() {
        await this.page.waitForSelector(this.passwordError);
        const passwordErrorMessage = await this.page.textContent(this.passwordError);
        return passwordErrorMessage;
    }
    
    
}
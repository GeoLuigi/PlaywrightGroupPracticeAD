import { registrationLocators } from "../locators/registrationLocators";

export class RegistrationPage {
    constructor(page){
        this.page = page;
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
        await this.page.fill(registrationLocators.firstnameField, firstName);
        await this.page.fill(registrationLocators.lastnameField, lastName);
        await this.page.fill(registrationLocators.emailField, email);
        await this.page.fill(registrationLocators.passwordField, password);
        await this.page.fill(registrationLocators.confirmField, pswdConfirm);

    }

    async clickCreateAccountButton() {
        await this.page.click(registrationLocators.createAccountButton);
    }

    async getPasswordStrengthText() {
        return await this.page.textContent(registrationLocators.strengthText);
    }
    async getMandatoryFieldsLabels() {
        const labels = [
            await this.page.textContent(firstNameLabel),
            await this.page.textContent(lastNameLabel),
            await this.page.textContent(emailLabel),
            await this.page.textContent(passwordLabel),
            await this.page.textContent(passwordStrengthLabel)
        ];
        return labels;
    }
}
import { log } from "console";
import { loginLocators } from "../locators/loginLocators";

export class LoginPage {
    constructor(page){
        this.page = page;
        this.customerLoginLocator = loginLocators.customerLoginLocator;
        this.emailField = loginLocators.emailField;
        this.passwordField = loginLocators.passwordField;
        this.passwordError = loginLocators.passwordError;
        this.emailError = loginLocators.emailError;
        this.signInButton = loginLocators.signInButton;
        this.wrongPassword = loginLocators.wrongPassword;
        this.forgotPasswordLink = loginLocators.forgotPasswordLink;
        this.createAccountLink = loginLocators.createAccountLink;
        this.logoutOptions = loginLocators.logoutOptions;
        this.logoutButton = loginLocators.logoutButton;

    }
    async fillLoginForm(emailField, passwordField) {
        await this.page.fill(this.emailField, emailField);
        await this.page.fill(this.passwordField, passwordField);

    }
    async getCustomerLoginText() {
        await this.page.waitForSelector(this.customerLoginLocator);
        return await this.page.textContent(this.customerLoginLocator);
    }
    async getMandatoryFieldsAriaRequired() {
        const ariaRequiredValues = [
        await this.page.getAttribute(this.emailField, 'aria-required'),
        await this.page.getAttribute(this.passwordField, 'aria-required'),
    ];
    return ariaRequiredValues;
    }
    
    async getLabelErrorText() {
        await this.page.waitForSelector(this.passwordError);
        const labelValues = {
            emailError: await this.page.textContent(this.emailError),
            passwordError: await this.page.textContent(this.passwordError),
            // Puedes agregar otros labels según sea necesario
        };
        
        return labelValues;
    }
    
    async clickSignInButton() {
        await this.page.click(this.signInButton);
    }

    async getErrorMessageTextWrongPassword() {
        await this.page.waitForSelector(this.wrongPassword);
        return await this.page.textContent(this.wrongPassword);
    }

    async clickForgotPasswordLink() {
        await this.page.click(this.forgotPasswordLink);
    }

    async clickCreateAccountLink() {
        await this.page.click(this.createAccountLink);
    }
    async clickChangeButton() {
        await this.page.click(this.logoutOptions);
    }
    
    async clickSignOutLink() {
        await this.page.click(this.logoutButton);
    }
}
import { checkoutLocators as locators } from "../locators/checkoutLocators"

export class CheckoutPage {
    constructor(page) {
        this.page = page
    }

    async registerAddress(address, city, zip, phone) {
        await this.page.fill(locators.addressField, address)
        await this.page.fill(locators.cityField, city)
        await this.page.locator(locators.regionList).selectOption('1')
        await this.page.fill(locators.zipCodeField, zip)
        await this.page.fill(locators.phoneNumberField, phone)

        await this.page.getByLabel('Fixed').check()
        await this.page.getByRole('button', { name: 'Next' }).click()
    }

    async clickOnPlaceOrderBtn(){
        await this.page.click('button.action.primary.checkout')
    }
}
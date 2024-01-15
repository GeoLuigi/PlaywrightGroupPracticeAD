import { test, expect } from '@playwright/test'
import { dataHelper as helper} from '../helpers/dataHelper'
import { checkoutLocators as checkLocators } from '../locators/checkoutLocators'
import { CheckoutPage } from '../pages/checkoutPage'
import { RegistrationPage } from '../pages/registrationPage'
import { TopsWomenPage } from '../pages/topsWomenPage'
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword } from '../helpers/faker'
import exp from 'constants'

test.beforeEach(async ({ page }, testInfo) => {
    const registrationPage = new RegistrationPage(page)
    const topsWomenPage = new TopsWomenPage(page)
    const registrationUrl = 'https://magento.softwaretestingboard.com/customer/account/create/'
    const waitTime = 2000

    testInfo.setTimeout(200000)

    const firstName = generateRandomFirstName()
    const lastName = generateRandomLastName()
    const email = generateRandomEmail()
    const password = generateRandomPassword()

    // Registration Page
    await page.goto(registrationUrl)
    await registrationPage.fillRegistrationForm( firstName, lastName, email, password, password)
    await registrationPage.clickCreateAccountButton()

    // Purchase Page
    await page.goto(topsWomenPage.getUrl())
    await topsWomenPage.selectAntoniaClothing()
    await page.waitForTimeout(waitTime)
    await topsWomenPage.selectZoeClothing()
    await page.waitForTimeout(waitTime)
    await topsWomenPage.selectBellaClothing()
    await page.waitForTimeout(waitTime)
    await topsWomenPage.clickOnCartBtn()
    await page.waitForTimeout(waitTime)
    await topsWomenPage.clickOnCheckoutBtn()
    await page.waitForTimeout(5000)
})

test('ECA-55 | Verify successful entry of complete mandatory Shipping Address details', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)

    await page.waitForSelector(checkLocators.cartSummaryItemsCount)
    const cartItemCountText = await page.$eval(checkLocators.cartSummaryItemsCount, element => element.textContent)
    expect(cartItemCountText).toContain('3')

    const pageTitle = await page.title()
    expect(pageTitle).toBe('Checkout')

    await checkoutPage.registerAddress(helper.address, helper.city, helper.zipCode, helper.phoneNumber)
    await page.waitForTimeout(5000)

    const currentUrl = page.url()
    expect(currentUrl).toBe('https://magento.softwaretestingboard.com/checkout/#payment')
})
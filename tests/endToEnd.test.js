import { test , expect } from '@playwright/test'
import { dataHelper as helper} from '../helpers/dataHelper'
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword } from '../helpers/faker'
import { RegistrationPage } from '../pages/registrationPage'
import { TopsWomenPage } from '../pages/topsWomenPage'
import { CheckoutPage } from '../pages/checkoutPage'
import { checkoutLocators as checkLocators } from '../locators/checkoutLocators'
import { LoginPage } from '../pages/loginPage'

const registrationUrl = 'https://magento.softwaretestingboard.com/customer/account/create/'
const waitTime = 2000

helper.firstName = generateRandomFirstName()
helper.lastName = generateRandomLastName()
helper.email = generateRandomEmail()
helper.password = generateRandomPassword()



test('End to End Test', async ({ page }, testInfo) => {
    const registrationPage = new RegistrationPage(page)
    const topsWomenPage = new TopsWomenPage(page)
    const loginPage = new LoginPage(page)

    testInfo.setTimeout(200000)

    // Registration Page
    await page.goto(registrationUrl)
    await registrationPage.fillRegistrationForm(helper.firstName,helper.lastName,helper.email,helper.password, helper.password)
    await registrationPage.clickCreateAccountButton()
    await page.waitForTimeout(10000)

    const currentUrl = page.url()
    expect(currentUrl).toBe('https://magento.softwaretestingboard.com/customer/account/')

    // Tops Women Page Module
    await page.goto(topsWomenPage.getUrl())
    await topsWomenPage.selectAntoniaClothing()
    await page.waitForTimeout(waitTime)
    await topsWomenPage.selectZoeClothing()
    await page.waitForTimeout(waitTime)
    await topsWomenPage.selectBellaClothing()
    await page.waitForTimeout(waitTime)
    await topsWomenPage.clickOnCartBtn()
    await page.waitForTimeout(waitTime)

    const cartItemCount = await page.innerText('.count')
    expect(cartItemCount).toBe('3')

    await topsWomenPage.clickOnCheckoutBtn()
    await page.waitForTimeout(waitTime)

    expect(page.url()).toBe('https://magento.softwaretestingboard.com/checkout/#shipping', 'Incorrect redirection')

    // Checkout Page
    const checkoutPage = new CheckoutPage(page)

    await page.waitForSelector(checkLocators.cartSummaryItemsCount)
    const cartItemCountText = await page.$eval(checkLocators.cartSummaryItemsCount, element => element.textContent)
    expect(cartItemCountText).toContain('3')

    const pageTitle = await page.title()
    expect(pageTitle).toBe('Checkout')

    await checkoutPage.registerAddress(helper.address, helper.city, helper.zipCode, helper.phoneNumber)
    await page.waitForTimeout(10000)

    const shippingUrl = page.url()
    expect(shippingUrl).toBe('https://magento.softwaretestingboard.com/checkout/#payment')

    await checkoutPage.clickOnPlaceOrderBtn()
    await page.waitForTimeout(10000)

    await expect(page).toHaveURL('https://magento.softwaretestingboard.com/checkout/onepage/success/', { timeout: 10000 })

    // Logout
    await loginPage.clickChangeButton()
    await page.waitForTimeout(waitTime)
    await loginPage.clickSignOutLink()
    await page.waitForTimeout(15000)

    await expect(page).toHaveURL('https://magento.softwaretestingboard.com/', { timeout: 10000 })
})



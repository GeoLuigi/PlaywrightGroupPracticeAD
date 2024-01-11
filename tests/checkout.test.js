import { test, expect } from '@playwright/test'
import { dataHelper as helper} from '../helpers/dataHelper'
import { CheckoutPage } from '../pages/checkoutPage'
import { RegistrationPage } from '../pages/registrationPage'
import { TopsWomenPage } from '../pages/topsWomenPage'
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword } from '../helpers/faker'

test.beforeEach(async ({ page }, testInfo) => {
    const registrationPage = new RegistrationPage(page)
    const topsWomenPage = new TopsWomenPage(page)
    const registrationUrl = 'https://magento.softwaretestingboard.com/customer/account/create/'
    const waitTime = 2000

    testInfo.setTimeout(200000)

    helper.firstName = generateRandomFirstName()
    helper.lastName = generateRandomLastName()
    helper.email = generateRandomEmail()
    helper.password = generateRandomPassword()

    // Registration Page
    await page.goto(registrationUrl)
    await registrationPage.fillRegistrationForm(helper.firstName,helper.lastName,helper.email,helper.password, helper.password)
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

test('Checkout Test', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page)
    checkoutPage.registerAddress(helper.address, helper.city, helper.zipCode, helper.phoneNumber)
})
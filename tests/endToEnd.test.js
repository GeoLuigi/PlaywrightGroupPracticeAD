import { test , expect } from '@playwright/test'
import { dataHelper as helper} from '../helpers/dataHelper'
import { generateRandomFirstName, generateRandomLastName, generateRandomEmail, generateRandomPassword } from '../helpers/faker'
import { RegistrationPage } from '../pages/registrationPage'
import { TopsWomenPage } from '../pages/topsWomenPage'
import exp from 'constants'

const registrationUrl = 'https://magento.softwaretestingboard.com/customer/account/create/'
const waitTime = 1500

helper.firstName = generateRandomFirstName()
helper.lastName = generateRandomLastName()
helper.email = generateRandomEmail()
helper.password = generateRandomPassword()

test('End to End Test', async ({ page }) => {
    const registrationPage = new RegistrationPage(page)
    const topsWomenPage = new TopsWomenPage(page)

    // Registration Page
    await page.goto(registrationUrl)
    await registrationPage.fillRegistrationForm(helper.firstName,helper.lastName,helper.email,helper.password, helper.password)
    await registrationPage.clickCreateAccountButton()

    const currentUrl = page.url()
    expect(currentUrl).toBe('https://magento.softwaretestingboard.com/customer/account/create/')

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
})



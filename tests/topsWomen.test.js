import { test, expect } from '@playwright/test'
import { topsWomenLocators as locators } from '../locators/topsWomenLocators'
import { TopsWomenPage } from '../pages/topsWomenPage'

test.describe('Tops Women Page tests', () => {

    let topsWomenPage
    let url

    test.beforeEach(async ({ page }) => {
        topsWomenPage = new TopsWomenPage(page)
        url = topsWomenPage.getUrl()
        await page.goto(url)
      })

    test('ECA-38 | Verify the correct addition of one filter', async ({ page }) => {

        await topsWomenPage.clickOnCategoryTab()
        await topsWomenPage.clickOnJacketsFilter()

        const subtitleText = await (page.getByRole('tab', { name: locators.filterSubtitle })).innerText()

        expect(page.url()).toBe(url + '?cat=23', 'URL is not correct')
        expect(subtitleText).toContain("Now Shopping by")
    })

    test('ECA-39 | Verify the successful removal of one filter', async ({ page }) => {

        await topsWomenPage.clickOnCategoryTab()
        await topsWomenPage.clickOnJacketsFilter()
        await topsWomenPage.clickOnRemoveJacketsFilterIcon()

        expect(page.url()).toBe(url, 'Incorrect removal of a filter')
    })

    test('ECA-40 | Verify the successful addition of 3 filters', async ({ page }) => {

        await topsWomenPage.clickOnCategoryTab()
        await topsWomenPage.clickOnJacketsFilter()
        await topsWomenPage.clickOnPriceTab()
        await topsWomenPage.clickOnPriceFilter()
        await topsWomenPage.clickOnMaterialTab()
        await topsWomenPage.clickOnMaterialFilter()

        expect(page.url()).toBe(url + '?cat=23&material=33&price=70-80', 'Incorrect application of filters')
    })

    test('ECA-41 | Verify the proper removal of all filters', async ({ page }) => {

        await topsWomenPage.clickOnCategoryTab()
        await topsWomenPage.clickOnJacketsFilter()
        await topsWomenPage.clickOnPriceTab()
        await topsWomenPage.clickOnPriceFilter()
        await topsWomenPage.clickOnMaterialTab()
        await topsWomenPage.clickOnMaterialFilter()
        await topsWomenPage.clickOnClearAllFilters()

        expect(page.url()).toBe(url, 'Incorrect removal of all filters')
    })

    test('ECA-46 | Verify that the "Sort By" dropdown contains the correct options', async () => {

        const dropdown = await topsWomenPage.getSortingList()
        const optionElements = await dropdown.innerText()

        expect(optionElements).toContain("Position")
        expect(optionElements).toContain("Product Name")
        expect(optionElements).toContain("Price")
    })

    test('ECA-44 | Verify the successful addition of items to the cart', async ({ page }) => {

        const waitTime = 1500

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
    })

    test('ECA-51 | Verify that clicking [Proceed to Checkout] correctly redirects to the shipping page', async ({ page }) => {

        const waitTime = 3000

        await page.waitForTimeout(waitTime)
        await topsWomenPage.selectAntoniaClothing()
        await page.waitForTimeout(waitTime)
        await topsWomenPage.clickOnCartBtn()
        await page.waitForTimeout(waitTime)
        await topsWomenPage.clickOnCheckoutBtn()
        await page.waitForTimeout(waitTime)

        expect(page.url()).toBe('https://magento.softwaretestingboard.com/checkout/#shipping', 'Incorrect redirection')
    })
})

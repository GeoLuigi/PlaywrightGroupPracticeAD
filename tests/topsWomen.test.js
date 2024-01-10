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

        const subtitleText = await (page.getByRole('tab', { name: locators.filterSubtitle })).innerText()

        expect(page.url()).toBe(url + '?cat=23', 'URL is not correct')
        expect(subtitleText).toContain("Now Shopping by")

        await topsWomenPage.clickOnRemoveJacketsFilterIcon()

        expect(page.url()).toBe(url, 'URL is not correct')
    })
})

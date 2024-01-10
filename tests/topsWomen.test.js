import { test, expect } from '@playwright/test'
import { TopsWomenPage } from '../pages/topsWomenPage'


test('ECA-38 | Verify the correct addition of one filter', async ({ page }) => {

    const topWomenPage = new TopsWomenPage(page)
    const url = topWomenPage.url

    await page.goto(url)
    await topWomenPage.clickOnCategoryTab()
    await topWomenPage.clickOnJacketsFilter()

    const subtitleElement = page.getByRole('tab', { name: topWomenPage.filterSubtitle })
    const subtitleText = await subtitleElement.innerText()

    expect(page.url()).toBe(url + '?cat=23', 'URL is not correct')
    expect(subtitleText).toContain("Now Shopping by")
})

import { test, expect } from '@playwright/test'
import { TopsWomenPage } from '../pages/topsWomenPage'
import { url } from 'inspector'

test('ECA-38 | Verify the correct addition of one filter', async ({ page }) => {

    const topsWomenPage = new TopsWomenPage(page)
    const filterSubtitle = topsWomenPage.filterSubtitle

    await page.goto(topsWomenPage.url)
    await topsWomenPage.clickOnCategoryTab()
    await topsWomenPage.clickOnJacketsFilter()

    const subtitleElement = page.getByRole('tab', { name: filterSubtitle })
    const subtitleText = await subtitleElement.innerText()

    expect(page.url()).toBe(topsWomenPage.url + '?cat=23', 'URL is not correct')
    expect(subtitleText).toContain("Now Shopping by")
})

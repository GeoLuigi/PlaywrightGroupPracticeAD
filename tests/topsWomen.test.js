import { test, expect } from '@playwright/test'
import { TopsWomenPage } from '../pages/topsWomenPage'


test('ECA-38 | Verify the correct addition of one filter', async ({ page }) => {

    const topsWomenPage = new TopsWomenPage(page)
    const url = topsWomenPage.url

    await page.goto(url)
    await topsWomenPage.clickOnCategoryTab()
    await topsWomenPage.clickOnJacketsFilter()

    const subtitleElement = page.getByRole('tab', { name: topsWomenPage.filterSubtitle })
    const subtitleText = await subtitleElement.innerText()

    expect(page.url()).toBe(url + '?cat=23', 'URL is not correct')
    expect(subtitleText).toContain("Now Shopping by")
})

test('ECA-39 | Verify the successful removal of one filter', async ({ page }) => {
    const topsWomenPage = new TopsWomenPage(page)
    const url = topsWomenPage.url

    await page.goto(url)
    await topsWomenPage.clickOnCategoryTab()
    await topsWomenPage.clickOnJacketsFilter()

    const subtitleElement = page.getByRole('tab', { name: topsWomenPage.filterSubtitle })
    const subtitleText = await subtitleElement.innerText()

    expect(page.url()).toBe(url + '?cat=23', 'URL is not correct')
    expect(subtitleText).toContain("Now Shopping by")

    await topsWomenPage.clickOnRemoveJacketsFilterIcon()

    expect(page.url()).toBe(url, 'URL is not correct')
})

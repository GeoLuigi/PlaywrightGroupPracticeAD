import { topsWomenLocators as locators} from "../locators/topsWomenLocators"

export class TopsWomenPage {
    constructor(page) {
        this.page = page
        this.url = locators.url
    }

    getUrl() {
        return this.url
    }

    async clickOnCategoryTab() {
        await this.page.getByRole('tab', { name: locators.categoryTab}).click()
    }

    async clickOnJacketsFilter() {
        await this.page.getByRole('link', { name: locators.jacketsFilter }).click()
    }

    async clickOnRemoveJacketsFilterIcon() {
        await this.page.getByRole('link', { name: locators.removeJacketsFilterIcon }).click()
    }

    async clickOnPriceTab() {
        await this.page.getByRole('tab', { name: locators.priceTab }).click()
    }

    async clickOnPriceFilter() {
        await this.page.getByRole('link', { name: locators.priceFilter }).click()
    }

    async clickOnMaterialTab() {
        await this.page.getByRole('tab', { name: locators.materialTab }).click()
    }

    async clickOnMaterialFilter() {
        await this.page.getByRole('link', { name: locators.materialFilter }).click()
    }

    async clickOnClearAllFilters() {
        await this.page.getByRole('link', { name: locators.clearAllFilters }).click()
    }

    async selectAntoniaClothing() {
        await this.page.locator('li').filter({ hasText: locators.antoniaClothingCard }).getByLabel('S', { exact: true }).click()
        await this.page.locator('li').filter({ hasText: locators.antoniaClothingCard }).getByLabel('Black').click()
        await this.page.locator('li').filter({ hasText: locators.antoniaClothingCard }).locator('button').click()
    }

    async selectZoeClothing() {
        await this.page.locator('li').filter({ hasText: locators.zoeTankClothingCard }).getByLabel('XS', { exact: true }).click()
        await this.page.locator('li').filter({ hasText: locators.zoeTankClothingCard }).getByLabel('Yellow').click()
        await this.page.locator('li').filter({ hasText: locators.zoeTankClothingCard }).locator('button').click()
    }

    async selectBellaClothing() {
        await this.page.locator('li').filter({ hasText: locators.bellaTankClothingCard }).getByLabel('XS', { exact: true }).click()
        await this.page.locator('li').filter({ hasText: locators.bellaTankClothingCard }).getByLabel('Blue').click()
        await this.page.locator('li').filter({ hasText: locators.bellaTankClothingCard }).locator('button').click()
    }

    async clickOnCartBtn() {
        await this.page.click(locators.cartBtn)
    }

    async clickOnCheckoutBtn() {
        await this.page.click(locators.checkoutBtn)
    }

    async getSortingList() {
        return this.page.$('#sorter')
    }
}

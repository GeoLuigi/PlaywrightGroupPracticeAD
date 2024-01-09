import { topsWomenLocators } from "../locators/topsWomenLocators"

export class TopsWomenPage {
    constructor(page) {
        this.page = page

        this.url = topsWomenLocators.url
        this.categoryTab = topsWomenLocators.categoryTab
        this.jacketsFilter = topsWomenLocators.jacketsFilter
        this.filterSubtitle = topsWomenLocators.filterSubtitle
        this.removeJacketsFilterIcon = topsWomenLocators.removeJacketsFilterIcon
    }

    async clickOnCategoryTab() {
        await this.page.getByRole('tab', { name: this.categoryTab }).click()
    }

    async clickOnJacketsFilter() {
        await this.page.getByRole('link', { name: this.jacketsFilter }).click()
    }

    async clickOnRemoveJacketsFilterIcon() {
        await this.page.getByRole('link', { name: this.jacketsFilter }).click()
    }
}

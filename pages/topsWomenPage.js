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
}

import { waitForElementsCount } from "@framework/helpers/wait-helpers";
import { BaseFragment } from "@framework/page-base/base-fragment";
import { Locator, Page } from "playwright";

export class CategoriesFragment extends BaseFragment {
    allFilterElementsSelector = `//a[contains(@class, 'list-group-item list-group-item-action')]`;
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Gets all category names
     * @returns Array of names
     */
    async getAllCategories(): Promise<string[]> {
        const locator = this.page.locator(this.allFilterElementsSelector);
        await waitForElementsCount(this.page, locator, 6, 3);
        return await locator.allInnerTexts();
    }

    /**
     * Selects category and waits until it selected
     * @param category Category name to be selected
     */
    async selectCategory(category: string): Promise<void> {
        const locator = this.page.locator(`a:has-text("${category}")`);
        await locator.click();
        await this.page.waitForSelector(`//a[contains(@class, 'active') and contains(text(), '${category}')]`);
    }

    /**
     * Gets current selected category of products
     * @returns Current selected category name
     */
    async getSelectedCategory(): Promise<string | null> {
        const selector = await this.page.waitForSelector(`//a[contains(@class, 'active')]`);
        return selector.textContent();
    }
}
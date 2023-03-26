import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";

export class FilteredProductsFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Get array of filtered products
     * @returns array of product names
     */
    async getFilteredProductNames(): Promise<string[]> {
        return await this.page.locator('.card-title').allInnerTexts();
    }
}
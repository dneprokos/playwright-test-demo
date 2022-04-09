import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "playwright";

export class FilteredProductsFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    async getFilteredProductNames(): Promise<string[]> {
        return await this.page.locator('.card-title').allInnerTexts();
    }
}
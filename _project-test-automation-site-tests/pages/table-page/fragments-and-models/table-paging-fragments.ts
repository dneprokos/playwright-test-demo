import { BaseFragment } from "@framework/page-base/base-fragment";
import { Locator, Page } from "playwright";

export class TablePagingFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    private pageSizeDropDown: Locator = this.page.locator('mat-select#mat-select-0');
    private pageSizeOptionBaseSelector = 'mat-option.mat-option';
    private previousPageButtonLocator = this.page.locator('button.mat-paginator-navigation-previous');


    async selectPageSizeFromDropDown(pageSize: number | string): Promise<void> {
        await this.pageSizeDropDown.click();
        await this.page.click(`${this.pageSizeOptionBaseSelector}:has-text('${pageSize}')`);
    }

    async getPageSizeAvailableOptions(): Promise<string[]> {
        await this.pageSizeDropDown.click();
        const options = (await this.page.locator(this.pageSizeOptionBaseSelector).allInnerTexts()).map(text => text.trim());
        await this.page.keyboard.press('Escape');

        return options;
    }

    async clickNavigateNextPageButton(): Promise<void> {
        await this.page.click('button.mat-paginator-navigation-next');
    }

    async clickNavigatePreviousPageButton(): Promise<void> {
        await this.previousPageButtonLocator.click();
    }

    async isPreviousPageButtonEnabled(): Promise<boolean> {
        return await this.previousPageButtonLocator.isEnabled();
    }

    async getPageRangeLabel(): Promise<string | undefined> {
        return await this.page.textContent('div.mat-paginator-range-label').then(data => data?.trim());
    }
}
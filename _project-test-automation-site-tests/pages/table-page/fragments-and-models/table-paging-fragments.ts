import { BaseFragment } from "@framework/page-base/base-fragment";
import { step } from "@framework/decorators/step-decorator";
import { Locator } from "@playwright/test";

export class TablePagingFragment extends BaseFragment {
    private readonly paginator: Locator = this.page.locator('mat-paginator');
    private readonly pageSizeDropDown: Locator = this.paginator.locator('mat-select');
    private readonly pageSizeOptions: Locator = this.page.getByRole('option');
    private readonly previousPageButton: Locator = this.paginator.getByRole('button', { name: 'Previous page' });
    private readonly nextPageButton: Locator = this.paginator.getByRole('button', { name: 'Next page' });
    private readonly pageRangeLabel: Locator = this.paginator.locator('.mat-mdc-paginator-range-label');

    protected override readyLocators(): Locator[] {
        return [this.paginator];
    }

    @step('Select page size {0}')
    async selectPageSizeFromDropDown(pageSize: number | string): Promise<void> {
        await this.pageSizeDropDown.click();
        await this.page.getByRole('option', { name: String(pageSize), exact: true }).click();
    }

    async getPageSizeAvailableOptions(): Promise<string[]> {
        await this.pageSizeDropDown.click();
        const options = (await this.pageSizeOptions.allInnerTexts()).map(text => text.trim());
        await this.page.keyboard.press('Escape');
        await this.pageSizeOptions.first().waitFor({ state: 'hidden' });

        return options;
    }

    @step('Go to next table page')
    async clickNavigateNextPageButton(): Promise<void> {
        await this.nextPageButton.click();
    }

    @step('Go to previous table page')
    async clickNavigatePreviousPageButton(): Promise<void> {
        await this.previousPageButton.click();
    }

    async isPreviousPageButtonEnabled(): Promise<boolean> {
        return await this.previousPageButton.isEnabled();
    }

    async getPageRangeLabel(): Promise<string> {
        return (await this.pageRangeLabel.innerText()).trim();
    }
}

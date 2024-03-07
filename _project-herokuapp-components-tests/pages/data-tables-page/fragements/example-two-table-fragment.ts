import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";

export default class ExampleTwoTable extends BaseFragment {
    private readonly mainTableSelectorId = 'table2';
    private readonly tableRowsSelector = `table#${this.mainTableSelectorId} tr`;

    constructor(page: Page) {
        super(page);
    }

    async getDynamicTableRows() {
        const tableRows = await this.page.$$(this.tableRowsSelector);

        const headers = await tableRows[0].$$eval('th', (th) => th.map((th) => th.textContent));
        console.log(headers);

    }

}
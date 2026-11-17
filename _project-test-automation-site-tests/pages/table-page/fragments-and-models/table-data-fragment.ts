import { BaseFragment } from "@framework/page-base/base-fragment";
import { Locator } from "@playwright/test";
import { TableModel } from "./table-model";

export class TableDataFragment extends BaseFragment {
    private readonly table: Locator = this.page.locator('table.table');
    private readonly tableHeadersLocator: Locator = this.table.locator('thead th');
    private readonly tableRowsLocator: Locator = this.table.locator('tbody tr');

    protected override readyLocators(): Locator[] {
        return [this.table];
    }

    async getTableHeaderNames(): Promise<string[]> {
        return (await this.tableHeadersLocator.allInnerTexts()).map(value => value.trim());
    }

    async getAllTableData(): Promise<TableModel[]> {
        return await this.tableRowsLocator.evaluateAll(rows => rows.map(row => {
            const cell = (index: number) => row.querySelector(`td:nth-child(${index})`)?.textContent?.trim() as string;
            return { ID: cell(1), Name: cell(2), Progress: cell(3), Fruit: cell(4) };
        }));
    }

    async getTableRowDataByText(text: number | string | boolean): Promise<TableModel> {
        const row = this.tableRowsLocator.filter({ hasText: String(text) }).first();
        const [ID, Name, Progress, Fruit] = (await row.locator('td').allInnerTexts()).map(value => value.trim());
        return { ID, Name, Progress, Fruit };
    }
}

import { BaseFragment } from "@framework/page-base/base-fragment";
import { Locator, Page } from "@playwright/test";
import { TableModel } from "./table-model";

export class TableDataFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    private tableHeadersLocator: Locator = this.page.locator('tr th');

    async getTableHeaderNames(): Promise<(string | null)[]> {
        return await this.tableHeadersLocator
            .evaluateAll(el => el
                .map(h => h.textContent as string)
                .map(value => value.trim()));
    }
    
    async getAllTableData(): Promise<TableModel[]> {
        const allRows = await this.page.$$eval('table.mat-table.cdk-table.table tbody tr', (rows) => {
            return rows.map(row => {
                const rowValuesObject = {} as TableModel;

                rowValuesObject.ID = row.querySelector('td:nth-child(1)')?.textContent?.trim() as string;
                rowValuesObject.Name = row.querySelector('td:nth-child(2)')?.textContent?.trim() as string;
                rowValuesObject.Progress = row.querySelector('td:nth-child(3)')?.textContent?.trim() as string;
                rowValuesObject.Fruit = row.querySelector('td:nth-child(4)')?.textContent?.trim() as string;

                return rowValuesObject;
            });
        });

        return allRows;
    }

    async getTableRowDataByText(text: number| string | boolean): Promise<TableModel> {
        //const textRegrex = new RegExp(`/^ ${text} /`);
        const row = this.page.locator(`table.mat-table.cdk-table.table tbody tr:has-text=${text}`);
        const innerText =  await row.innerText();
        const cellValues = innerText.split('\t').map(value => value.trim());

        const rowValuesObject = {} as TableModel;

        for (let i = 0; i < cellValues.length; i++) {
            switch (i) {
                case 0:
                    rowValuesObject.ID = cellValues[0];
                    break;
                case 1:
                    rowValuesObject.Name = cellValues[1];
                    break;
                case 2:
                    rowValuesObject.Progress = cellValues[2];
                    break;
                case 3:
                    rowValuesObject.Fruit = cellValues[3];
                    break;
            }
        } 

        return rowValuesObject;
    }
}
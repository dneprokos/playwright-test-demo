import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";
import ExampleOneTableModel from "../models/example-one-table-model";

export default class ExampleOneTable extends BaseFragment {
    private readonly mainTableSelectorId = 'table1';
    private readonly tableRowsSelector = `//table[@id='${this.mainTableSelectorId}']/tbody/tr`;
    
    constructor(page: Page) {
        super(page);
    }

    async getTableData(): Promise<ExampleOneTableModel[]> {
        const tableData: ExampleOneTableModel[] = [];
    
        // Wait for table rows
        const tableRows = this.page.locator(this.tableRowsSelector);
        const rowCount = await tableRows.count();
    
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
          const row = tableRows.nth(rowIndex);
          const cells = row.locator('td');
    
          const model: ExampleOneTableModel = {
            lastName: await cells.nth(0).textContent(),
            firstName: await cells.nth(1).textContent(),
            email: await cells.nth(2).textContent(),
            due: await cells.nth(3).textContent(),
            webSite: await cells.nth(4).textContent()
          };
    
          tableData.push(model);
        }
    
        return tableData;
    }

    // Overload signatures
    async sortTableByField(fieldName: string): Promise<ExampleOneTable>;
    async sortTableByField(headerName: TableHeaderNames): Promise<ExampleOneTable>;

    async sortTableByField(field: string | TableHeaderNames): Promise<ExampleOneTable> {
        const headerTextMap = new Map<string, string>([
            ["LastName", "Last Name"],
            ["FirstName", "First Name"],
            ["Email", "Email"],
            ["Due", "Due"],
            ["WebSite", "Web Site"]
        ]);

        // Handling the enum type, converting it to string
        const fieldName = typeof field === 'string' ? field : TableHeaderNames[field];
    
        const headerText = headerTextMap.get(fieldName);
        if (!headerText) {
          throw new Error(`Invalid field name: ${fieldName}`);
        }
    
        // Find the header by text and click to sort
        const headerSelector = `#table1 th:has-text("${headerText}")`
        const header = this.page.locator(headerSelector);
        await header.click();
    
        // Add a wait for the sorting to complete if necessary
        // Example: Wait for some specific element that indicates sorting is done
    
        return this;
    }
}

export enum TableHeaderNames {
    LastName = "LastName",
    FirstName = "FirstName",
    Email = "Email",
    Due = "Due",
    WebSite = "WebSite"
}
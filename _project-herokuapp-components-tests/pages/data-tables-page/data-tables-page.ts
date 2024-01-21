import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";
import ExampleOneTable from "./fragements/example-one-table-fragment";

export default class DataTablesPage extends BasePage 
{
    tableOne: ExampleOneTable;
    
    constructor(page: Page) {
        super(page);
        this.tableOne = new ExampleOneTable(page);
    } 
}
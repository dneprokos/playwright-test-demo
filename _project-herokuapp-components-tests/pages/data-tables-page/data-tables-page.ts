import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";
import ExampleOneTable from "./fragements/example-one-table-fragment";
import ExampleTwoTable from "./fragements/example-two-table-fragment";

export default class DataTablesPage extends BasePage 
{
    tableOne: ExampleOneTable;
    tableTwo: ExampleTwoTable;
    
    constructor(page: Page) {
        super(page);
        this.tableOne = new ExampleOneTable(page);
        this.tableTwo = new ExampleTwoTable(page);
    } 
}
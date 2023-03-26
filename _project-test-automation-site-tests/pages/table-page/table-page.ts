import { Page } from "@playwright/test";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";
import { FilterTableDataFragment } from "./fragments-and-models/filter-table-data-fragments";
import { TableDataFragment } from "./fragments-and-models/table-data-fragment";
import { TablePagingFragment } from "./fragments-and-models/table-paging-fragments";

export default class TablePage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
        this.tableData = new TableDataFragment(page);
        this.tableFilter = new FilterTableDataFragment(page);
        this.tablePaging = new TablePagingFragment(page);
    }

    tableData: TableDataFragment;
    tableFilter: FilterTableDataFragment;
    tablePaging: TablePagingFragment;
}
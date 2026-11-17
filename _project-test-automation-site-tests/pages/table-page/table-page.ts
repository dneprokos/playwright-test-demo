import { Page } from "@playwright/test";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";
import { FilterTableDataFragment } from "./fragments-and-models/filter-table-data-fragments";
import { TableDataFragment } from "./fragments-and-models/table-data-fragment";
import { TablePagingFragment } from "./fragments-and-models/table-paging-fragments";

export default class TablePage extends PageWithHeaderAndFooter {
    readonly tableData: TableDataFragment;
    readonly tableFilter: FilterTableDataFragment;
    readonly tablePaging: TablePagingFragment;

    constructor(page: Page) {
        super(page);
        this.tableData = this.add(new TableDataFragment(page));
        this.tableFilter = this.add(new FilterTableDataFragment(page));
        this.tablePaging = this.add(new TablePagingFragment(page));
    }
}

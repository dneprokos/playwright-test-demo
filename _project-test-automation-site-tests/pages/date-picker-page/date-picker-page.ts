import { Page } from "playwright";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";

export default class DatePickerPage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }
}
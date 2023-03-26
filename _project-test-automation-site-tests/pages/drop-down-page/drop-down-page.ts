import { Page } from "@playwright/test";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";

export default class DropDownPage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }
}
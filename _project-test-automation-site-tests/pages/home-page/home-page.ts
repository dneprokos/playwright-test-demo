import { Page } from "@playwright/test";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";

export default class HomePage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }
}
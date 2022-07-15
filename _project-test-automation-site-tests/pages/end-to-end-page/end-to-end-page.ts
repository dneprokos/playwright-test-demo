import { Page } from "playwright";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";

export default class EndToEndPage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }
}
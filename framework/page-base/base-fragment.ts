import { Page } from "playwright";

export class BaseFragment {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    //TODO: Logger
}
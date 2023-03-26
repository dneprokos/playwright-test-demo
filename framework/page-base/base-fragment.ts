import { Page } from "@playwright/test";

export class BaseFragment {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    //TODO: Logger
}
import { Page } from "playwright";

export class BasePage {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }

    protected async navigateUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    //TODO: Implement Logger
}
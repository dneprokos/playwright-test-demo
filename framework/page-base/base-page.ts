import { Page } from "@playwright/test";

export class BasePage {
    page: Page

    constructor(page: Page) {
        this.page = page;
        
    }

    public async navigateUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
}
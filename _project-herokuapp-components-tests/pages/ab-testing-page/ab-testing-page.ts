import { BasePage } from "@framework/page-base/base-page";
import { Locator, Page } from "@playwright/test";

export default class ABTestingPage extends BasePage {
    readonly pageHeader: Locator;
    readonly contentText: Locator;
    
    constructor(page: Page) {
        super(page);

        this.pageHeader = this.page.locator('h3');
        this.contentText = this.page.locator('div.example >p');
    }

    async getPageHeader(): Promise<string> {
        return await this.pageHeader.innerText();
    }

    async getContentText(): Promise<string> {
        return await this.contentText.innerText();
    }
}
import { BasePage } from "@framework/page-base/base-page";
import { Locator, Page } from "@playwright/test";

export default class BasicAuthPage extends BasePage {
    pageHeader: Locator; 
  
    constructor(page: Page) {
        super(page);

        this.pageHeader = this.page.locator('h3');
    }

    async getPageHeader(): Promise<string> {
        return await this.pageHeader.innerText();
    }

    async getParagraphText(): Promise<string> {
        return await this.page.textContent('.example p')??'';
    }
}
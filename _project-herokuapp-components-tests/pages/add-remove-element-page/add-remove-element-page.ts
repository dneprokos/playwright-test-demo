import { BasePage } from "@framework/page-base/base-page";
import { Locator, Page } from "@playwright/test";

export default class AddRemoveElementPage extends BasePage {
    pageHeader: Locator;
    addElementButton: Locator;

    deleteButtonsSelector = 'button:text("Delete")';
    
    /**
     *
     */
    constructor(page: Page) {
        super(page);

        this.pageHeader = this.page.locator('h3');
        this.addElementButton = this.page.locator('button:text("Add Element")');
    }

    async getPageHeader(): Promise<string> {
        return await this.pageHeader.innerText();
    }

    async getAllDeleteButtons(): Promise<Locator[]> {
        return await this.page.locator(this.deleteButtonsSelector).all();
    }
}
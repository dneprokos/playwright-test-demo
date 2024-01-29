import { BasePage } from "@framework/page-base/base-page";
import { Locator, Page } from "@playwright/test";

export default class KeyPressesPage extends BasePage {
    private enteredKey: Locator;
    
    constructor(page: Page) {
        super(page);

        this.enteredKey = this.page.locator('#result');
    }

    async getEnteredKey(): Promise<string> {
        return await this.enteredKey.innerText();
    }
}
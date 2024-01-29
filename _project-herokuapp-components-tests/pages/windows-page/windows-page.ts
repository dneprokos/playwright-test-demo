import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";

export default class WindowsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async clickClickHereLink(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.click('div.example > a')
        ]);

        return newPage;
    }

    async getWindowTitle(page: Page): Promise<string> {
        return await page.innerText('h3');
    }
}
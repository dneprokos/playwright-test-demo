import { Page } from "@playwright/test";

export default class BrowserApplicationUtils {
    page: Page;
    /**
     *
     */
    constructor(page: Page) {
        this.page = page;
    }

    async setSessionStorage(key: string, value: string) {
        await this.page.context().addInitScript(() => {
            window.sessionStorage.setItem(key, value);
        });
    }
}
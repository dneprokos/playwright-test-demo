import { Page, test } from "@playwright/test";

export default class BrowserApplicationUtils {
    page: Page;
    /**
     *
     */
    constructor(page: Page) {
        this.page = page;
    }

    async setSessionStorage(key: string, value: string) {
        await test.step(`Set session storage with key: ${key} and value: ${value}`, async () => {
            await this.page.context().addInitScript(() => {
                window.sessionStorage.setItem(key, value);
            });
        }, { box: true });
    }
}
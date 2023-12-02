import { Page, test } from "@playwright/test";

export default class BasicSteps {
    page: Page;
    
    /**
     *
     */
    constructor(page: Page) {
        this.page = page;
    }

    async openBasePageAndLoginWithSessionStorage(baseURL: string): Promise<void> {
        await test.step('Open base page and login with session storage', async () => {
            await this.page.goto(baseURL as string);
            await this.page.context().addInitScript(() => {
                window.sessionStorage.setItem('user', 'admin');
            });
            await this.page.reload();
        }, { box: true });
    }
}
import { Page } from "@playwright/test";

export default class BasicSteps {
    page: Page;
    
    /**
     *
     */
    constructor(page: Page) {
        this.page = page;
    }

    async openBasePageAndLoginWithSessionStorage(baseURL: string): Promise<void> {
        await this.page.goto(baseURL as string);
        await this.page.context().addInitScript(() => {
            window.sessionStorage.setItem('user', 'admin');
        });
        await this.page.reload();
    }
}
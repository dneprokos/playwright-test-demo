import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";

export default class FormAuthenticationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getUsernameAndPassword(): Promise<[string, string]> {
        const nameAndPassword: string[] = await this.page.locator('h4.subheader > em').allInnerTexts();
        const username = nameAndPassword[0];
        const password = nameAndPassword[1];
        return [username, password];
    }

    async performAuthentication(username: string, password: string): Promise<void> {
        await this.page.fill('#username', username);
        await this.page.fill('#password', password);
        await this.page.click('button[type="submit"]');
    }

    async getWelcomeMessage(): Promise<string> {
        return await this.page.textContent('h4.subheader') as string;
    }

    async isLogoutButtonDisplayed(): Promise<boolean> {
        return await this.page.isVisible('a >> text="Logout"');
    }

    async clickLogoutButton(): Promise<void> {
        await this.page.click('a >> text="Logout"');
    }
}
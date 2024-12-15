import { BasePage } from "@framework/page-base/base-page";
import { Locator, Page } from "@playwright/test";

export default class LoginPage extends BasePage {
    userNameLocator: Locator;
    passwordLocator: Locator;
    loginFormLocator: Locator;
    loginTextContentLocator: Locator;

    constructor(page: Page) {
        super(page);

        this.userNameLocator = this.page.locator('#username');
        this.passwordLocator = this.page.locator('#password');
        this.loginFormLocator = this.page.locator('#login');
        this.loginTextContentLocator = this.page.locator('h4.subheader');
    }

    async getUsernameAndPassword(): Promise<[string, string]> {
        const nameAndPassword: string[] = await this.page.locator('h4.subheader > em').allInnerTexts();
        const username = nameAndPassword[0];
        const password = nameAndPassword[1];
        return [username, password];
    }

    async fillUsernameAndPassword(username: string, password: string): Promise<void> {
        await this.userNameLocator.fill(username);
        await this.passwordLocator.fill(password);
    }

    async performLoginActions(username: string, password: string): Promise<void> {
        await this.fillUsernameAndPassword(username, password);  
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
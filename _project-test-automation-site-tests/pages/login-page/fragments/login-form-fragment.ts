import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";
import { Config } from "@test_automation-project/config";

export class LoginFormFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    async fillCredentialsAndClickLoginButton(userName: string, password: string) {
        await this.page.fill('#login', userName);
        await this.page.fill('#password', password);
        await this.page.click('#loginBtn');
    }

    async loginToMainPageWithCorrectCredentials() {
        const user = Config.APP_USER;
        const password = Config.PASSWORD;
        await this.fillCredentialsAndClickLoginButton(user, password);
        await this.page
            .waitForLoadState('domcontentloaded')
            .then(() => console.log('logged in'));
        //TODO: Add some element verification step
    }
}
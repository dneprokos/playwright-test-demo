import { EnvironmentParameters } from "@framework/configuration/environment-constants";
import { getEnv } from "@framework/configuration/environment-helper";
import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";

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
        const user = getEnv(EnvironmentParameters.user);
        const password = getEnv(EnvironmentParameters.password);
        await this.fillCredentialsAndClickLoginButton(user, password);
        await this.page
            .waitForLoadState('domcontentloaded')
            .then(t => console.log('logged in'));
        //TODO: Add some element verification step
    }
}
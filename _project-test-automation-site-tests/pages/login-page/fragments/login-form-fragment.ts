import { BaseFragment } from "@framework/page-base/base-fragment";
import { step } from "@framework/decorators/step-decorator";
import { Locator } from "@playwright/test";
import { Config } from "@test_automation-project/config";

export class LoginFormFragment extends BaseFragment {
    private readonly loginInput: Locator = this.page.locator('#login');
    private readonly passwordInput: Locator = this.page.locator('#password');
    private readonly loginButton: Locator = this.page.locator('#loginBtn');

    protected override readyLocators(): Locator[] {
        return [this.loginInput, this.passwordInput, this.loginButton];
    }

    @step('Fill credentials and click Login', { box: true })
    async fillCredentialsAndClickLoginButton(userName: string, password: string): Promise<void> {
        await this.loginInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    @step('Login with configured credentials', { box: true })
    async loginToMainPageWithCorrectCredentials(): Promise<void> {
        await this.fillCredentialsAndClickLoginButton(Config.APP_USER, Config.PASSWORD);
        await this.page.waitForURL(url => !url.pathname.startsWith('/login'));
    }
}

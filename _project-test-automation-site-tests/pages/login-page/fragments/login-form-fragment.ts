import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "playwright";

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
}
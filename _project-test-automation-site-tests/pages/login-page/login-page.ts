import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";
import { LoginFormFragment } from "./fragments/login-form-fragment";

export class LoginPage extends BasePage {
    loginForm: LoginFormFragment;

    /**
     *
     */
    constructor(page: Page) {
        super(page);
        this.loginForm = new LoginFormFragment(page);
    }
}
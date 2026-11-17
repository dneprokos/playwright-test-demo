import { Page } from "@playwright/test";
import { step } from "@framework/decorators/step-decorator";
import BrowserApplicationUtils from "../common-steps/browser-application-utils";
import { LoginPage } from "../../pages/login-page/login-page";

/**
 * GoF Strategy — one interface, interchangeable ways to get an authenticated session.
 *
 * Tests ask for the `loginStrategy` fixture and call `login()`; which algorithm
 * runs is chosen by the `loginMethod` option (per project or per `test.use`).
 */
export interface LoginStrategy {
    login(page: Page, baseURL: string): Promise<void>;
}

/** Fast path: skip the form and seed the session flag the app checks. */
export class SessionStorageLoginStrategy implements LoginStrategy {
    @step('Login via session storage', { box: true })
    async login(page: Page, baseURL: string): Promise<void> {
        await new BrowserApplicationUtils(page).setSessionStorage('user', 'admin');
        await page.goto(baseURL);
    }
}

/** Real user path: fill and submit the login form with the configured credentials. */
export class UiFormLoginStrategy implements LoginStrategy {
    @step('Login via UI form', { box: true })
    async login(page: Page, baseURL: string): Promise<void> {
        await page.goto(baseURL);
        const loginPage = new LoginPage(page);
        await loginPage.verifyLoaded();
        await loginPage.loginForm.loginToMainPageWithCorrectCredentials();
    }
}

export type LoginMethod = 'session-storage' | 'ui-form';

const strategies: Record<LoginMethod, () => LoginStrategy> = {
    'session-storage': () => new SessionStorageLoginStrategy(),
    'ui-form': () => new UiFormLoginStrategy(),
};

export function createLoginStrategy(method: LoginMethod): LoginStrategy {
    return strategies[method]();
}

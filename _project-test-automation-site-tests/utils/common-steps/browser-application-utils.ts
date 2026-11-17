import { Page } from "@playwright/test";
import { step } from "@framework/decorators/step-decorator";

export default class BrowserApplicationUtils {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** Registers an init script, so the value is present before the app's own scripts run on every navigation. */
    @step('Set session storage key {0}', { box: true })
    async setSessionStorage(key: string, value: string): Promise<void> {
        // The init script runs in the browser, so key/value must be passed as an argument, not captured from this scope.
        await this.page.context().addInitScript(([k, v]) => window.sessionStorage.setItem(k, v), [key, value]);
    }
}

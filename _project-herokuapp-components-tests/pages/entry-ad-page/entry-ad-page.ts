import { BasePage } from "@framework/page-base/base-page";
import { step } from "@framework/decorators/step-decorator";
import { Locator, Response } from "@playwright/test";

/**
 * https://the-internet.herokuapp.com/entry_ad
 *
 * The ad's "closed" flag is kept in the server session:
 * - closing it sends `POST /entry_ad`; later page loads no longer show the ad;
 * - "click here" sends `POST /entry-ad` to re-enable it and reloads the page.
 *
 * Note: any click on the page body also sends the dismiss request, including
 * the click on "click here".
 */
export default class EntryAdPage extends BasePage {
    readonly modal: Locator = this.page.locator('#modal .modal');
    private readonly closeButton: Locator = this.page.locator('#modal .modal-footer p');
    private readonly reEnableLink: Locator = this.page.getByRole('link', { name: 'click here' });

    protected override readyLocators(): Locator[] {
        return [this.reEnableLink];
    }

    /** Closes the ad and waits until the server has stored the dismissal. */
    @step('Close the entry ad')
    async closeModal(): Promise<void> {
        const dismissed = this.waitForPost('/entry_ad');
        await this.closeButton.click();
        await dismissed;
        await this.modal.waitFor({ state: 'hidden' });
    }

    /** Clicks "click here" and waits for the re-enable request and the page reload it triggers. */
    @step('Re-enable the entry ad')
    async reEnableModal(): Promise<Response> {
        const reEnabled = this.waitForPost('/entry-ad');
        const reloaded = this.page.waitForEvent('load');
        await this.reEnableLink.click();
        const response = await reEnabled;
        await reloaded;
        return response;
    }

    /**
     * Reloads and fast-forwards past the page's 500 ms `showAd()` timer with a fake clock,
     * so a following "is hidden" check cannot pass just because the timer has not fired yet.
     */
    @step('Reload the page and let the ad timer fire')
    async reloadAndWaitForAdTimer(): Promise<void> {
        await this.page.clock.install();
        await this.page.reload();
        await this.page.clock.runFor(1000);
    }

    private waitForPost(path: string): Promise<Response> {
        return this.page.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname === path);
    }
}

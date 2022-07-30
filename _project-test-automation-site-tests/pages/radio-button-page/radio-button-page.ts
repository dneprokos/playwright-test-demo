import { Page } from "playwright";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";

export default class RadioButtonPage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    async clickRadioButton(radioButtonName: string): Promise<void> {
        await this.page.click(`mat-radio-button:has-text("${radioButtonName}")`);
    }

    async getCurrentFavoriteSeason(): Promise<string | null> {
        return await this.page.textContent(`//div[contains(text(),'Your favorite season is:')]`);
    }
}
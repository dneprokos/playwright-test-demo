import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";

export class SliderConfigurationFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    async clickRadioButton(radioButtonName: string): Promise<void> {
        await this.page.click(`mat-radio-button:has-text("${radioButtonName}")`);
    }
}
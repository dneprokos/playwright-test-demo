import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";

export class FilterTableDataFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    async typeTextToFilterField(text: string) {
        await this.page.type('#mat-input-0', text, {delay: 0.5});
    }
}
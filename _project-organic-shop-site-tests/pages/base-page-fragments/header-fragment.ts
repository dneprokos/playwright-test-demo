import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";

export class HeaderFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }
}
import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "@playwright/test";

export class ResultFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }
}
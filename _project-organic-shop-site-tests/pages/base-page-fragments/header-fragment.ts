import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "playwright";

export class HeaderFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }
}
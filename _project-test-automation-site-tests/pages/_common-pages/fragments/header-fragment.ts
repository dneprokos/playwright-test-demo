import { BaseFragment } from "@framework/page-base/base-fragment";
import { Page } from "playwright";
import { HeaderMenuNames } from "./header-menu-names-enum";

export class HeaderFragment extends BaseFragment {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    async clickNavigationMenuButton(menuName: HeaderMenuNames): Promise<void> {
        await this.page.click(`a:has-text("${menuName}")`)
    }
}
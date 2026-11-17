import { BaseFragment } from "@framework/page-base/base-fragment";
import { Locator } from "@playwright/test";

export class FooterFragment extends BaseFragment {
    protected override readyLocators(): Locator[] {
        return [this.page.locator('footer')];
    }
}

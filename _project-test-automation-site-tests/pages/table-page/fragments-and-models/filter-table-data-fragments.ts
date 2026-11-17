import { BaseFragment } from "@framework/page-base/base-fragment";
import { step } from "@framework/decorators/step-decorator";
import { Locator } from "@playwright/test";

export class FilterTableDataFragment extends BaseFragment {
    private readonly filterInput: Locator = this.page.locator('input.filter');

    protected override readyLocators(): Locator[] {
        return [this.filterInput];
    }

    /** Types key by key: the table filters on keyup, so `fill()` alone does not apply the filter. */
    @step('Filter table by "{0}"')
    async typeTextToFilterField(text: string): Promise<void> {
        await this.filterInput.pressSequentially(text);
    }
}

import { BaseFragment } from "@framework/page-base/base-fragment";
import { step } from "@framework/decorators/step-decorator";
import { Locator } from "@playwright/test";
import { HeaderMenuNames } from "./header-menu-names-enum";

export class HeaderFragment extends BaseFragment {
    // The site renders the menu twice: a hidden side-nav drawer and the visible toolbar.
    private readonly navigation: Locator = this.page.locator('nav.nav-links');

    protected override readyLocators(): Locator[] {
        return [this.navigation];
    }

    @step('Navigate to {0}')
    async clickNavigationMenuButton(menuName: HeaderMenuNames): Promise<void> {
        await this.navigation.getByRole('link', { name: menuName, exact: true }).click();
    }
}

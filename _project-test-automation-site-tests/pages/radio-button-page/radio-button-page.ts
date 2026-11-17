import { Locator } from "@playwright/test";
import { step } from "@framework/decorators/step-decorator";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";

export default class RadioButtonPage extends PageWithHeaderAndFooter {
    private readonly seasonGroup: Locator = this.page.getByRole('radiogroup');
    private readonly favoriteSeasonLabel: Locator = this.page.getByText(/^Favorite season:/);

    protected override readyLocators(): Locator[] {
        return [this.seasonGroup];
    }

    @step('Select {0} radio button')
    async clickRadioButton(radioButtonName: string): Promise<void> {
        await this.seasonGroup.getByRole('radio', { name: radioButtonName, exact: true }).check();
    }

    async getCurrentFavoriteSeason(): Promise<string> {
        return (await this.favoriteSeasonLabel.innerText()).trim();
    }
}

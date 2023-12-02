import { Locator, Page, test } from "@playwright/test";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";
import { CheckBoxNames } from "./checkbox-names-enum";

export default class CheckBoxesPage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
        this.indeterminateCheckbox = page.locator('#mat-checkbox-1');
        this.primaryCheckbox = page.locator('#mat-checkbox-2');
        this.accentCheckbox = page.locator('#mat-checkbox-3');
        this.warnCheckbox = page.locator('#mat-checkbox-4');
        this.indeterminateCheckboxStatus = page.locator('#mat-checkbox-1-input');
        this.primaryCheckboxStatus = page.locator('#mat-checkbox-2-input');
        this.accentCheckboxStatus = page.locator('#mat-checkbox-3-input');
        this.warnCheckboxStatus = page.locator('#mat-checkbox-4-input');
    }

    private indeterminateCheckbox: Locator;
    private primaryCheckbox: Locator;
    private accentCheckbox: Locator;
    private warnCheckbox: Locator;

    private indeterminateCheckboxStatus: Locator;
    private primaryCheckboxStatus: Locator;
    private accentCheckboxStatus: Locator;
    private warnCheckboxStatus: Locator;

    async navigateWithUrl() {
        await this.page.goto('');
    }

    async getindeterminateCheckboxClassNames(): Promise<string | null> {
        return await this.indeterminateCheckbox.getAttribute('class');
    }

    async clickOnCheckBox(name:CheckBoxNames): Promise<void> {
        await (await this.getCheckBoxLocator(name)).click();
    }

    async isChecked(name:CheckBoxNames): Promise<boolean> {
        return await (await this.getCheckBoxStatusLocator(name)).isChecked();
    }

    private async getCheckBoxStatusLocator(name:CheckBoxNames): Promise<Locator> {
        switch (name) {
            case CheckBoxNames.indeterminate:
                return this.indeterminateCheckboxStatus;
            case CheckBoxNames.primary:
                return this.primaryCheckboxStatus;
            case CheckBoxNames.accent:
                return this.accentCheckboxStatus;
            case CheckBoxNames.warn:
                return this.warnCheckboxStatus;
        }
    } 

    private async getCheckBoxLocator(name:CheckBoxNames): Promise<Locator> {
        switch (name) {
            case CheckBoxNames.indeterminate:
                return this.indeterminateCheckbox;
            case CheckBoxNames.primary:
                return this.primaryCheckbox;
            case CheckBoxNames.accent:
                return this.accentCheckbox;
            case CheckBoxNames.warn:
                return this.warnCheckbox;
        }
    } 
}
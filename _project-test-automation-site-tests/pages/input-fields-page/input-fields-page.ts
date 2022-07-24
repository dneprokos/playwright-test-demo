import { Locator, Page } from "playwright";
import { PageWithHeaderAndFooter } from "../_common-pages/page-with-header-and-footer";
import { InputPageInputFields } from "./fragments-and-models/input-page-input-fields";

export default class InputFieldsPage extends PageWithHeaderAndFooter {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
    }

    private firstNameInputLocator: Locator = this.page.locator('input#firstName');
    private lastNameInputLocator: Locator = this.page.locator('input#lastName');
    private primaryLanguageInputLocator: Locator = this.page.locator(`//input[@name='primaryProgrammingLanguage']`);
    private otherLanguageInputLocator: Locator = this.page.locator(`//input[@name='otherProgrammingLenguages']`);
    private totalYearsInputLocator: Locator = this.page.locator(`//input[@name='yearsExperience']`);
    private cityInputLocator: Locator = this.page.locator(`//input[@name='city']`);

    /**
     * Clicks 'Print Details' button
     */
    async clickPrintButton(): Promise<void> {
        await this.page.click('#print');
    }

    /**
     * Fills text to Input Field
     * @param inputField Input field from the list
     * @param text Text you want to fill
     */
    async fillTextToInputField(inputField: InputPageInputFields,  text: string) {
        await (await this.resolveInputLocator(inputField)).fill(text);
    }

    /**
     * Types text to Input Field
     * @param inputField Input field from the list
     * @param text Text you want to fill
     * @param delay Delay between each character typing
     */
    async typeTextToInputField(inputField: InputPageInputFields,  text: string, delay: number = 0): Promise<void> {
        await (await this.resolveInputLocator(inputField)).type(text, { delay: delay });
    }

    async readTextArea() {
        return await this.page.inputValue(`//textarea[@name='shortResume']`);
    }

    private async resolveInputLocator(inputField: InputPageInputFields): Promise<Locator> {
        switch (inputField) {
            case InputPageInputFields.FirstName:
                return this.firstNameInputLocator;
            case InputPageInputFields.LastName:
                return this.lastNameInputLocator;
            case InputPageInputFields.PrimaryLanguage:
                return this.primaryLanguageInputLocator;
            case InputPageInputFields.OtherLanguages:
                return this.otherLanguageInputLocator;
            case InputPageInputFields.TotalExperience:
                return this.totalYearsInputLocator;
            case InputPageInputFields.City:
                return this.cityInputLocator;
        }
    }
}
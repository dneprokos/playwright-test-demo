import { BasePage } from "@framework/page-base/base-page";
import { Locator, Page } from "@playwright/test";

export default class DropDownPage extends BasePage {
    private readonly dropDownLocator: Locator;
    private readonly dropDownOPtionSelector: string = '#dropdown option';

    constructor(page: Page) {
        super(page);
        this.dropDownLocator = this.page.locator('#dropdown');
    }

    async getAllOptions(): Promise<string[]> {
        const options = await this.page.$$(this.dropDownOPtionSelector);
        return await Promise.all(options.map(async (option) => await option.innerText()));
    }

    async getOptionsCount(): Promise<number> {
        const options = await this.page.$$(this.dropDownOPtionSelector);
        return options.length;
    }

    async selectOptionByValue(value: string): Promise<void> {
        await this.dropDownLocator.selectOption({ value: value });
    }

    async selectOptionByText(text: string): Promise<void> {
        await this.dropDownLocator.selectOption({ label: text });
    }

    async selectOptionByIndex(index: number): Promise<void> {
        await this.dropDownLocator.selectOption({ index: index });
    }

    async getSelectedOption(): Promise<string> {
        return await this.page.textContent('#dropdown option:checked') as string;
    }
}
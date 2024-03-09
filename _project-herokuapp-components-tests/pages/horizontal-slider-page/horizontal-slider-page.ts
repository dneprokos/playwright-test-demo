import { Page } from "playwright/test";
import { BasePage } from "@framework/page-base/base-page";

export default class HorizontalSliderPage extends BasePage {
    private readonly sliderSelector = 'input[type="range"]';

    constructor(page: Page) {
        super(page);
    }

    async setSliderValue(value: number): Promise<void> {
        await this.page.$eval(this.sliderSelector, (element, value) => {
            // Type assertion here
            const inputElement = element as HTMLInputElement;
            inputElement.value = value.toString();
            // Trigger a 'change' event since setting the value via script does not trigger it
            inputElement.dispatchEvent(new Event('change', { bubbles: true }));
          }, value);
    }

    async getSliderValue(): Promise<number> {
        const value = await this.page.$eval(this.sliderSelector, el => (el as HTMLInputElement).value);
        return Number(value);
    }
}
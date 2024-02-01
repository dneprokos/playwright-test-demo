import { BasePage } from "@framework/page-base/base-page";
import { Locator, Page } from "@playwright/test";

export default class CheckboxesPage extends BasePage {
    checkBox1: Locator;
    checkBox2: Locator;
    
    constructor(page: Page) {
        super(page);
        this.checkBox1 = this.page.locator('#checkboxes input:nth-child(1)');
        this.checkBox2 = this.page.locator('#checkboxes input:nth-child(3)');
    } 
}
import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";

export default class ShadowDomPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getFirstParagraphText(): Promise<string> {
        return await this.page.locator('my-paragraph span').textContent() as string;
    }

    async getSecondParagraphText(): Promise<string[]> {
        return await this.page.locator('my-paragraph ul li').allInnerTexts() as string[];
    }
 }
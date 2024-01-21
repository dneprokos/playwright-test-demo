import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";

export default class JavaScriptAlertsPage extends BasePage {

    private clickForJsAlertButton = 'button:has-text("Click for JS Alert")';
    private clickForJsConfirmButton = 'button:has-text("Click for JS Confirm")';
    private clickForJsPromptButton = 'button:has-text("Click for JS Prompt")';

    private resultText = 'p#result';
    
    constructor(page: Page) {
        super(page);
    }

    async clickForJsAlert(): Promise<void> {
        await this.page.click(this.clickForJsAlertButton);
    }

    async clickForJsConfirm(): Promise<void> {
        await this.page.click(this.clickForJsConfirmButton);
    }

    async clickForJsPrompt(): Promise<void> {
        await this.page.click(this.clickForJsPromptButton);
    }

    async getResultText(): Promise<string> {
        return await this.page.textContent(this.resultText) as string;
    }

}
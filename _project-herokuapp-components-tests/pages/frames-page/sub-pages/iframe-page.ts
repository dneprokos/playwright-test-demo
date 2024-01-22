import { BasePage } from "@framework/page-base/base-page";
import { FrameLocator, Locator, Page } from "@playwright/test";

export default class IFramePage extends BasePage {    
    private frameLocator: FrameLocator
    
    constructor(page: Page) {
        super(page);

        this.frameLocator = page.frameLocator('mce_0_ifr');
    }

    async sendTextToReachEditor(text: string): Promise<void> {
        const body: Locator = this.frameLocator.locator('body#tinymce');
        await body.fill(''); // Clearing existing text
        await body.fill(text); // Typing the new text   
    }

    async getTextFromReachEditor(): Promise<string> {
        return await this.frameLocator.locator('body[contenteditable="true"]').textContent() as string;
    }
}
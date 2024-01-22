import { BasePage } from "@framework/page-base/base-page";
import { FrameLocator, Page } from "@playwright/test";

export default class NestedFramesPage extends BasePage {
    frameTop: FrameLocator;
    frameBottom: FrameLocator;
    innerTopLeftFrame: FrameLocator;
    innerTopRightFrame: FrameLocator;
    innerTopMiddleFrame: FrameLocator;

    constructor(page: Page) {
        super(page);
        this.frameTop = page.frameLocator('frame[name="frame-top"]');
        this.frameBottom = page.frameLocator('frame[name="frame-bottom"]');
        this.innerTopLeftFrame = this.frameTop.frameLocator('frame[name="frame-left"]');
        this.innerTopRightFrame = this.frameTop.frameLocator('frame[name="frame-right"]');
        this.innerTopMiddleFrame = this.frameTop.frameLocator('frame[name="frame-middle"]');
    }

    async getFrameBottomText(): Promise<string> {
        return await this.frameBottom.locator('body').innerText();
    }

    async getInnerTopLeftFrameText(): Promise<string> {
        return await this.innerTopLeftFrame.locator('body').innerText();
    }

    async getInnerTopRightFrameText(): Promise<string> {
        return await this.innerTopRightFrame.locator('body').innerText();
    }

    async getInnerTopMiddleFrameText(): Promise<string> {
        return await this.innerTopMiddleFrame.locator('body').innerText();
    }
}
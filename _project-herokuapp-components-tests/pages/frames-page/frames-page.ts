import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";
import IFramePage from "./sub-pages/iframe-page";
import NestedFramesPage from "./sub-pages/nested-frames-page";

export default class FramesPage extends BasePage {
    private readonly iFrameLinkSelector = 'a:has-text("iFrame")';
    private readonly nestedFramesLinkSelector = 'a:has-text("Nested Frames")';

    constructor(page: Page) {
        super(page);
    }

    async navigateToIFramePage(): Promise<IFramePage> {
        await this.page.click(this.iFrameLinkSelector);
        await this.waitForPageLoad();
        return new IFramePage(this.page);
    }

    async navigateToNestedFramesPage(): Promise<NestedFramesPage> {
        await this.page.click(this.nestedFramesLinkSelector);
        await this.waitForPageLoad();
        return new NestedFramesPage(this.page);
    }
}
import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";

export default class DownloadFilePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async getFirstLinkText(): Promise<string> {
        return await this.page.textContent('div.example > a') as string;
    }

    async downloadFile(expectedFileName: string, savePath: string) {
        // Start download
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download event
            this.page.click(`a[href="download/${expectedFileName}"]`) // Click the download link
        ]);

        await download.saveAs(savePath);

        return download;
    }
}
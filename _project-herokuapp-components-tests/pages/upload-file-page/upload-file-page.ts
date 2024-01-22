import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";
const fs = require('fs');

export default class UploadFilePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async uploadFile(filePath: string): Promise<UploadFilePage> {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        await this.page.setInputFiles('#file-upload', filePath);
        await this.page.getByRole('button', { name: 'Upload' }).click();

        return this;
    }

    public async getUploadedFileName(): Promise<string> {
        return await this.page.textContent('#uploaded-files').then(text => text?.trim()) as string;
    }
    
}
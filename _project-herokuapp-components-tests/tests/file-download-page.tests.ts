import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";
import * as path from 'path';
import * as fs from 'fs';

test.describe.parallel('File Download page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).fileDownloadPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Download file', async ({ downloadFilePage }) => {
        // Arrange
        const expectedFileName = 'USA.png';
        const downloadFolderPath = path.resolve(__dirname, `../test-data`); // Update this path
        const savePath = path.join(downloadFolderPath, expectedFileName);
    
        // Act
        await downloadFilePage.downloadFile(expectedFileName, savePath);
    
        // Assert
        expect(fs.existsSync(savePath)).toBeTruthy();

        // Clean up: remove downloaded file
        fs.unlinkSync(savePath);
    });
});
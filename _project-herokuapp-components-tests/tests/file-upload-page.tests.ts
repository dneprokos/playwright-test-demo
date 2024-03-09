import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";
const path = require('path');

test.describe.parallel('File Upload page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).fileUploadPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Upload file', async ({ uploadFilePage }) => {
        //Arrange
        const fileName = 'upload_file.txt';
        const filePath = path.resolve(__dirname, `../test-data/${fileName}`); //File should be in the specified folder

        //Act
        await uploadFilePage.uploadFile(filePath);

        //Assert
        expect(await uploadFilePage.getUploadedFileName()).toBe(fileName);
    });
});
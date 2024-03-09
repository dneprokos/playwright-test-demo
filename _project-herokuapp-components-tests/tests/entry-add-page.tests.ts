import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Entry add page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).entryAdPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Close modal window', async ({ page }) => {
        // Arrange
        // TODO: Create a page object
        await page.waitForSelector('.modal', { state: 'visible' });
        
        // Act
        await page.click('.modal-footer p');
        await page.waitForSelector('.modal', { state: 'hidden' });
        await page.getByRole('link', { name: 'click here' }).click();

        // Assert
        await page.waitForSelector('.modal', { state: 'visible' });
    });
});
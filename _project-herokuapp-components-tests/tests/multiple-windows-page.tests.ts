import { Page } from "@playwright/test";
import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Multiple windows page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).multipleWindowsPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Navigate to the new window', async ({ windowPage }) => {
        // Arrange

        // Act
        const newPage: Page = await windowPage.clickClickHereLink();

        // Assert
        expect(await windowPage.getWindowTitle(newPage)).toBe('New Window');
    });
});
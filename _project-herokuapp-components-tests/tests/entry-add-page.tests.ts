import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Entry add page tests - Verify page logic', async () => {
    test.beforeEach(async ({ entryAdPage, baseURL }) => {
        await entryAdPage.navigateUrl(new PageDataConstants(baseURL as string).entryAdPage.getUrlPath());
        await entryAdPage.verifyLoaded();
    });

    test('Close modal window - Should stay closed after reload', async ({ entryAdPage }) => {
        // Arrange
        await expect(entryAdPage.modal).toBeVisible();

        // Act
        await entryAdPage.closeModal();
        await entryAdPage.reloadAndWaitForAdTimer();

        // Assert
        await expect(entryAdPage.modal).toBeHidden();
    });

    // The site's re-enable endpoint is broken: POST /entry-ad returns 404, so the ad never comes back.
    // The previous version of this test only passed when the reload beat the page's own dismiss request.
    test.fixme('Re-enable modal window via "click here" - Should appear again', async ({ entryAdPage }) => {
        // Arrange
        await entryAdPage.closeModal();

        // Act
        const reEnable = await entryAdPage.reEnableModal();

        // Assert
        expect(reEnable.ok()).toBeTruthy();
        await expect(entryAdPage.modal).toBeVisible();
    });
});

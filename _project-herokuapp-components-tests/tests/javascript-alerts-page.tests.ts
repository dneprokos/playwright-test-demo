import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Javascript Alerts page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).javaScriptAlertsPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Click on JS Alert button - Should display alert', async ({ page, javaScriptAlertsPage }) => {
        //Arrange
        page.on('dialog', async dialog => await dialog.dismiss());
        const expectedText = 'You successfully clicked an alert';

        //Act
        await javaScriptAlertsPage.clickForJsAlert();

        //Assert
        expect(await javaScriptAlertsPage.getResultText()).toBe(expectedText);
    });

    test('Click on JS Confirm button and confirm - Should display alert', async ({ page, javaScriptAlertsPage }) => {
        //Arrange
        page.on('dialog', async dialog => await dialog.accept());
        const expectedText = 'You clicked: Ok';

        //Act
        await javaScriptAlertsPage.clickForJsConfirm();

        //Assert
        expect(await javaScriptAlertsPage.getResultText()).toBe(expectedText);
    });

    test('Click on Click for JS Prompt button and enter text - Should display alert', async ({ page, javaScriptAlertsPage }) => {
        //Arrange
        page.on('dialog', async dialog => await dialog.accept('Test'));
        const expectedText = 'You entered: Test';

        //Act
        await javaScriptAlertsPage.clickForJsPrompt();

        //Assert
        expect(await javaScriptAlertsPage.getResultText()).toBe(expectedText);
    });
});
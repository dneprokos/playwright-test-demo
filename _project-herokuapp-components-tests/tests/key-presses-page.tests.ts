import { allure } from "allure-playwright";
import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Key presses page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).keyPressesPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    const KEYS = ['a', 'Shift', 1, 'Enter', 'Space']

    KEYS.forEach(key => {
        test(`Press ${key} key and make sure it was pressed`, async ({ page, keyPressesPage }) => {
            // Arrange
            await allure.parameter("KEY", key.toString());
            const expectedValue = `You entered: ${key.toString().toUpperCase()}`;

            // Act
            await page.keyboard.press(key.toString());
            const actualValue = await keyPressesPage.getEnteredKey();

            // Assert
            expect(actualValue).toBe(expectedValue);
        });
    });

    test('Press keys sequentially and make sure keys were updated', async ({ page, keyPressesPage }) => {
        // Arrange
        const key1 = 'a';
        const key2 = 'Shift';

        // Act
        await page.keyboard.press(key1);
        const actualPressedKey1 = await keyPressesPage.getEnteredKey();
        await page.keyboard.press(key2);
        const actualPressedKey2 = await keyPressesPage.getEnteredKey();

        // Assert
        expect.soft(actualPressedKey1).toBe(`You entered: ${key1.toUpperCase()}`);
        expect.soft(actualPressedKey2).toBe(`You entered: ${key2.toUpperCase()}`);
    });
});
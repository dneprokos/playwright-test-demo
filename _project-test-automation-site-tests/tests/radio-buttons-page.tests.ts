import test from '@test_automation-project/playwright-fixture-extention';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';
import { expect } from '@playwright/test';

test.describe.parallel('Radio-buttons page tests - Verify page logic', async () => {
    test.beforeEach(async ({ page, baseURL, loginStrategy, HomePage }) => {
        await loginStrategy.login(page, baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.radio_buttons);
    });

    const radioButtons = ['Winter', 'Spring', 'Summer', 'Autumn'];

    radioButtons.forEach(radioButton => {
        test(`Click radio-button with ${radioButton} label - Should be selected`, async ({ RadioButtonPage }) => {
            //Arrange
            const expectedText = `Favorite season: ${radioButton}`;

            //Act
            await RadioButtonPage.clickRadioButton(radioButton);

            //Assert
            const actualText = await RadioButtonPage.getCurrentFavoriteSeason();
            expect(actualText).toBe(expectedText);
        })
    })
})
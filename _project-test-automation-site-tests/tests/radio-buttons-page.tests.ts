import test from '@test_automation-project/playwright-fixture-extention';
import AuthenticationSteps from '@test_automation-project/utils/common-steps/basic-steps';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';
import { expect } from '@playwright/test';

test.describe.parallel('Radio-buttons page tests - Verify page logic', async () => {
    test.beforeEach(async ({ page, baseURL, HomePage}) => {
        await new AuthenticationSteps(page).openBasePageAndLoginWithSessionStorage(baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.radio_buttons);
    });

    const radioButtons = ['Winter', 'Spring', 'Summer', 'Autumn'];

    radioButtons.forEach(radioButton => {
        test(`Click radio-button with ${radioButton} label - Should be selected`, async ({ RadioButtonPage }) => {
            //Arrange
            const expectedText = `Your favorite season is: ${radioButton}`;

            //Act
            await RadioButtonPage.clickRadioButton(radioButton);

            //Assert
            const actualText = await RadioButtonPage.getCurrentFavoriteSeason();
            expect(actualText).toBe(expectedText);
        })
    })

    test(`Webinar demo`, async ({ page }) => {
        //Arrange
        await page.goto('https://qa-automation-test-site.firebaseapp.com/');
        await page.fill('#login', 'test@test.com');
        await page.fill('#password', 'test');
        await page.click('#loginBtn');
                
        //Act
        await page.goto('https://qa-automation-test-site.firebaseapp.com/radio-button')
        await page.click(`a:has-text("Radio-buttons")`);

        //Assert
        await page.click(`mat-radio-button:has-text("Summer")`);
        const expectedText = 'Your favorite season is: Summer';
        const actualText = await page.textContent(`//div[contains(text(),'Your favorite season is:')]`);
        expect(actualText).toBe(expectedText);
    })
})
import test, { expect } from '@test_automation-project/playwright-fixture-extention';
import { CheckBoxNames } from '@test_automation-project/pages/check-box-page/checkbox-names-enum';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';

test.describe.parallel('Check-boxes page tests - Verify page logic', async () => {
    test.beforeEach(async ({ page, baseURL, loginStrategy, HomePage, CheckBoxesPage }) => {
        await loginStrategy.login(page, baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.check_boxes);
        await CheckBoxesPage.verifyLoaded();
    });
    
    test('Check Indeterminate checkbox - Should mark all other checkboxes', 
        async ({ CheckBoxesPage }) => {            
            //Act
            await CheckBoxesPage.clickOnCheckBox(CheckBoxNames.indeterminate);

            //Assert
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.indeterminate)).toBeTruthy();
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.accent)).toBeTruthy();
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.primary)).toBeTruthy();
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.warn)).toBeTruthy();
            expect.soft(await CheckBoxesPage.getTaskListStatus()).toEqual({ allComplete: true, someComplete: false });
        }
    );

    test('Check Indeterminate checkbox and then uncheck one checkbox - Should uncheck checkbox and add intermediate state to main one', 
        async ({ CheckBoxesPage }) => {            
            //Act
            await CheckBoxesPage.clickOnCheckBox(CheckBoxNames.indeterminate);
            await CheckBoxesPage.clickOnCheckBox(CheckBoxNames.primary);

            //Assert
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.indeterminate)).toBeFalsy();
            expect.soft(await CheckBoxesPage.getTaskListStatus()).toEqual({ allComplete: false, someComplete: true });
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.primary)).toBeFalsy();
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.warn)).toBeTruthy();
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.accent)).toBeTruthy();
        }
    );

    const testCheboxes: CheckBoxNames [] = [CheckBoxNames.primary, CheckBoxNames.accent, CheckBoxNames.warn];

    testCheboxes.forEach(checkboxName => {
        test(`Check ${checkboxName} checkbox - Should check checkbox and add intermediate state to main one`, 
        async ({ CheckBoxesPage }) => {
            //Arrange
            const untachedCheckBoxNames: CheckBoxNames [] = [...testCheboxes].filter(v => v !== checkboxName);
            
            //Act
            await CheckBoxesPage.clickOnCheckBox(checkboxName);

            //Assert
            expect.soft(await CheckBoxesPage.isChecked(checkboxName)).toBeTruthy();
            for (const name of untachedCheckBoxNames) {
                expect.soft(await CheckBoxesPage.isChecked(name)).toBeFalsy();
            }
            expect.soft(await CheckBoxesPage.isChecked(CheckBoxNames.indeterminate)).toBeFalsy();
            expect.soft(await CheckBoxesPage.getTaskListStatus()).toEqual({ allComplete: false, someComplete: true });
        });
    })
})
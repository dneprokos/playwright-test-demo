import test from '@test_automation-project/playwright-fixture-extention';
import { generateRandomString } from '@framework/helpers/data-generatos/string-generator';
import { expect } from '@playwright/test';
import { HeaderMenuNames } from '../pages/_common-pages/fragments/header-menu-names-enum';
import { InputPageInputFields } from '../pages/input-fields-page/fragments-and-models/input-page-input-fields';

test.describe.parallel('Visual comparison tests', async () => {
    test.beforeEach(async ({ page, baseURL, loginStrategy, HomePage }) => {
        await loginStrategy.login(page, baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.input_fields);
    });

    test('Screen comparer - With dynamic fields - Should be passed', 
        async ({ InputFieldsPage, page }) => {
            //Arrange
            const firstName: string = generateRandomString(10);
            const lastName: string = generateRandomString(10);

            //Act
            await InputFieldsPage.fillTextToInputField(InputPageInputFields.FirstName, firstName);
            await InputFieldsPage.fillTextToInputField(InputPageInputFields.LastName, lastName);

            //Assert
            await expect(page).toHaveScreenshot({ 
                mask: [ page.locator("input[name='firstName']"), page.locator("input[name='lastName']") ], 
                maskColor: 'red' 
            });
        }
    )

    test('Screen comparer - With static fields - Should be passed', 
        async ({ InputFieldsPage, page }) => {
            //Arrange
            const firstName = 'Kostiantyn';

            //Act
            await InputFieldsPage.fillTextToInputField(InputPageInputFields.FirstName, firstName);

            //Assert
            await expect(page).toHaveScreenshot({maxDiffPixels: 10});
        }
    )
})
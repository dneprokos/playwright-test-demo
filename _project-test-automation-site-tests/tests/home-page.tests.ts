import test from '@test_automation-project/playwright-fixture-extention';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';
import { expect } from '@playwright/test';

test.describe.parallel('Home page tests - Verify page logic', async () => {

    test.beforeEach(async ({ page, baseURL, loginStrategy }) => {
        await loginStrategy.login(page, baseURL as string);
    });

    test('Home page content test',
        async ({ page, HomePage }) => {
            //Arrange
            await HomePage.verifyLoaded();

            //Act
            await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.drop_downs);

            //Assert
            await expect(page).toHaveURL(/\/drop-down$/);
        }
    );
})

test.describe('Home page tests - Login strategies', async () => {
    // Same test body, different LoginStrategy: only the option changes.
    for (const loginMethod of ['session-storage', 'ui-form'] as const) {
        test.describe(`login method: ${loginMethod}`, () => {
            test.use({ loginMethod });

            test('User lands on the home page after login', async ({ page, baseURL, loginStrategy, HomePage }) => {
                //Act
                await loginStrategy.login(page, baseURL as string);

                //Assert
                await expect(page).toHaveURL(/\/home$/);
                await HomePage.verifyLoaded();
            });
        });
    }
})

import test, { expect } from '@test_automation-project/playwright-fixture-extention';
import { HeaderMenuNames } from '../pages/_common-pages/fragments/header-menu-names-enum';

test.describe.parallel('Home page tests - Verify home page logic', async () => {
    
    test.beforeEach(async ({ page, baseURL, LoginPage }) => {
        await page.goto(baseURL as string);
        await LoginPage.loginForm.loginToMainPageWithCorrectCredentials();
    });
    
    test('Home page content test', 
        async ({ page, HomePage }) => {
            //Arrange

            //Act
            await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.drop_downs);

            //Assert
            await page.waitForTimeout(5000);
        }
    );
})
import test, { expect } from '@test_automation-project/playwright-fixture-extention';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';
import AuthenticationSteps from '@root/_project-test-automation-site-tests/utils/common-steps/basic-steps';

test.describe.parallel('Home page tests - Verify page logic', async () => {
    
    test.beforeEach(async ({ page, baseURL}) => {
        await new AuthenticationSteps(page).openBasePageAndLoginWithSessionStorage(baseURL as string);
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
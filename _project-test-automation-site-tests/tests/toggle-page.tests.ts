import test from '@test_automation-project/playwright-fixture-extention';
import AuthenticationSteps from '@test_automation-project/utils/common-steps/basic-steps';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';

test.describe.parallel('Toggles page tests - Verify page logic', async () => {
    test.beforeEach(async ({ page, baseURL, HomePage}) => {
        await new AuthenticationSteps(page).openBasePageAndLoginWithSessionStorage(baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.toggles);
    });
})
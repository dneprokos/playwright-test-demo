import test from '@test_automation-project/playwright-fixture-extention';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';

test.describe.parallel('Toggles page tests - Verify page logic', async () => {
    test.beforeEach(async ({ page, baseURL, loginStrategy, HomePage }) => {
        await loginStrategy.login(page, baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.toggles);
    });
})
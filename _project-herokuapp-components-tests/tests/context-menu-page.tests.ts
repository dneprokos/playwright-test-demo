import { test } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Context menu page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        //mainPage.page.on('console', message => console.log(message.text()));
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).contextMenuPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test.skip('Verify alert appear when right click on specific area', async ({ page }) => {
        //Arrange

        //Act
        await page.click('#hot-spot', { button: 'right' });

        //Assert
    });
});
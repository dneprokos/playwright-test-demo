import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Checkboxes page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).checkboxesPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Mark and unmark checkboxes - Should mark and unmark checkboxes', async ({ checkboxePage }) => {
        //Arrange
        
        //Act
        await checkboxePage.checkBox1.check();
        await checkboxePage.checkBox2.uncheck();
        
        //Assert
        await expect.soft(checkboxePage.checkBox1).toBeChecked();
        await expect.soft(checkboxePage.checkBox2).not.toBeChecked();
    });
});
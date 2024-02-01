import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Checkboxes page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        //mainPage.page.on('console', message => console.log(message.text()));
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).checkboxesPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Mark and unmark checkboxes - Should mark and unmark checkboxes', async ({ checkboxePage }) => {
        //Arrange
        expect(await checkboxePage.checkBox1.isChecked()).toBeFalsy();
        expect(await checkboxePage.checkBox2.isChecked()).toBeTruthy();

        //Act
        await checkboxePage.checkBox1.check();
        await checkboxePage.checkBox2.uncheck();
        
        //Assert
        expect.soft(await checkboxePage.checkBox1.isChecked()).toBeTruthy();
        expect.soft(await checkboxePage.checkBox2.isChecked()).toBeFalsy();
    });
});
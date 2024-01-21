import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Drag&Drop page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).dragAndDropPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Drag and drop A to B - Should be exchanged', async ({ dragAndDropPage }) => {
        //Arrange

        //Act
        await dragAndDropPage.dragAndDropSquareAtoSquareB();

        //Assert
        expect(await dragAndDropPage.getSquareAText()).toBe('B');
    });

});
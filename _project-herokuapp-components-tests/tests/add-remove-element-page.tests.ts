import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Add-remove page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).addRemoveElementsPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Verify page content', async ({ addRemoveElementPage }) => {
        
        //Act
        const pageHeader = await addRemoveElementPage.getPageHeader();
        const addElementBtn = addRemoveElementPage.addElementButton;
        const deleteBtns = await addRemoveElementPage.getAllDeleteButtons();

        //Assert
        expect.soft(pageHeader).toBe('Add/Remove Elements');
        expect.soft(addElementBtn).toBeDefined();
        expect.soft(deleteBtns.length).toBe(0);
    });

    test('Verify add element', async ({ addRemoveElementPage }) => {
        
        //Act
        await addRemoveElementPage.addElementButton.click();
        const deleteBtns = await addRemoveElementPage.getAllDeleteButtons();

        //Assert
        expect.soft(deleteBtns.length).toBe(1);
    });

    test('Verify add multiple elements', async ({ addRemoveElementPage }) => {
        //Arrange
        const addBtnCount = 3;

        //Act
        for (let i = 0; i < addBtnCount; i++) {
            await addRemoveElementPage.addElementButton.click();
        }
        const deleteBtns = await addRemoveElementPage.getAllDeleteButtons();

        //Assert
        expect.soft(deleteBtns.length).toBe(addBtnCount);
    });

    test('Verify delete element', async ({ addRemoveElementPage }) => {
        
        //Arrange
        await addRemoveElementPage.addElementButton.click();
        const deleteBtns = await addRemoveElementPage.getAllDeleteButtons();

        //Act
        await deleteBtns[0].click();
        const deleteBtnsAfterDelete = await addRemoveElementPage.getAllDeleteButtons();

        //Assert
        expect.soft(deleteBtnsAfterDelete.length).toBe(0);
    });

    test('Verify delete multiple elements', async ({ addRemoveElementPage }) => {
        //Arrange
        const addBtnCount = 3;

        //Act
        for (let i = 0; i < addBtnCount; i++) {
            await addRemoveElementPage.addElementButton.click();
        }
        const deleteBtns = await addRemoveElementPage.getAllDeleteButtons();
        await deleteBtns[0].click();
        await deleteBtns[1].click();
        const deleteBtnsAfterDelete = await addRemoveElementPage.getAllDeleteButtons();

        //Assert
        expect.soft(deleteBtnsAfterDelete.length).toBe(1);
    });
});
import PageData from "@framework/page-base/page-data";
import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";
import { allure } from "allure-playwright";

test.describe.parallel('Main page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(baseURL as string);
        await mainPage.waitForPageLoad();
    });
    
    test('Verify page content', async ({ mainPage, baseURL }) => {
        //Arrange
        const pageDataConstants = new PageDataConstants(baseURL as string);
        const pageDataArray: PageData[] = Object.keys(pageDataConstants)
            .filter(key => key !== 'mainPage')
            .map(key => pageDataConstants[key as keyof PageDataConstants])
            .filter(value =>  value instanceof PageData);

        //Act      
        const actualPagesData: PageData[] = await mainPage.getPagesData();        
        await allure.attachment("ATTACH_ACTUAL_PAGES", JSON.stringify(actualPagesData), {
            contentType: "application/json",
        });

        //Assert
        expect.soft(await mainPage.getTopPageHeader()).toBe('Welcome to the-internet');
        expect.soft(await mainPage.getAvailableExamplesHeader()).toBe('Available Examples');
        expect.soft(actualPagesData).toEqual(pageDataArray);
    });
});
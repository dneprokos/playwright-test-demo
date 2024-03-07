import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";
import { allure } from "allure-playwright";

test.describe('A/B page tests - Verify page logic', async () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ mainPage, baseURL }) => {
        await allure.suite('A/B page tests - using allure.suite attribute'); // If not sepcified, will use the suite name from the describe block
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).abTestingPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('always fail test', async ({ page } ) => {
        //Arrange 
        test.fail();
        await allure.issue('Bug description', 'https://github.com/dneprokos/node-rest-services/issues/29');

        // Act
        await page.waitForTimeout(2000); // TO verify if fixture works in serial mode

        // Assert
        expect(true).toBe(false);
    });


    test('Verify page content', async ({ abTestPage }) => {
        //Arrange    
        const pageHeaders = ['A/B Test Variation 1', 'A/B Test Control']
        const pageText = 'Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).';

        //Act
        const [pageHeader, contentText] = await Promise.all([
            await abTestPage.getPageHeader(),
            await abTestPage.getContentText()
        ]);

        //Assert        
        expect(pageHeaders).toContain(pageHeader);
        expect(contentText).toContain(pageText); 
    });
});

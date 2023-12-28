import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('A/B page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).abTestingPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Verify page content', async ({ abTestPage }) => {
        //Arrange
        const pageHeaders = ['A/B Test Variation 1', 'A/B Test Control']
        const pageText = 'Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).';

        //Act
        const pageHeader = await abTestPage.getPageHeader();
        const contentText = await abTestPage.getContentText();

        //Assert
        expect(pageHeaders).toContain(pageHeader);
        expect(contentText).toContain(pageText); 
    });
});
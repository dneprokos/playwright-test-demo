import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Horizontal slider page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).horizontalSliderPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Slide to some position', async ({ horizontalSliderPage }) => {
        //Arrange
        const newValue = 2.5; 

        //Act
        await horizontalSliderPage.setSliderValue(newValue);
           
        //Assert
        expect(await horizontalSliderPage.getSliderValue()).toBe(newValue);
    });  
});
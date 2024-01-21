import { test, expect } from "../fixture-extention";
import IFramePage from "../pages/frames-page/sub-pages/iframe-page";
import NestedFramesPage from "../pages/frames-page/sub-pages/nested-frames-page";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Frames page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).framesPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Nested Frames sub-page - Get text from different IFrames', async ({ framesPage, page }) => {
        //Arrange
        const nestedFramesPage: NestedFramesPage = await framesPage.navigateToNestedFramesPage();

        //Act
        const textFromFrameBottom: string = await nestedFramesPage.getFrameBottomText();
        const textFromInnerTopLeftFrame: string = await nestedFramesPage.getInnerTopLeftFrameText();
        const textFromInnerTopRightFrame: string = await nestedFramesPage.getInnerTopRightFrameText();
        const textFromInnerTopMiddleFrame: string = await nestedFramesPage.getInnerTopMiddleFrameText();

        //Assert
        expect.soft(textFromFrameBottom).toEqual('BOTTOM');
        expect.soft(textFromInnerTopLeftFrame).toEqual('LEFT');
        expect.soft(textFromInnerTopRightFrame).toEqual('RIGHT');
        expect.soft(textFromInnerTopMiddleFrame).toEqual('MIDDLE');
    });

    // This test is failing because of cannot reach to contenteditable element
    test.skip('IFrame sub-page - Enter and read text', async ({ framesPage, page }) => {
        //Arrange
        const nestedFramesPage: IFramePage = await framesPage.navigateToIFramePage();
        const expectedText = 'Hello World!';

        //Act
        await nestedFramesPage.sendTextToReachEditor(expectedText);

        //Assert
        console.log(await nestedFramesPage.getTextFromReachEditor());
        expect(await nestedFramesPage.getTextFromReachEditor()).toEqual(expectedText);
    });
});
import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Basic Auth page tests - Verify page logic', async () => {
    test.use({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });

    //Alternatively, you can use request inside of the test in order to authenticate
    // const response = await page.request.get('https://example.com/protected-page', {
    //      headers: {
    //         Authorization: `Basic ${Buffer.from('username:password').toString('base64')}`
    //     }
    // });

    test('Verify successful login', async ({ baseURL, mainPage, basicAuthPage }) => {
        
        //Act
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).basicAuthPage.getUrlPath());
        await mainPage.waitForPageLoad();

        //Assert
        expect(await basicAuthPage.getPageHeader()).toBe('Basic Auth');
        expect((await basicAuthPage.getParagraphText()).trim()).toBe('Congratulations! You must have the proper credentials.');
    });
});
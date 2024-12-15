import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Form-authentication page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).loginPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Perform authentication with provided credentials on page', async ({ loginPage: formAuthenticationPage }) => {
        //Arrange
        const [username, password] = await formAuthenticationPage.getUsernameAndPassword();

        //Act
        await formAuthenticationPage.performLoginActions(username, password);
        
        //Assert
        expect(await formAuthenticationPage.getWelcomeMessage()).toBe('Welcome to the Secure Area. When you are done click logout below.');
        expect(await formAuthenticationPage.isLogoutButtonDisplayed()).toBeTruthy();
    });  
});
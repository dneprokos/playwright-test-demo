import { generateRandomString } from '@framework/helpers/data-generatos/string-generator';
import { expect, test } from '@root/_project-herokuapp-components-tests/fixture-extention';
import PageDataConstants from '@root/_project-herokuapp-components-tests/pages/pages-constants';

test.describe.parallel('Visual comparison tests', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
            await mainPage.navigateUrl(new PageDataConstants(baseURL as string).loginPage.getUrlPath());
            await mainPage.waitForPageLoad();
    });

    test('Screen comparer - With dynamic fields - Should be passed', 
        async ({ loginPage, page }) => {
            //Arrange
            const firstName: string = generateRandomString(10);
            const lastName: string = generateRandomString(10);

            //Act
            await loginPage.fillUsernameAndPassword(firstName, lastName);
            

            //Assert
            // Expect the screenshot to be taken with the red mask on the first name and last name fields
            await expect(page).toHaveScreenshot({
                mask: [ loginPage.userNameLocator, loginPage.passwordLocator ],
                maskColor: 'red'
            });
        }
    )

    test('Screen comparer - With static fields - Should be passed', 
        async ({ loginPage, page }) => {
            //Arrange
            const firstName = 'Kostiantyn';

            //Act
            await loginPage.fillUsernameAndPassword(firstName, 'password');

            //Assert
            await expect(page).toHaveScreenshot({maxDiffPixels: 10});
        }
    )

    test('Screen comparer - With concreate area screenshot - Should be passed', 
        async ({ loginPage }) => {
            //Arrange
            const firstName = 'Kostiantyn';
            const password = 'password';

            //Act
            await loginPage.fillUsernameAndPassword(firstName, password);

            //Assert
            //expect to take a screenshot of the area with the username and password fields
            await expect(loginPage.loginFormLocator).toHaveScreenshot();
        }
    )

    test('Just make screenshot - Should be passed', 
        async ({ loginPage }) => {
            //Arrange

            //Act
            await loginPage.loginTextContentLocator.screenshot({path: 'login-page-text.png'});

            //Assert
            await expect(loginPage.loginTextContentLocator).toHaveScreenshot();
        }
    )
})





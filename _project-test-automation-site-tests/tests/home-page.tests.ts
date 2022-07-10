import test, { expect } from '@test_automation-project/playwright-fixture-extention';

test.describe.parallel('Category tests', async () => {
    test('Select category - products should be filtered by category', 
        async ({ page, baseURL, LoginPage }) => {
            //Arrange
            await page.goto(baseURL as string);

            //Act
            await LoginPage.loginForm.fillCredentialsAndClickLoginButton('test@test.com', 'test');

            //Assert
            await page.waitForTimeout(5000);
        }
    );
})
import { test } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";
const { wrap, configure } = require("agentql");
const { chromium } = require("playwright");

test.describe
  .parallel("Form-authentication page tests - Verify page logic", async () => {
  test.beforeEach(async ({ mainPage, baseURL }) => {
    await test.step("Go to Login page", async () => {
      await mainPage.navigateUrl(
        new PageDataConstants(baseURL as string).loginPage.getUrlPath()
      );
      await mainPage.waitForPageLoad();
    });
  });

  test("Perform authentication with provided credentials on page", async ({
    loginPage: formAuthenticationPage,
  }) => {
    //Arrange
    const [username, password] =
      await formAuthenticationPage.getUsernameAndPassword();

    //Act
    await formAuthenticationPage.performLoginActions(username, password);

    //Assert
    await formAuthenticationPage.verifyThatUserWasLoggedIn();
  });

  test.skip("Test example using AgentQL", async ({
    loginPage: formAuthenticationPage,
  }) => {
    //Arrange
    const browser = await chromium.launch({ headless: false });
    const page = await wrap(await browser.newPage());
    await page.goto("https://the-internet.herokuapp.com/login");
    const username = "";
    const password = "";
    const searchButton = await page.getByPrompt("submit button");

    const QUERY = `
      {
          login {
              username
              password
          }
      }`;

    const response = await page.queryElements(QUERY);

    //Act
    await response.login.username.fill(username);
    await response.login.password.fill(password);
    await searchButton.click();

    //Assert
    await formAuthenticationPage.verifyThatUserWasLoggedIn();
  });
});

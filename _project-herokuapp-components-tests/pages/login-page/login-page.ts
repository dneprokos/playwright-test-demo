import { BasePage } from "@framework/page-base/base-page";
import { step } from "@framework/decorators/step-decorator";
import { expect, Locator, Page } from "@playwright/test";

export default class LoginPage extends BasePage {
  userNameLocator: Locator;
  passwordLocator: Locator;
  loginFormLocator: Locator;
  loginTextContentLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.userNameLocator = this.page.locator("#username");
    this.passwordLocator = this.page.locator("#password");
    this.loginFormLocator = this.page.locator("#login");
    this.loginTextContentLocator = this.page.locator("h4.subheader");
  }

  @step("Read credential tips from the form")
  async getUsernameAndPassword(): Promise<[string, string]> {
    const [username, password] = await this.page
      .locator("h4.subheader > em")
      .allInnerTexts();
    return [username, password];
  }

  async fillUsernameAndPassword(
    username: string,
    password: string
  ): Promise<void> {
    await this.userNameLocator.fill(username);
    await this.passwordLocator.fill(password);
  }

  @step("Login to application")
  async performLoginActions(username: string, password: string): Promise<void> {
    await this.fillUsernameAndPassword(username, password);
    await this.page.click('button[type="submit"]');
  }

  async getWelcomeMessage(): Promise<string> {
    return (await this.page.textContent("h4.subheader")) as string;
  }

  async isLogoutButtonDisplayed(): Promise<boolean> {
    return await this.page.isVisible('a >> text="Logout"');
  }

  async clickLogoutButton(): Promise<void> {
    await this.page.click('a >> text="Logout"');
  }

  @step("Verify that user was logged in")
  async verifyThatUserWasLoggedIn(): Promise<void> {
    expect(await this.getWelcomeMessage()).toBe(
      "Welcome to the Secure Area. When you are done click logout below."
    );
    expect(await this.isLogoutButtonDisplayed()).toBeTruthy();
  }
}

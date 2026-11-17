import { UiComponent } from "./ui-component";

/** Layer Supertype for pages; also a Composite node (see UiComponent). */
export class BasePage extends UiComponent {
  public async navigateUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }
}

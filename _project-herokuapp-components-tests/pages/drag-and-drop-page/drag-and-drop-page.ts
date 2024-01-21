import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";

export default class DragAndDropPage extends BasePage {
    private squareADivIdSelector = 'column-a';
    private squareBDivIdSelector = 'column-b';
    
    constructor(page: Page) {
        super(page);
    }
    
    async dragAndDropSquareAtoSquareB(): Promise<DragAndDropPage> {
      const squareA = this.page.locator(`#${this.squareADivIdSelector}`);
      const squareB = this.page.locator(`#${this.squareBDivIdSelector}`);

      await squareA.dragTo(squareB);
      return this;
    }

    async getSquareAText(): Promise<string> {
      const squareA = this.page.locator(`#${this.squareADivIdSelector}`);
      const squareAText = await squareA.innerText();
      return squareAText;
    }

    async getSquareBText(): Promise<string> {
      const squareB = this.page.locator(`#${this.squareBDivIdSelector}`);
      const squareBText = await squareB.innerText();
      return squareBText;
    }
}
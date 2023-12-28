import { BasePage } from "@framework/page-base/base-page";
import PageData from "@framework/page-base/page-data";
import { Locator, Page } from "@playwright/test";

export default class MainPage extends BasePage {
    readonly topPageHeader: Locator;
    readonly availableExamplesHeader: Locator;
    readonly pageLinks: Locator;

    constructor(page: Page) {
        super(page);

        this.topPageHeader = this.page.locator('h1.heading');
        this.availableExamplesHeader = this.page.locator('h2');
        this.pageLinks = this.page.locator('ul > li > a');
    }

    public async getTopPageHeader(): Promise<string> {
        return await this.topPageHeader.innerText();
    }

    public async getAvailableExamplesHeader(): Promise<string> {
        return await this.availableExamplesHeader.innerText();
    }

    public async getPageLinks(): Promise<string[]> {
        return await this.pageLinks.allInnerTexts();
    }

    public async getHrefLinks(): Promise<string[]> {
        return await this.pageLinks.evaluateAll(elements => elements.map(element => element.getAttribute('href'))) as string[];
    }

    public async navigateToPage(pageName: string): Promise<void> {
        await this.page.click(`//a[text()="${pageName}"]`);
    }

    public async getPagesData(): Promise<PageData[]> {
        const pageDataArray = await this.pageLinks.evaluateAll(async elements => 
            elements.map(element => ({ 
                href: (element as HTMLAnchorElement).href,
                text: element.textContent || '' // Provide a default empty string if textContent is null
            })
        ));
    
        // Assuming 'PageData' class constructor accepts 'href' and 'text' arguments
        return pageDataArray.map(({ href, text }) => new PageData(href, text));
    }
}
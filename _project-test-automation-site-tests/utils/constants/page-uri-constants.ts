import playwrightConfig from "@root/_project-test-automation-site-tests/playwright.config";

export class PageUrls {
    public static readonly baseUri: string = playwrightConfig.use?.baseURL as string;
}
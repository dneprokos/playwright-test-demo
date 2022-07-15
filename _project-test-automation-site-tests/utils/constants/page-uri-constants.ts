import playwrightConfig from "@root/_project-test-automation-site-tests/playwright.config";

export class PageUrls {
    public static readonly baseUri: string = playwrightConfig.use?.baseURL as string;
    public static readonly chekBoxesPageUri: string = PageUrls.baseUri + "check-box";
    public static readonly inputPageUri: string = PageUrls.baseUri + "input";
    public static readonly dropDownPageUri: string = PageUrls.baseUri + "drop-down";
    public static readonly radioButtonPageUri: string = PageUrls.baseUri + "radio-button";
    public static readonly tablePageUri: string = PageUrls.baseUri + "table";
    public static readonly togglePageUri: string = PageUrls.baseUri + "toggle";
    public static readonly datePickerPageUri: string = PageUrls.baseUri + "date-picker";
    public static readonly endToEndPageUri: string = PageUrls.baseUri + "end-to-end";
}
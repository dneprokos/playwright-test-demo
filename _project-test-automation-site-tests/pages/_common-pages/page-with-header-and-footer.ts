import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";
import { FooterFragment } from "./fragments/footer-fragment";
import { HeaderFragment } from "./fragments/header-fragment";

export class PageWithHeaderAndFooter extends BasePage {
    /**
     *
     */
    constructor(page: Page) {
        super(page);
        this.header = new HeaderFragment(page);
        this.footer = new FooterFragment(page);
    }

    header: HeaderFragment;
    footer: FooterFragment;
}
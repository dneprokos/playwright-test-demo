import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";
import { FooterFragment } from "./fragments/footer-fragment";
import { HeaderFragment } from "./fragments/header-fragment";

export class PageWithHeaderAndFooter extends BasePage {
    readonly header: HeaderFragment;
    readonly footer: FooterFragment;

    constructor(page: Page) {
        super(page);
        this.header = this.add(new HeaderFragment(page));
        this.footer = this.add(new FooterFragment(page));
    }
}

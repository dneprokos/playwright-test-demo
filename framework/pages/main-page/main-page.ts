import { BasePage } from "@framework/page-base/base-page";
import { Page } from "playwright";
import { HeaderFragment } from "../base-page-fragments/header-fragment";
import { CategoriesFragment } from "./fragments/categories-fragment";
import { FilteredProductsFragment } from "./fragments/filtered-products-fragment";

export class MainPage extends BasePage {
    categories: CategoriesFragment
    products: FilteredProductsFragment
    header: HeaderFragment

    /**
     *
     */
    constructor(page: Page) {
        super(page);

        this.categories = new CategoriesFragment(page);
        this.products = new FilteredProductsFragment(page);
        this.header = new HeaderFragment(page);
    }
}
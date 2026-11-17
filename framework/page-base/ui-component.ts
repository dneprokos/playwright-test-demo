import { expect, Locator, Page } from "@playwright/test";
import { step } from "@framework/decorators/step-decorator";

/**
 * GoF Composite — the Component.
 *
 * Pages and fragments share one interface, so a test can treat a single
 * fragment (leaf) and a whole page made of fragments (composite) the same way:
 *
 *   await TablePage.verifyLoaded();            // page + header + footer + table + paging + filter
 *   await TablePage.tablePaging.verifyLoaded(); // just the paging fragment
 *
 * Subclasses:
 * - list their own "ready" elements in `readyLocators()`;
 * - register child fragments with `this.add(new SomeFragment(page))`.
 * `verifyLoaded()` checks its own elements, then recurses into children.
 */
export abstract class UiComponent {
    readonly page: Page;
    private readonly children: UiComponent[] = [];

    constructor(page: Page) {
        this.page = page;
    }

    /** Elements that must be visible for this component to count as loaded. */
    protected readyLocators(): Locator[] {
        return [];
    }

    /** Registers a child component and returns it, so it can be assigned in one line. */
    protected add<T extends UiComponent>(child: T): T {
        this.children.push(child);
        return child;
    }

    @step()
    async verifyLoaded(): Promise<void> {
        for (const locator of this.readyLocators()) {
            await expect(locator, `${this.constructor.name}: ${locator} should be visible`).toBeVisible();
        }
        for (const child of this.children) {
            await child.verifyLoaded();
        }
    }
}

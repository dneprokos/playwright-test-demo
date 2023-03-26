import { Locator, Page } from "@playwright/test";

export async function waitForElementsCount(page: Page, locator: Locator, expectedCount: number, timeOutSeconds: number = 3): Promise<void> {
    let timeOut = timeOutSeconds;

    while (await locator.count() !== expectedCount || timeOut !== 0) {
        timeOut--
        await page.waitForTimeout(1000);
    }

    let lastCount = await locator.count();

    if (lastCount < expectedCount) {
        throw new Error(`Failed to wait for ${timeOutSeconds}. Expected elements count of selector '${locator}' is ${expectedCount}, but was found ${lastCount}`);
    }
}
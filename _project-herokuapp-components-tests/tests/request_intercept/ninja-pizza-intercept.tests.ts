import { Page } from '@playwright/test';
import { test, expect } from '../../fixture-extention';
import { AbortRequest, FulfillJson, intercept, LogAndContinue } from '@framework/network/route-actions';
import {
  NINJA_PIZZA_MENU_SECTIONS,
  NINJA_PIZZA_PRODUCTS_ROUTE,
  NINJA_PIZZA_URL,
  ninjaPizzaProductsResponse,
  NinjaPizzaProductPrototype,
} from '@api/stubs/ninja-pizza/ninja-pizza-product';

test.describe.parallel('Ninja pizza requests intercepts', async () => {
  const pizzaSectionTitle = (page: Page) => page.locator('#pizza div.product-list__title');

  async function verifyMenuSectionsAreHidden(page: Page) {
    for (const section of NINJA_PIZZA_MENU_SECTIONS) {
      await expect.soft(page.locator(`#${section} div.product-list__title`)).toBeHidden();
    }
  }

  test(`Intercept HTTP request - Log and continue`, async ({ page, context }) => {
    //Arrange
    const logProducts = await intercept(context, NINJA_PIZZA_PRODUCTS_ROUTE, new LogAndContinue());

    //Act
    await page.goto(NINJA_PIZZA_URL);

    //Assert
    await expect.soft(pizzaSectionTitle(page)).toBeVisible();
    await expect.poll(() => logProducts.handledCount).toBeGreaterThan(0);
  })

  // The site server-side renders the menu, so a failed client-side products request
  // leaves the pre-rendered menu in place instead of emptying it.
  test(`Intercept HTTP request - And abort it - server-rendered menu should stay visible`, async ({ page, context }) => {
    //Arrange
    const abortProducts = await intercept(context, NINJA_PIZZA_PRODUCTS_ROUTE, new AbortRequest());

    //Act
    await page.goto(NINJA_PIZZA_URL);

    //Assert
    await expect.poll(() => abortProducts.handledCount).toBeGreaterThan(0);
    await expect.soft(pizzaSectionTitle(page)).toBeVisible();
  })

  test(`Intercept HTTP request - And modify response to return 0 products - menu sections should not be shown`, async ({ page, context }) => {
    //Arrange
    const noProducts = await intercept(context, NINJA_PIZZA_PRODUCTS_ROUTE, new FulfillJson(ninjaPizzaProductsResponse()));

    //Act
    await page.goto(NINJA_PIZZA_URL);

    //Assert
    await verifyMenuSectionsAreHidden(page);
    await expect.poll(() => noProducts.handledCount).toBeGreaterThan(0);
  })

  test(`Intercept HTTP request - And modify response to return 1 product - only that product should appear`, async ({ page, context }) => {
    //Arrange
    const stubbedPizza = NinjaPizzaProductPrototype.pizza.clone().withId('stub-1').withTitle('Stubbed Carbonara');
    await intercept(context, NINJA_PIZZA_PRODUCTS_ROUTE, new FulfillJson(ninjaPizzaProductsResponse(stubbedPizza)));

    //Act
    await page.goto(NINJA_PIZZA_URL);

    //Assert
    await expect.soft(pizzaSectionTitle(page)).toBeVisible();
    await expect(page.locator('a.product-card__title')).toHaveText(['Stubbed Carbonara']);
  })

  test(`Intercept other type of request - Remove main image`, async ({ page, context }) => {
    //Arrange
    await context.route('https://php.ninjapizza.com.ua/images/news/legend.png?ver=v1.0.7', route => route.abort());

    //Act
    await page.goto(NINJA_PIZZA_URL);

    //Assert
    //TODO: Add appropriate assertion
    await page.waitForTimeout(10000);
  })
})

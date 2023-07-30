import { Page, expect } from '@playwright/test';
import test from '@test_automation-project/playwright-fixture-extention';

test.describe.parallel('Intercept requests feature', async () => {
    const interceptRoute = 'https://php.ninjawok.com.ua/apipizza/get/products';
    const url = 'https://ninjapizza.com.ua/en';

    async function verifyProductsAndSectionTitlesAreHidden(page: Page) {
        //Pizza
        await expect.soft(page.locator('div.product-list__title:has-text("Pizza")')).toBeHidden();
        await expect.soft(page.locator(`[id='1'] div.product-list__content`)).toBeHidden();

        //Desserts
        await expect.soft(page.locator('div.product-list__title:has-text("Desserts")')).toBeHidden();
        await expect.soft(page.locator(`[id='10'] div.product-list__content`)).toBeHidden();
        
        //Drinks
        await expect.soft(page.locator('div.product-list__title:has-text("Drinks")')).toBeHidden();
        await expect.soft(page.locator(`[id='7'] div.product-list__content`)).toBeHidden();
    }

    test(`Intercept HTTP request - Log and continue`, async ({ page, context }) => {        
        //Arrange
        await context.route(interceptRoute, async route => {
            // Log the request
            const response = await route.fetch();
            const json = await response.json();
            console.log(JSON.stringify(json, null, 10));

            // Continue with the intercepted request
            await route.continue();         
        });
        
            //Act
        await page.goto(url);

        //Assert
        await expect.soft(page.locator('div.product-list__title:has-text("Pizza")')).toBeVisible();
    })
    
    test(`Intercept HTTP request - And abort it  - pizzas section should not be shown`, async ({ page, context }) => {        
        //Arrange
        await context.route(interceptRoute, route => route.abort());
        
            //Act
        await page.goto(url);

        //Assert
        await verifyProductsAndSectionTitlesAreHidden(page);
    })

    test(`Intercept HTTP request - And modify request to return 0 products - products should not be shown`, async ({ page, context }) => {        
        //Arrange
        await context
            .route(interceptRoute, route => {
                    const modifiedResponse: object[] = [];
    
                    return route.fulfill({
                        status: 400,
                        contentType: 'application/json',
                        body: JSON.stringify(modifiedResponse),
                    });
                }
            );
        //Act
        await page.goto(url);

        //Assert
        await verifyProductsAndSectionTitlesAreHidden(page);   
    })

    test(`Intercept HTTP request - And modify request to return 1 product for 1 category - 1 product for 1 category should appear`, 
        async ({ page, context }) => {        
        
            //Arrange
        await context.route(interceptRoute, 
                    route => {
                        const modifiedResponse = [{
                            "id": 21,
                            "name": "Пицца «Карбонара»",
                            "localizedTitles": {
                              "en": "Pizza \"Carbonara\"blablablablablablablablabla",
                              "ua": "Піца «Карбонара»"
                            },
                            "desc": "",
                            "category": 1,
                            "icategory": 0,
                            "url": "pizza-carbonara",
                            "images": {
                              "xl": "https://php.ninjapizza.com.ua/images/21/xl2x.webp?ver=v1.0.7",
                              "l": "https://php.ninjapizza.com.ua/images/21/l2x.webp?ver=v1.0.7",
                              "m": "https://php.ninjapizza.com.ua/images/21/l.webp?ver=v1.0.7",
                              "s": "https://php.ninjapizza.com.ua/images/21/m.webp?ver=v1.0.7"
                            },
                            "unit": 1,
                            "ingredients": [
                              {
                                //"name": "Тесто из четырех видов муки",
                                "localizedTitles": {
                                  "en": "Dough made of four types of flour",
                                  "ua": "Тісто з чотирьох видів борошна"
                                },
                                //"image": "https://php.ninjapizza.com.ua/images/ing/1.png",
                                "main": false
                              },
                              {
                                //"name": "Моцарелла",
                                "localizedTitles": {
                                  "en": "Mozzarella",
                                  "ua": "Моцарела"
                                },
                                //"image": "https://php.ninjapizza.com.ua/images/ing/3.png",
                                "main": false
                              },
                              {
                                //"name": "Пармезан",
                                "localizedTitles": {
                                  "en": "Parmesan",
                                  "ua": "Пармезан"
                                },
                                //"image": "https://php.ninjapizza.com.ua/images/ing/7.png",
                                "main": false
                              },
                              {
                                //"name": "Лук фри",
                                "localizedTitles": {
                                  "en": "Crispy fried onion",
                                  "ua": "Цибуля фрі"
                                },
                                //"image": "https://php.ninjapizza.com.ua/images/ing/22.png",
                                "main": false
                              },
                              {
                                //"name": "Соус на основе взбитых сливок",
                                "localizedTitles": {
                                  "en": "Whipped cream sauce",
                                  "ua": "Соус на основі збитих вершків"
                                },
                                //"image": "https://php.ninjapizza.com.ua/images/ing/25.png",
                                "main": false
                              },
                              {
                                //"name": "Бекон",
                                "localizedTitles": {
                                  "en": "Bacon",
                                  "ua": "Бекон"
                                },
                                //"image": "https://php.ninjapizza.com.ua/images/ing/111.png",
                                "main": false
                              },
                              {
                                //"name": "Желток",
                                "localizedTitles": {
                                  "en": "Yolk",
                                  "ua": "Жовток"
                                },
                                //"image": "https://php.ninjapizza.com.ua/images/ing/112.png",
                                "main": false
                              }
                            ],
                            // "pfc": {
                            //   "calories": 266,
                            //   "carbohydrates": 47,
                            //   "fats": 16,
                            //   "proteins": 24
                            // },
                            "price": 330,
                            "rating": 39,
                            "popularity": 25,
                            "spicy": 0,
                            "vegan": false,
                            "meat": true,
                            "seafood": false,
                            "new": true,
                            "top": false,
                            "weight": 540,
                            "sizeInCentimeters": 30
                          }
                        ];
                      
                        return route.fulfill({
                            status: 200,
                            contentType: 'application/json',
                            body: JSON.stringify(modifiedResponse),
                        });
                    }
                );
        //Act
        await page.goto(url);

        //Assert
        await expect.soft(page.locator('div.product-list__title:has-text("Pizza")')).toBeVisible();
        //TODO: Add verification Title and one pizza is present
    })

    test(`Intercept other type of request - Remove main image`, async ({ page, context }) => {        
        //Arrange
        await context.route('https://php.ninjapizza.com.ua/images/news/legend.png?ver=v1.0.7', route => route.abort());
        
        //Act
        await page.goto(url);

        //Assert
        await page.waitForTimeout(10000);
    })
})
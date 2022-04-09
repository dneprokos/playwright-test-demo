import { CategoriesFragment } from '@framework/pages/main-page/fragments/categories-fragment';
import test, { expect } from '@root/playwright-fixture-extention';

test.describe.parallel('Category tests', async () => {
    test('Select category - products should be filtered by category', 
        async ({ page, baseURL, Main_Page }) => {
            //Arrange
            await page.goto(baseURL as string);
            const category = 'Bread';
            const categories: CategoriesFragment = Main_Page.categories;

            //Act
            await categories.selectCategory(category)

            //Assert
            const selectedCategory = await categories.getSelectedCategory();
            expect(selectedCategory?.trim()).toBe(category);
            const filteredProducts = await Main_Page.products.getFilteredProductNames();
            expect(filteredProducts).toEqual(['Pita', 'Fresh French Baguette'])
        }
    );
})
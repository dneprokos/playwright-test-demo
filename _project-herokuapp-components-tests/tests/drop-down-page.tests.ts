import { RandomHelper } from "@framework/helpers/random-helpers";
import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Drop-Down page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).dropdownPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Select random value by text - Should be selected', async ({ dropDownPage }) => {
        //Arrange
        const options = await dropDownPage.getAllOptions();
        const randomValue: string = new RandomHelper().getRandomValueFromArray(options) as string;

        //Act
        await dropDownPage.selectOptionByText(randomValue);

        //Assert
        expect(await dropDownPage.getSelectedOption()).toBe(randomValue);
    });
    

    test('Select random value by index - Should be selected', async ({ dropDownPage }) => {
        //Arrange
        const options = await dropDownPage.getAllOptions();
        const randomIndex: number = new RandomHelper().getRandomIndex(options.length);

        //Act
        await dropDownPage.selectOptionByIndex(randomIndex);

        //Assert
        expect(await dropDownPage.getSelectedOption()).toBe(options[randomIndex]);
    });
});
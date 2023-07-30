import test from '@test_automation-project/playwright-fixture-extention';
import AuthenticationSteps from '@test_automation-project/utils/common-steps/basic-steps';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';
import { InputPageInputFields } from '../pages/input-fields-page/fragments-and-models/input-page-input-fields';
import { expect } from '@playwright/test';


test.describe.parallel('Input page tests - Verify page logic', async () => {
    test.beforeEach(async ({ page, baseURL, HomePage}) => {
        await new AuthenticationSteps(page).openBasePageAndLoginWithSessionStorage(baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.input_fields);
    });

    test('Fill all input fields and press print button - Should print all details', 
        async ({ InputFieldsPage }) => {
            //Arrange
            const firstName = 'test1';
            const lastName = 'test2';
            const primaryLanguage = 'test3';
            const otherLanguages = 'test4';
            const totalExperience = 'test5';
            const city = 'test6';

            const expectedTexts = ['Here is a short Candidate resume:',
            `First Name: ${firstName}`,
            `Last Name: ${lastName}`,
            `Primary programming language: ${primaryLanguage}`,
            `Other programming languages: ${otherLanguages}`,
            `Total years of experience in QA area: ${totalExperience}`,
            `Living in: ${city}`] 

            //Act
            await InputFieldsPage.fillTextToInputField(InputPageInputFields.FirstName, firstName);
            await InputFieldsPage.fillTextToInputField(InputPageInputFields.LastName, lastName);
            await InputFieldsPage.typeTextToInputField(InputPageInputFields.PrimaryLanguage, primaryLanguage);
            await InputFieldsPage.typeTextToInputField(InputPageInputFields.OtherLanguages, otherLanguages);
            await InputFieldsPage.fillTextToInputField(InputPageInputFields.TotalExperience, totalExperience);
            await InputFieldsPage.fillTextToInputField(InputPageInputFields.City, city);
            await InputFieldsPage.clickPrintButton();
            
            //Assert
            const actualText: string = await InputFieldsPage.readTextArea();
            const textLines: string[] = actualText
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(line => line !== '');
            expect(textLines).toStrictEqual(expectedTexts);
        }
    )
})
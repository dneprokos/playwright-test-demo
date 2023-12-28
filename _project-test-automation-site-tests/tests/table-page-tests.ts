import test from '@test_automation-project/playwright-fixture-extention';
import AuthenticationSteps from '@test_automation-project/utils/common-steps/basic-steps';
import { HeaderMenuNames } from '@test_automation-project/pages/_common-pages/fragments/header-menu-names-enum';
import { expect } from '@playwright/test';
import { RandomHelper } from '@framework/helpers/random-helpers';

test.describe.parallel('Table page tests - Verify page logic', async () => {
    test.beforeEach(async ({ page, baseURL, HomePage}) => {
        await new AuthenticationSteps(page).openBasePageAndLoginWithSessionStorage(baseURL as string);
        await HomePage.header.clickNavigationMenuButton(HeaderMenuNames.table);
    });

    const defaultDataCount = 5;

    test('Get all table rows - Should return all table rows', 
        async ({ TablePage }) => {
            //Arrange
            //NOTE: This is test env, so, all data is randomly generated

            //Act
            const rows = await TablePage.tableData.getAllTableData();
            
            //Assert
            expect.soft(rows.length).toBe(defaultDataCount);
            const ids: number [] = rows.map(row => Number.parseInt(row.ID));
            for(let i = 0; i < defaultDataCount; i++) {
                expect.soft(ids[i]).toBe(i+1);
            }
        }
    );

    test('Select table size from drop-down - Should increase page view size', 
        async ({ TablePage }) => {
            //Arrange
            const pageSizeOptions: string [] = await TablePage.tablePaging.getPageSizeAvailableOptions();
            const randomPageSize = new RandomHelper().getRandomValueFromArray(pageSizeOptions) as string;

            //Act
            await TablePage.tablePaging.selectPageSizeFromDropDown(randomPageSize);
            const rows = await TablePage.tableData.getAllTableData();

            //Assert
            expect.soft(rows.length).toBe(Number.parseInt(randomPageSize));
    })

    test('Select table page numer - Should navigate to the next page', 
        async ({ TablePage }) => {
            //Arrange
            const expectedLabel = '6 – 10 of 100';
            
            //Act
            await TablePage.tablePaging.clickNavigateNextPageButton();
            const pageRangeLabel = await TablePage.tablePaging.getPageRangeLabel() as string;
            const rows = await TablePage.tableData.getAllTableData();

            //Assert
            expect.soft(pageRangeLabel).toBe(expectedLabel);
            expect.soft(rows.length).toBe(defaultDataCount);
            expect.soft(TablePage.tablePaging.isPreviousPageButtonEnabled()).toBeTruthy();
    })

    test('Filter name - Only filtered records should be in the table', 
        async ({ TablePage }) => {
            //Arrange
            const rows = await TablePage.tableData.getAllTableData();
            const filterName = rows[0].Name;

            //Act
            await TablePage.tableFilter.typeTextToFilterField(filterName);
            const rowsUpdated = await TablePage.tableData.getAllTableData();
            const tableNames = rowsUpdated.map(row => row.Name);
            
            //Assert
            tableNames.forEach(name => expect.soft(name).toBe(filterName));
    })
})
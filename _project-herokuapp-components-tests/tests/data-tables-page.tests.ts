import { test, expect } from "../fixture-extention";
import { TableHeaderNames } from "../pages/data-tables-page/fragements/example-one-table-fragment";
import ExampleOneTableModel from "../pages/data-tables-page/models/example-one-table-model";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Sortable tables page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).sortableDataTablesPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('Verify table 1 can be sorted by email', async ({ dataTablesPage }) => {
        //Arrange
        const expectedContent: ExampleOneTableModel[] = [
            { lastName: "Conway", firstName: "Tim", email: "tconway@earthlink.net", due: "$50.00", webSite: "http://www.timconway.com" },
            { lastName: "Smith", firstName: "John", email: "jsmith@gmail.com", due: "$50.00", webSite: "http://www.jsmith.com" },
            { lastName: "Doe", firstName: "Jason", email: "jdoe@hotmail.com", due: "$100.00", webSite: "http://www.jdoe.com" },
            { lastName: "Bach", firstName: "Frank", email: "fbach@yahoo.com", due: "$51.00", webSite: "http://www.frank.com" }
        ].sort((a, b) => a.email.localeCompare(b.email));

        //Act
        const tableResults: ExampleOneTableModel[] =  await (await dataTablesPage.tableOne.sortTableByField(TableHeaderNames.Email)).getTableData();

        //Assert
        expect(tableResults).toEqual(expectedContent);
    });
});
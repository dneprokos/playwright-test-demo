import IGeoLocation from "@framework/models/geolocation-model";
import { test, expect } from "../fixture-extention";
import PageDataConstants from "../pages/pages-constants";

test.describe.parallel('Geolocation page tests - Verify page logic', async () => {
    test.beforeEach(async ({ mainPage, baseURL }) => {
        await mainPage.navigateUrl(new PageDataConstants(baseURL as string).geolocationPage.getUrlPath());
        await mainPage.waitForPageLoad();
    });

    test('WOW - We are in New York - Where are u?', async ({ geolocationPage, geolocation }) => {
        //Arrange
        test.skip(geolocation === undefined, 'Geolocation is not defined')

        //Act
        await geolocationPage.clickWhereIAmButton();
        const geoLocation: IGeoLocation = await geolocationPage.readGeoLocation();

        //Assert
        expect(geoLocation).toEqual(geolocation);
    });
});
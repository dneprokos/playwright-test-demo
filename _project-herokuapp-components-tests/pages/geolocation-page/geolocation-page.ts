import IGeoLocation from "@framework/models/geolocation-model";
import { BasePage } from "@framework/page-base/base-page";
import { Page } from "@playwright/test";

export default class GeolocationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async clickWhereIAmButton(): Promise<void> {
        await this.page.getByRole('button', { name: 'Where am I?' }).click();
    }

    async readGeoLocation(): Promise<IGeoLocation> {
        const latitudeSelector = '#lat-value';
        const longitudeSelector = '#long-value';
    
        // Fetch the text content and then parse it as a float
        const latitudeText = await this.page.locator(latitudeSelector).textContent();
        const longitudeText = await this.page.locator(longitudeSelector).textContent();
    
        // Use parseFloat to convert the string to a number
        const latitude = latitudeText !== null ? parseFloat(latitudeText) : null;
        const longitude = longitudeText !== null ? parseFloat(longitudeText) : null;
    
        // Check if either latitude or longitude couldn't be found or parsed
        if (latitude === null || longitude === null || isNaN(latitude) || isNaN(longitude)) {
            throw new Error('Unable to find or parse geolocation values on the page.');
        }
    
        return { latitude, longitude };
    }
}
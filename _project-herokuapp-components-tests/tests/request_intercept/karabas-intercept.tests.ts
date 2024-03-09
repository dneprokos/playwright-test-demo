import { test } from '../../fixture-extention';

test.describe.parallel('Karabas requests intercepts', async () => {
    test(`Main page json intercept`, async ({ page }) => {
        // Arrange
        page.on('response', async response => {
            const headers = response.headers();
            if (headers['content-type']?.includes('application/json')) {
                console.log('<<', response.status(), response.url());
                // Optionally log the JSON response body
                try {
                    const jsonResponse = await response.json();
                    console.log(JSON.stringify(jsonResponse, null, 2));
                } catch (error) {
                    console.error("Error parsing JSON response:", error);
                }
            }
        });

        // Act
        await page.goto('https://karabas.com/ua/');
    })

    
});
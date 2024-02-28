import { test, expect } from "../../fixture-extention";

test.describe.parallel('GET Countries REST API test examples', async () => {
    test('GET Country by name - Should be returned', async ({ request }) => {
        //Arrange
        const countryName = 'Ukraine';

        //Act
        const response = await request.get(`https://restcountries.com/v3.1/name/${countryName}`);
           
        //Assert
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body[0].name.common).toBe(countryName);
    });  
});
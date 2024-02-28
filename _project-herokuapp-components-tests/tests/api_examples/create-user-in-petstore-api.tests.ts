import { test, expect } from "../../fixture-extention";

test.describe.parallel('PET STORE - User', async () => {
    test('POST /User with valid payload - Should be OK and created', async ({ request }) => {
        //Arrange
        const payload = {
            "id": 0,
            "username": "testUser",
            "firstName": "FirstName",
            "lastName": "LastName",
            "email": "string",
            "password": "string",
            "phone": "string",
            "userStatus": 0
        }

        //Act
        const response = await request.post('https://petstore.swagger.io/v2/user', { 
            data: payload, 
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        }); 
           
        //Assert
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.code).toStrictEqual(200);
        expect(body.type).toStrictEqual('unknown');
    });  
});

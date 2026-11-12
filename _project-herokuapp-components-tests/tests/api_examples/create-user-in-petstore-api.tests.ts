import { test, expect } from "../../fixture-extention";
import { PetstoreUserBuilder } from "@api/builders/petstore-user-builder";

test.describe.parallel('PET STORE - User', async () => {
    test('POST /User with valid payload - Should be OK and created', async ({ request }) => {
        //Arrange
        const payload = new PetstoreUserBuilder().build();

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

    test('POST /User with explicit username - Should be OK and retrievable by username', async ({ request }) => {
        //Arrange
        const payload = new PetstoreUserBuilder()
            .withUsername(`pw_user_${Date.now()}`)
            .withName('John', 'Doe')
            .build();

        //Act
        const createResponse = await request.post('https://petstore.swagger.io/v2/user', {
            data: payload,
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        });

        //Assert
        expect(createResponse.status()).toBe(200);

        await expect.poll(async () => {
            const getResponse = await request.get(`https://petstore.swagger.io/v2/user/${payload.username}`, {
                headers: { 'Accept': 'application/json' }
            });
            return getResponse.ok() ? await getResponse.json() : null;
        }, { timeout: 10_000 }).toMatchObject({
            username: payload.username,
            firstName: 'John',
            lastName: 'Doe',
            email: payload.email,
        });
    });
});

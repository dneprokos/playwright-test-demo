import { faker } from "@faker-js/faker";
import { BaseBuilder } from "@framework/builders/base-builder";
import { PetstoreUserModel } from "@api/models/petstore-models/petstore-user-model";

/**
 * Builds payloads for Petstore `POST /user`.
 * Every call produces a unique, valid user (Faker defaults); tests override only what they assert on.
 */
export class PetstoreUserBuilder extends BaseBuilder<PetstoreUserModel> {
    protected defaults(): PetstoreUserModel {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            id: 0,
            username: faker.internet.username({ firstName, lastName }),
            firstName,
            lastName,
            email: faker.internet.email({ firstName, lastName }),
            password: faker.internet.password({ length: 12 }),
            phone: faker.phone.number(),
            userStatus: 0,
        };
    }

    static buildMany(count: number): PetstoreUserModel[] {
        return Array.from({ length: count }, () => new PetstoreUserBuilder().build());
    }

    withId(id: number): this {
        return this.with("id", id);
    }

    withUsername(username: string): this {
        return this.with("username", username);
    }

    withName(firstName: string, lastName: string): this {
        return this.with("firstName", firstName).with("lastName", lastName);
    }

    withEmail(email: string): this {
        return this.with("email", email);
    }

    withPassword(password: string): this {
        return this.with("password", password);
    }

    withPhone(phone: string): this {
        return this.with("phone", phone);
    }

    withUserStatus(userStatus: number): this {
        return this.with("userStatus", userStatus);
    }
}

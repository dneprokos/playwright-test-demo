import { faker } from "@faker-js/faker";
import { BaseBuilder } from "@framework/builders/base-builder";
import { BookingModel } from "@api/models/booking-model/booking-model";

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

/**
 * Builds payloads for Restful Booker `POST/PUT /booking`.
 * Defaults: random guest, price 50-500, check-in within 30 days, stay of 1-14 nights.
 */
export class BookingBuilder extends BaseBuilder<BookingModel> {
    protected defaults(): BookingModel {
        const checkin = faker.date.soon({ days: 30 });
        const checkout = faker.date.soon({ days: faker.number.int({ min: 1, max: 14 }), refDate: checkin });

        return {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            totalprice: faker.number.int({ min: 50, max: 500 }),
            depositpaid: faker.datatype.boolean(),
            bookingdates: { checkin: toIsoDate(checkin), checkout: toIsoDate(checkout) },
            additionalneeds: faker.helpers.arrayElement(["Breakfast", "Late checkout", "Parking"]),
        };
    }

    static buildMany(count: number): BookingModel[] {
        return Array.from({ length: count }, () => new BookingBuilder().build());
    }

    withGuest(firstname: string, lastname: string): this {
        return this.with("firstname", firstname).with("lastname", lastname);
    }

    withTotalPrice(totalprice: number): this {
        return this.with("totalprice", totalprice);
    }

    withDepositPaid(depositpaid = true): this {
        return this.with("depositpaid", depositpaid);
    }

    withDates(checkin: string, checkout: string): this {
        return this.with("bookingdates", { checkin, checkout });
    }

    withAdditionalNeeds(additionalneeds: string): this {
        return this.with("additionalneeds", additionalneeds);
    }

    withoutAdditionalNeeds(): this {
        delete this.data.additionalneeds;
        return this;
    }
}

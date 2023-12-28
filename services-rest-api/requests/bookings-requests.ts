import { APIRequestContext, expect } from "@playwright/test";
import { BookingModel } from "@api/models/booking-model/booking-model";
import { BookingIdModel } from "../models/booking-model/booking-id-model";

export class BookingsApiRequests {
    private request: APIRequestContext;
    private baseUrl: string;
    private resourceUrl: string;

    /**
     *
     */
    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
        this.resourceUrl = `${this.baseUrl}/booking`;
    }

    async getBookingById(bookingId: number): Promise<BookingModel> {
        const getResponse = await this.request.get(`${this.resourceUrl}/${bookingId}`,
            { headers: { 'accept': 'application/json' } });
        expect(getResponse.status()).toBe(200);
        const json = await getResponse.json();
        console.log(json);

        const body: BookingModel = json;
        return body;
    }

    async getBookingIds(): Promise<BookingIdModel[]> {
        const getResponse = await this.request.get(`${this.resourceUrl}`,
            { headers: { 'accept': 'application/json' } });
        expect(getResponse.status()).toBe(200);
        const body: BookingIdModel [] = await getResponse.json();
        return body;
    }
}
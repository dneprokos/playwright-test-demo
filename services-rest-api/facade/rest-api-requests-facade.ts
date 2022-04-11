import { APIRequestContext } from "@playwright/test";
import { BookingsApiRequests } from "../requests/bookings-requests";

export class RestApiRequestsFacade {
    private baseUrl: string;
    
    /**
     *
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    bookingRequests(requestContext: APIRequestContext) {
        return new BookingsApiRequests(requestContext, this.baseUrl);
    }
}
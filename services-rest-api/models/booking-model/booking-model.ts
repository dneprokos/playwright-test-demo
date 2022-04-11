import { BookingDatesModel } from "./booking-dates-model";

export interface BookingModel {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDatesModel;
}
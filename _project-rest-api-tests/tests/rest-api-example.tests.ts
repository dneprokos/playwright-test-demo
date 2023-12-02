import { expect } from '@playwright/test';
import test from '@rest-tests/playwright-fixture-extention';
import { BookingModel } from '@root/services-rest-api/models/booking-model/booking-model';

test.describe.parallel('API example tests', async () => {
    test('API example - Get Booking By Id',
        async ({request, restApiRequests}) => {
            //Arrange
            const allBookings = await restApiRequests
                .bookingRequests(request)
                .getBookingIds();
            const lastBookingId = allBookings[allBookings.length - 1].bookingid;    

            //Act
            const booking: BookingModel = await restApiRequests
                .bookingRequests(request)
                .getBookingById(lastBookingId);
            
            //Assert
            expect(booking).toStrictEqual({
                firstname: 'Jim',
                lastname: 'Brown',
                totalprice: 111,
                depositpaid: true,
                bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
                additionalneeds: 'Breakfast'
            })
        }
    )
})
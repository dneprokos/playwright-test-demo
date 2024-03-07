import { MoviesApiService } from '@root/services-rest-api/facade/movies-api-requests-facade';
import { test, expect } from '../../fixture-extention';

let isServiceAvailable = true;

test.describe.parallel('MOVIES API - Genres', () => {
    test.beforeAll(async () => {
        isServiceAvailable = await new MoviesApiService('http://localhost:5000/api').isServiceAvailable();
    });

    test.beforeEach(async () => {
        test.skip(!isServiceAvailable, 'Service is not available. Please download from https://github.com/dneprokos/node-rest-services and start the service');
    });


    test('GET /genre/:id - id exist - Should be OK and returned', async ( ) => {
        // Arrange
        const authResponse = await new MoviesApiService('http://localhost:5000/api')
            .authorizationRequests()
            .generateAuthToken('test', 'testpassword')
            
        // Act
        const genreResponse = await new MoviesApiService('http://localhost:5000/api')
            .genresRequests()
            .getGenreById(1, authResponse.accessToken);
        
        // Assert
        expect(genreResponse.id).toBe(1);
        expect(genreResponse.name).toBe('Action');
    });
});
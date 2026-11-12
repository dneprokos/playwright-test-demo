import { test, expect } from '../../fixture-extention';

test.describe.parallel('MOVIES API - Genres', () => {
    test.beforeEach(async ({ moviesApiFactory }) => {
        test.info().annotations.push({ type: 'movies backend', description: moviesApiFactory.backend });
        test.skip(!(await moviesApiFactory.isAvailable()), 'Service is not available. Please download from https://github.com/dneprokos/node-rest-services and start the service');
    });

    test('GET /genres/:id - regular user, id exists - Should be OK and returned', async ({ regularUserMoviesApi }) => {
        // Act
        const genre = await (await regularUserMoviesApi.genres()).getGenreById(1);

        // Assert
        expect(genre.id).toBe(1);
        expect(genre.name).toBe('Action');
    });

    test('GET /genres/:id - admin user, id exists - Should be OK and returned', async ({ adminMoviesApi }) => {
        // Act
        const genre = await (await adminMoviesApi.genres()).getGenreById(1);

        // Assert
        expect(genre.id).toBe(1);
        expect(genre.name).toBe('Action');
    });

    test('GET /genres/:id - anonymous user - Should be Unauthorized', async ({ anonymousMoviesApi }) => {
        // Act
        const response = await (await anonymousMoviesApi.genres()).getGenreByIdResponse(1);

        // Assert
        expect(response.status()).toBe(401);
    });
});

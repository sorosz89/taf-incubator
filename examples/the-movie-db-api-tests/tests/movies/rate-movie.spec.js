const defaultMovieId = process.env.THE_MOVIE_DB_DEFAULT_MOVIE_ID;
const defaultRating = 5;
const { sendDeleteRatingRequest, sendRateMovieRequest } = require('../../utils/request-helper');
const { validateStatusResponse } = require('../../utils/response-helper');
const testData = require('../../test-data/movies/rate-movie.data');

describe('MOVIES - Rate Movie', () => {

    beforeAll(async () => {
        await sendDeleteRatingRequest(2, defaultMovieId);
    })

    xit('should add valid rating for an existing movie', async () => {

        const responseAdd = await sendRateMovieRequest(2, defaultMovieId, defaultRating);

        validateStatusResponse(responseAdd, 201, 1);
    });

    xit('should update rating with valid value for an already rated movie', async () => {

        const responseUpdate = await sendRateMovieRequest(2, defaultMovieId, 1);

        validateStatusResponse(responseUpdate, 201, 12);
    });

    xit('should return error for invalid rating of too low value', async () => {

        const response = await sendRateMovieRequest(2, 0, 0);

        validateStatusResponse(response, 400, 18, 'Value too low: Value must be greater than 0.0.');   
    });

    xit('should return error for invalid rating of non-multiple of 0.50', async () => {

        const response = await sendRateMovieRequest(2, 0, 0.1);

        validateStatusResponse(response, 400, 18, 'Value invalid: Values must be a multiple of 0.50.');   
    });

    xit('should return error for invalid rating of too high value', async () => {

        const response = await sendRateMovieRequest(2, 0, 10.5);

        validateStatusResponse(response, 400, 18, 'Value too high: Value must be less than, or equal to 10.0.');   
    });

    xit('should return error for valid rating for not existing movie', async () => {

        const response = await sendRateMovieRequest(2, 0, defaultRating);

        validateStatusResponse(response, 404, 34);
    });

    xit('should return error if there is no api_key in the request', async () => {

       const response = await sendRateMovieRequest(0, defaultMovieId, defaultRating);

        validateStatusResponse(response, 401, 7);
    });

    xit('should return error if there is no session_id in the request', async () => {

        const response = await sendRateMovieRequest(1, defaultMovieId, defaultRating);

        validateStatusResponse(response, 401, 3);
    });

    // the same test cases with data-driven approach
    it.each(testData)
    ('$testName', async (testDatum) => {
        const response = await sendRateMovieRequest(testDatum.authLevel, testDatum.movieId, testDatum.value);

        validateStatusResponse(response, testDatum.httpStatusCode, testDatum.statusCode, testDatum.message);
    });
});
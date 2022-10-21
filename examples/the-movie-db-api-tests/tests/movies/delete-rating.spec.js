const defaultMovieId = process.env.THE_MOVIE_DB_DEFAULT_MOVIE_ID;
const { sendDeleteRatingRequest, sendRateMovieRequest } = require('../../utils/request-helper');
const { validateStatusResponse } = require('../../utils/response-helper');
const testData = require('../../test-data/movies/delete-rating.data');

describe('MOVIES - Delete Rating', () => {

    beforeAll(async () => {
        await sendRateMovieRequest(2, defaultMovieId);
    });

    xit('should delete rating for existing movie', async () => {

        const response = await sendDeleteRatingRequest(2, defaultMovieId);

        validateStatusResponse(response, 200, 13);
    });

    xit('should not return error when trying to delete already deleted rating for existing movie', async () => {

        const response = await sendDeleteRatingRequest(2, defaultMovieId);

        validateStatusResponse(response, 200, 13);
    });

    xit('should return error for valid rating for not existing movie', async () => {

        const response = await sendDeleteRatingRequest(2, 0);

        validateStatusResponse(response, 404, 34);
    });

    xit('should return error if there is no api_key in the request', async () => {

       const response = await sendDeleteRatingRequest(0, defaultMovieId);

        validateStatusResponse(response, 401, 7);
    });

    xit('should return error if there is no session_id in the request', async () => {

        const response = await sendDeleteRatingRequest(1, defaultMovieId);

        validateStatusResponse(response, 401, 3);
    });
    
    // the same test cases with test-driven approach
    it.each(testData)
    (`$testName`, async (testDatum) => {
        const response = await sendDeleteRatingRequest(testDatum.authLevel, testDatum.movieId);

        validateStatusResponse(response, testDatum.httpStatusCode, testDatum.statusCode);
    });
});
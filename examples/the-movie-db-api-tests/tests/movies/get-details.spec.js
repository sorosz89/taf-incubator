const defaultMovieId = process.env.THE_MOVIE_DB_DEFAULT_MOVIE_ID;
const { sendGetDetailsRequest } = require('../../utils/request-helper');
const { validateStatusResponse } = require('../../utils/response-helper');
const testData = require('../../test-data/movies/get-details.data');

describe('MOVIES - Get Details', () => {

    it('should return details of existing movie with the correct schema', async () => {

        const response = await sendGetDetailsRequest(1, defaultMovieId);

        expect(response.status).toEqual(200);

        expect(response.data).toBeDefined();
        expect(response.data).toMatchDetailsSchema();
    });

    xit('should return error if movie does not exist with the id given', async () => {

        const notExistingMovieId = 0;
        const response = await sendGetDetailsRequest(1, notExistingMovieId);

        validateStatusResponse(response, 404, 34);
    });

    xit('should return error if invalid movie id is sent in the request', async () => {

        const invalidMovieId = 'invalid';
        const response = await sendGetDetailsRequest(1, invalidMovieId);

        validateStatusResponse(response, 404, 34);   
    });

    xit('should return error if no movie id is sent in the request', async () => {

        const noMovieId = '';
        const response = await sendGetDetailsRequest(1, noMovieId);

        validateStatusResponse(response, 404, 34);
    });

    xit('should return error if there is no api_key in the request', async () => {

        const response = await sendGetDetailsRequest(0, defaultMovieId);

        validateStatusResponse(response, 401, 7);
    });

    // the same test cases with test-driven approach
    it.each(testData)
    (`$testName`, async (testDatum) => {
        const response = await sendGetDetailsRequest(testDatum.authLevel, testDatum.movieId);

        validateStatusResponse(response, testDatum.httpStatusCode, testDatum.statusCode);
    });
});
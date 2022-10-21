const defaultMovieId = process.env.THE_MOVIE_DB_DEFAULT_MOVIE_ID;

module.exports = [
    {   "testName": "should return error if movie does not exist with the id given",
        "authLevel": 1,
        "movieId": 0,
        "httpStatusCode": 404,
        "statusCode": 34
    },
    {   "testName": "should return error if invalid movie id is sent in the request",
        "authLevel": 1,
        "movieId": "invalid",
        "httpStatusCode": 404,
        "statusCode": 34
    },
    {   "testName": "should return error if no movie id is sent in the request",
        "authLevel": 1,
        "httpStatusCode": 404,
        "statusCode": 34
    },
    {   "testName": "should return error if there is no api_key in the request",
        "authLevel": 0,
        "movieId": defaultMovieId,
        "httpStatusCode": 401,
        "statusCode": 7
    }
]
const defaultMovieId = process.env.THE_MOVIE_DB_DEFAULT_MOVIE_ID;

module.exports = [
    {   "testName": "should delete rating for existing movie",
        "authLevel": 2,
        "movieId": defaultMovieId,
        "httpStatusCode": 200,
        "statusCode": 13
    },
    {   "testName": "should not return error when trying to delete already deleted rating for existing movie",
        "authLevel": 2,
        "movieId": defaultMovieId,
        "httpStatusCode": 200,
        "statusCode": 13
    },
    {   "testName": "should return error for valid rating for not existing movie",
        "authLevel": 2,
        "movieId": 0,
        "httpStatusCode": 404,
        "statusCode": 34
    },
    {   "testName": "should return error if there is no api_key in the request",
        "authLevel": 0,
        "movieId": defaultMovieId,
        "httpStatusCode": 401,
        "statusCode": 7
    },
    {   "testName": "should return error if there is no session_id in the request",
        "authLevel": 1,
        "movieId": defaultMovieId,
        "httpStatusCode": 401,
        "statusCode": 3
    }
]
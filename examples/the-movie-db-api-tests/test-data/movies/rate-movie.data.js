const defaultMovieId = process.env.THE_MOVIE_DB_DEFAULT_MOVIE_ID;
const defaultRating = 5;

module.exports = [
    {   "testName": "should add valid rating for an existing movie",
        "authLevel": 2,
        "movieId": defaultMovieId,
        "value": defaultRating,
        "httpStatusCode": 201,
        "statusCode": 1
    },
    {   "testName": "should update rating with valid value for an already rated movie",
        "authLevel": 2,
        "movieId": defaultMovieId,
        "value": 1,
        "httpStatusCode": 201,
        "statusCode": 12
    },
    {   "testName": "should return error for invalid rating of too low value",
        "authLevel": 2,
        "movieId": 0,
        "value": 0,
        "httpStatusCode": 400,
        "statusCode": 18,
        "statusMessage": "Value too low: Value must be greater than 0.0."
    },
    {   "testName": "should return error for invalid rating of non-multiple of 0.50",
        "authLevel": 2,
        "movieId": 0,
        "value": 0.1,
        "httpStatusCode": 400,
        "statusCode": 18,
        "statusMessage": "Value invalid: Values must be a multiple of 0.50."
    },
    {   "testName": "should return error for invalid rating of too high value",
        "authLevel": 2,
        "movieId": 0,
        "value": 10.5,
        "httpStatusCode": 400,
        "statusCode": 18,
        "statusMessage": "Value too high: Value must be less than, or equal to 10.0."
    },
    {   "testName": "should return error for valid rating for not existing movie",
        "authLevel": 2,
        "movieId": 0,
        "value":5,
        "httpStatusCode": 404,
        "statusCode": 34
    },
    {   "testName": "should return error if there is no api_key in the request",
        "authLevel": 0,
        "movieId": defaultMovieId,
        "value": defaultRating,
        "httpStatusCode": 401,
        "statusCode": 7
    },
    {   "testName": "should return error if there is no session_id in the request",
        "authLevel": 1,
        "movieId": defaultMovieId,
        "value": defaultRating,
        "httpStatusCode": 401,
        "statusCode": 3
    }
]
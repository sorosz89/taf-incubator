const { expect } = require('@jest/globals');
const statusCodeToStatusMessageMapping = require('../test-data/movies/status-code-to-status-message-mapping');

const validateStatusResponse = (response, httpStatusCode, statusCode, statusMessage = undefined) => {

    expect(response.status).toEqual(httpStatusCode);
        
    expect(response.data).toBeDefined();
    expect(response.data).toMatchStatusSchema();
    
    expect(response.data.status_code).toEqual(statusCode);

    let expectedStatusMessage = statusMessage;
    
    if (!expectedStatusMessage) {
        expectedStatusMessage = statusCodeToStatusMessageMapping[statusCode];
    }

    if (!Array.isArray(expectedStatusMessage)) {
        expect(response.data.status_message).toEqual(expectedStatusMessage);
    } else {
        expect(expectedStatusMessage).toContain(response.data.status_message);
    }
}

module.exports = { validateStatusResponse };
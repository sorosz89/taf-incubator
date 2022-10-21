const axios = require('axios').default;

const instances = [];

// creating Axios instance without api_key and session_id
const axiosRequestConfig = {
    baseURL: process.env.THE_MOVIE_DB_BASE_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    validateStatus: false
};
instances[0] = axios.create(axiosRequestConfig);

// creating Axios instance with api_key and without session_id
const axiosRequestConfigWithApiKey = { params: { 'api_key': process.env.THE_MOVIE_DB_API_KEY } };
Object.assign(axiosRequestConfigWithApiKey, axiosRequestConfig);
instances[1] = axios.create(axiosRequestConfigWithApiKey);

let guestSession;

module.exports = async (authLevel) => {

    // instances[0] and instances[1] should already exist at this point
    // instances[2] may need to be created on demand for the first time and once the guest session expired
    if (authLevel === 2) {
        if (!guestSession || new Date(guestSession.expires_at) > Date.now()) {
            guestSession = (await (instances[1].get('/authentication/guest_session/new'))).data;

            const axiosRequestConfigWithApiKeyAndSessionId = {};
            Object.assign(axiosRequestConfigWithApiKeyAndSessionId, axiosRequestConfigWithApiKey);
            axiosRequestConfigWithApiKeyAndSessionId.params['guest_session_id'] = guestSession.guest_session_id;

            instances[2] = axios.create(axiosRequestConfigWithApiKeyAndSessionId);
        }
    }

    return instances[authLevel];
}

const getInstance = require('./get-axios-instance');

const sendDeleteRatingRequest = async (authLevel, movieId) => {
    const instance = await getInstance(authLevel);
    return await instance.delete(`/movie/${movieId}/rating`);
}

const sendGetDetailsRequest = async (authLevel, movieId) => {
    const instance = await getInstance(authLevel);
    return await instance.get(`/movie/${movieId}`);
}

const sendRateMovieRequest = async (authLevel, movieId, value) => {
    const instance = await getInstance(authLevel);
    return await instance.post(`/movie/${movieId}/rating`, { 'value': value });
}

module.exports = {
    sendDeleteRatingRequest,
    sendGetDetailsRequest,
    sendRateMovieRequest,
}
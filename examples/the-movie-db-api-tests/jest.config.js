require('dotenv-defaults').config();

let api_key = process.env.THE_MOVIE_DB_API_KEY; 

if (!api_key || api_key === 'your_api_key') {
    throw new Error ("api_key is not configured.");
}

/** @type {import('jest').Config} */
const config = {
    verbose: true,
    setupFilesAfterEnv: ['./utils/add-schema-validator-matchers.js'],
};

module.exports = config;
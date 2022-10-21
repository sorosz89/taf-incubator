const stringOrNull = { 
    oneOf: [
        { type: "string" },
        { type: "null" }
    ]
};

const integerOrNull = { 
    oneOf: [
        { type: "integer" },
        { type: "null" }
    ]
};

const nullOrObject = { 
    oneOf: [
        { type: "null" },
        { type: "object" }
    ]
};

module.exports = {
    type: "object",
    properties: {
        adult: { type: "boolean" },
        backdrop_path: stringOrNull,
        belongs_to_collection: nullOrObject,
        budget: { type: "integer"},
        genres: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" }
                }
            }
        },
        homepage: stringOrNull,
        id: { type: "integer" },
        imdb_id: { 
            oneOf: [
                {
                    type: "string",
                    minLength: 9,
                    maxLength: 9,
                    pattern: "^tt[0-9]{7}"
                }, {
                    type: "null"
                }
            ]
        },
        original_language: { type: "string" },
        original_title: { type: "string" },
        overview: stringOrNull,
        popularity: { type: "number" },
        poster_path: stringOrNull,
        production_companies: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    id: { type: "integer" },
                    logo_path: stringOrNull,
                    origin_country: { type: "string" },
                }
            }
        },
        production_countries: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    iso_3166_1: { type: "string" },
                    name: { type: "string" }
                }
            }
        },
        release_date: {
            type: "string",
            format: "date"
        },
        revenue: { type: "integer" },
        runtime: integerOrNull,
        spoken_languages: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    iso_639_1: { type: "string" },
                    name: { type: "string" }
                }
            }
        },
        status: {
            type: "string",
            enum: ["Rumored", "Planned", "In Production", "Post Production", "Released", "Canceled"]
        },
        tagline: stringOrNull,
        title: { type: "string" },
        video: { type: "boolean" },
        vote_average: { type: "number" },
        vote_count: { type: "integer" }
    }
};
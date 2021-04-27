// File to correct issues with .env and webpack
// (Import .env variables from here using
// "process.env.{.env variable name}")
require("dotenv").config({path: "./.env"});

module.exports = {
    env: {
        ALCHEMY_ROPSTEN = process.env.ALCHEMY_ROPSTEN,
        ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY
    },
};
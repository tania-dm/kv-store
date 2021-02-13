'use strict';

// load env vars for test env since fastify-cli does not do it
require('dotenv').config()

function loadEnvironmentVariable(keyname) {
    const envVar = process.env[keyname];

    if (!envVar) {
        throw new Error(`Must include ${keyname} as an env variable.`)
    }
    return envVar;
}

module.exports = {
    redisUri: loadEnvironmentVariable('REDIS_URI'),
    redisPort: loadEnvironmentVariable("REDIS_PORT"),
    redisHostname: loadEnvironmentVariable("REDIS_HOSTNAME"),
    redisPassword: loadEnvironmentVariable("REDIS_PASSWORD")
};

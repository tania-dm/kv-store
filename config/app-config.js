'use strict';

// load environment variables for test ecosystem since fastify-cli does not do it
require('dotenv').config();

function loadEnvironmentVariable(keyname) {
	const envVar = process.env[keyname];

	if (!envVar) {
		throw new Error(`Must include ${keyname} as an env variable.`)
	}
	return envVar;
}

module.exports = {
	redisPort: loadEnvironmentVariable("REDIS_PORT"),
	redisHostname: loadEnvironmentVariable("REDIS_HOSTNAME"),
	redisPassword: loadEnvironmentVariable("REDIS_PASSWORD"),
	port: loadEnvironmentVariable("PORT")
};
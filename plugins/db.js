'use strict';

const fp = require('fastify-plugin');

const appConfig = require('../config/app-config');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-redis'), {
        port: appConfig.redisPort,
        host: appConfig.redisHostname,
        password: appConfig.redisPassword,
        db: 0
    });
})
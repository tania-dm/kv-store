'use strict';

const fp = require('fastify-plugin');

const appConfig = require('../config/app-config');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-redis'), appConfig.redisUri);
})
'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-redis'), {
        port: 6379,
        host: '127.0.0.1',
        db: 0
    });
})
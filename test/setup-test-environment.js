// create a fastify instance without fastify-cli

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const app = require('../app');


module.exports = function setupTestEnv() {
    const fastify = Fastify({
        pluginTimeout: 2 * 60 * 1000
    });

    fastify.register(fp(app));

    beforeAll(async() => {
        await fastify.ready();
        await fastify.redis.flushdb();
    });

    beforeEach(async() => {
        await fastify.redis.flushdb();
    });

    afterEach(async() => {
        await fastify.redis.flushdb();
    });

    afterAll(async () => {
        await fastify.close();
    });

    return fastify;
};
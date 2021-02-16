// mock-plugin for redis test instance

'use strict';

const fp = require('fastify-plugin');
const Redis = require('ioredis-mock');

function fastifyRedis(fastify, options, next) {
	let client = null;

	if (fastify.redis) {
		return next(new Error('fastify-redis has already been registered'));
	} else {
		try {
			client = new Redis();
		} catch (err) {
			return next(err);
		}

		fastify.addHook('onClose', close);

		fastify.decorate('redis', client);
	}

	next();
}

function close(fastify, done) {
	fastify.redis.quit(done);
}

module.exports = fp(fastifyRedis, {
	fastify: '>=1.x',
	name: 'fastify-redis'
});
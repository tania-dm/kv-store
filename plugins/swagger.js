'use strict';

const fp = require('fastify-plugin');
const appConfig = require('../config/app-config');

const port = appConfig.port || 3000;

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('fastify-swagger'), {
        routePrefix: '/documentation',
        swagger: {
          info: {
            title: 'Key-Value API',
            description: 'Key-Value store',
            version: '0.1.0'
          },
          externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
          },
          host: `127.0.0.1:${port}`,
          schemes: ['http'],
          consumes: ['application/json'],
          produces: ['application/json'],
        },
        uiConfig: {
          docExpansion: 'list',
          deepLinking: false
        },
        exposeRoute: true
      });
});

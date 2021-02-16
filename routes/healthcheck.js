'use strict';

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Healthcheck'],
      description: 'Healthcheck endpoint to verify if the app is running propertly',
      response: {
        200: { type: 'string' }
      }
    },
    handler: (request, reply) => {
      reply.send('App running');
    }
  });
}

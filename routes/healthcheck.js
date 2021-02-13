'use strict';

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Healthcheck'],
      description: 'Healthcheck endpoint to verify if the app is running propertly',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    handler: async (request, reply) => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    }
  });
}

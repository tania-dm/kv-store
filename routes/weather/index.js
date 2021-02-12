'use strict'

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/:key',
    schema: {
      description: 'Get weather for all locations',
      params: {
        type: 'object',
        properties: {
          key: { type: 'string' }
        },
        required: ['key']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            timestamp: { type: 'number' },
            temperature: { type: 'number' },
            precipitation: { type: 'string' },
            windSpeed: { type: 'number' }
          },
          required: ['timestamp', 'temperature', 'precipitation', 'windSpeed'],
          additionalProperties: false
        },
        400: {
          type: 'string'
        }
      }
    },
    handler: async(request, reply) => {
      return {
        timestamp: 123567,
        temperature: 10,
        precipitation: '0 mm',
        windSpeed: 10
      };
      // case: keyname is not found
      // reply
      //   .code(400)
      //   .send(`Bad request. Keyname ${request.params.key} does not exist.`)
    }
  })
}

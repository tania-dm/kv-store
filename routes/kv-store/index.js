'use strict';

module.exports = async function (fastify, opts) {
  const { redis } = fastify;

  fastify.route({
    method: 'GET',
    url: '/:key',
    schema: {
      description: 'Get value of the requested key',
      params: {
        type: 'object',
        properties: {
          key: { type: 'string' }
        },
        required: ['key']
      },
      response: {
        200: { type: 'string' },
        400: { type: 'string' }
      }
    },
    handler: async (request, reply) => {
      try {
        const val = await redis.get(request.params.key);

        if (val === null ) {
          reply
            .code(400)
            .send(`Bad request. Keyname "${request.params.key}" does not exist.`);
        } else {
          reply
            .send(val);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
};

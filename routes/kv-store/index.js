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
    handler: (request, reply) => {
      redis.get(request.params.key, (err, val) => {
        if (val === null ) {
          reply
            .code(400)
            .send(`Bad request. Keyname "${request.params.key}" does not exist.`);
        } else {
          reply
            .send(val);
        }
      });
    }
  });
};

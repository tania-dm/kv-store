'use strict';

const setupTestEnv = require('../setup-test-environment');
const fastify = setupTestEnv();

test('it should get an ok response from the healthcheck route', async() => {
  expect.assertions(2);

  const serverResponse = await fastify.inject({
    url: `/`,
    method: 'GET'
  });

  expect(serverResponse.statusCode).toBe(200)
  expect(serverResponse.body).toBe('App running')
});
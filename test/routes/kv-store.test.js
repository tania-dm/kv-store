'use strict';

const setupTestEnv = require('../setup-test-environment');
const fastify = setupTestEnv();

test('it should retrieve the value of the requested key', async() => {
  expect.assertions(2);

  const key = 'testKey';
  const value = 'some value';

  fastify.redis.set(key, JSON.stringify(value), err => {
    if (err) {
      console.error(err);
    }
  });

  const serverResponse = await fastify.inject({
    url: `/kv-store/${key}`,
    method: 'GET'
  });

  expect(serverResponse.statusCode).toBe(200)
  expect(JSON.parse(serverResponse.body)).toBe('some value')
});

test('it should receive a 400 status code response for non-existent key', async() => {
  expect.assertions(2);

  const key1 = 'testKey1';
  const key2 = 'testKey2';
  const value1 = 'some value';

  fastify.redis.set(key1, JSON.stringify(value1), err => {
    if (err) {
      console.error(err);
    }
  });

  const serverResponse = await fastify.inject({
    url: `/kv-store/${key2}`,
    method: 'GET'
  });

  expect(serverResponse.statusCode).toBe(400)
  expect(serverResponse.body).toBe(`Bad request. Keyname "${key2}" does not exist.`)
});
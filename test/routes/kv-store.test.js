'use strict';

const { test } = require('tap');
const { build } = require('../helper');

test('successful GET :key route', async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: '/kv-store/banana'
  });
  t.equal(res.payload, 'ceva');
});

test('unsuccessful GET :key route', async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: '/kv-store/something'
  });
  t.equal(res.payload, `Bad request. Keyname "something" does not exist.`);
});

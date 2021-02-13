'use strict';

const { test } = require('tap');
const { build } = require('../helper');

test('Healthcheck route', async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: '/'
  });
  t.deepEqual(JSON.parse(res.payload).status, "ok");
});

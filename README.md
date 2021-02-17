## KV-store

#### Description
This is a service which provides both a websocket server and a REST endpoint built with [Fastify](https://www.fastify.io/). The websocket server accepts messages containing any key-value pair and stores it in [Redis](https://redis.io/).
The REST endpoint accepts GET requests specifying a key and it returns the corresponding value for that key or a HTTP error in case the key does not exist.


#### API documentation
Documentation was generated using [Swagger](https://swagger.io/) and can be accessed at 127.0.0.1:3000/documentation.
You can specify the server port using the **PORT** env variable.

#### Project installation
1. Clone project
2. Install dependencies: `npm install` or `yarn install`
3. Add a `.env` file or rename the `.env.example` file and add the corresponding environment variables as per the example.
4. Run project: `npm run dev` or `yarn run dev`
5. Add some data in Redis: `npm run seed` or `yarn run seed`
6. Run tests: first stop the server and then run either `npm run test` or `yarn run test`

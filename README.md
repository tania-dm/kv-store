## KV-store

#### Description
This is a service which provides both a websocket server and a REST endpoint built with [Fastify](https://www.fastify.io/). The websocket server accepts messages containing any key-value pair and stores it in [Redis](https://redis.io/).
The REST endpoint accepts GET requests specifying a key and it returns the corresponding value for that key or a HTTP error in case the key does not exist.


#### API documentation
Documentation was generated using [Swagger](https://swagger.io/) and can be accessed at http://localhost:3000/documentation.

#### Project installation
1. Clone project
2. Install dependencies: `npm install` or `yarn install`
3. Add a `.env` file or rename the `.env.example` file and add the corresponding environment variables as per the example.
4. Run project: `npm run dev` or `yarn run dev`
5. Run tests: `npm run test` or `yarn run test`
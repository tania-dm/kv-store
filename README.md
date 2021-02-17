## KV-store

#### Description
This is a service which provides both a websocket server and a REST endpoint built with [Fastify](https://www.fastify.io/). The websocket server accepts messages containing any key-value pair and stores it in [Redis](https://redis.io/).
The REST endpoint accepts GET requests specifying a key and it returns the corresponding value for that key or a HTTP error in case the key does not exist.


#### API documentation
Documentation was generated using [Swagger](https://swagger.io/) and can be accessed at http://127.0.0.1:3000/documentation.
You can specify the server port using the **PORT** env variable.

#### Project installation
1. Clone project
2. Install dependencies: `npm install` or `yarn install`
3. Start Redis in a docker container (this implies to have docker installed):
    - Make the redis script executable: `chmod +x redis.sh`
    - Run the script: `./redis.sh`
4. Run project: `npm run dev` or `yarn run dev`
5. Add some data in Redis: `npm run seed` or `yarn run seed`
6. Run tests: first stop the server and then run either `npm run test` or `yarn run test`

Diclaimer: If the redis container stops at any point, data will be persisted in an AOF file in `data/redis` in project's root folder.

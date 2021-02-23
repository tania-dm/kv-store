'use strict';

// helper function to validate the data to be saved in Redis.
function isValid(data) {
    let payload;

    try {
        payload = JSON.parse(data);
    } catch (error) {
        return false;
    }

    if (!Array.isArray(payload)) return false;
    if (payload.length !== 2) return false;
    if (typeof payload[0] !== 'string') return false;
    return true;
}

module.exports = async function (fastify, opts) {
    const { redis } = fastify;

    fastify.get('/ws/kv-store', {
        websocket: true,
        schema: {
            hide: true
        }
    }, (connection, req) => {
        connection.socket.on('message', async (data) => {
            if (isValid(data)) {
                const [key, value] = JSON.parse(data);
                try {
                   await redis.set(key, JSON.stringify(value));
                   connection.socket.send('Data saved to database');

                } catch (error) {
                    connection.socket.send(error);
                }
            } else {
                connection.socket.send('Data should be an array with first element a string and second one a valid JSON data structure');
            }
        });
    });
};

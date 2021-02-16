'use strict';

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

    fastify.get('/ws/kv-store', { websocket: true }, (connection, req) => {
        connection.socket.on('message', data => {
            if (isValid(data)) {
                const [key, value] = JSON.parse(data);

                redis.set(key, JSON.stringify(value), (err) => {
                    if (err) {
                        connection.socket.send(err);
                    } else {
                        connection.socket.send('Data saved to database');
                    }
                });
            } else {
                connection.socket.send('Data should be an array with first element a string and second one a valid JSON data structure');
            }
        });
    });
};

'use strict';

function isValid(data) {
    if (!Array.isArray(data)) return false;
    if (data.length !== 2) return false;
    if (typeof data[0] !== 'string') return false;
    return true;
}

module.exports = async function (fastify, opts) {
    const { redis } = fastify;

    fastify.get('/ws/kv-store', { websocket: true }, (connection, req) => {
        connection.socket.on('message', data => {
            const payload = JSON.parse(data);
            if (isValid(payload)) {
                const [key, value] = payload;

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
}

'use strict';

const WebSocket = require('ws');
const setupTestEnv = require('../setup-test-environment');
const appConfig = require('../../config/app-config');

const port = appConfig.PORT || 3000;

const fastify = setupTestEnv();

test('it should save data to db', done => {
    expect.assertions(1);

    fastify.listen(port, err => {
        const data = ['someKey', 'someValue'];
        const client = new WebSocket(`ws://localhost:${port}/ws/kv-store`);

        client
            .on('open', () => {
                client.send(JSON.stringify(data));
            })
            .on('message', (msg) => {
                expect(msg).toBe('Data saved to database');

                client.close();
            })
            .on('close', () => done());
    })
});

describe('invalid data', () => {
    test('it should send an error for invalid key', done => {
        expect.assertions(1);

        fastify.listen(port, err => {
            const data = [12345, 'someValue'];
            const client = new WebSocket(`ws://localhost:${port}/ws/kv-store`);

            client
                .on('open', () => {
                    client.send(JSON.stringify(data));
                })
                .on('message', (msg) => {
                    expect(msg).toBe('Data should be an array with first element a string and second one a valid JSON data structure');

                    client.close();
                })
                .on('close', () => done());
        })
    });

    test('it should send an error for invalid data type', done => {
        expect.assertions(1);

        fastify.listen(port, err => {
            const data =  {
                'someKey': 'someValue'
            };
            const client = new WebSocket(`ws://localhost:${port}/ws/kv-store`);

            client
                .on('open', () => {
                    client.send(JSON.stringify(data));
                })
                .on('message', (msg) => {
                    expect(msg).toBe('Data should be an array with first element a string and second one a valid JSON data structure');

                    client.close();
                })
                .on('close', () => done());
        })
    });

    test('it should send an error for invalid data length', done => {
        expect.assertions(1);

        fastify.listen(port, err => {
            const data = ['someKey', 'some value', 'some other value']
            const client = new WebSocket(`ws://localhost:${port}/ws/kv-store`);

            client
                .on('open', () => {
                    client.send(JSON.stringify(data));
                })
                .on('message', (msg) => {
                    expect(msg).toBe('Data should be an array with first element a string and second one a valid JSON data structure');

                    client.close();
                })
                .on('close', () => done());
        })
    });

    test('it should send an error for non string data sent by ws client', done => {
        expect.assertions(1);

        fastify.listen(port, err => {
            const data = ['someKey', 'some value']
            const client = new WebSocket(`ws://localhost:${port}/ws/kv-store`);

            client
                .on('open', () => {
                    client.send(data);
                })
                .on('message', (msg) => {
                    expect(msg).toBe('Data should be an array with first element a string and second one a valid JSON data structure');

                    client.close();
                })
                .on('close', () => done());
        })
    });
})


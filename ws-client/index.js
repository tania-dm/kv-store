const WebSocket = require('ws');

const client1 = new WebSocket('ws://localhost:3000/ws/kv-store');
const client2 = new WebSocket('ws://localhost:3000/ws/kv-store');
const client3 = new WebSocket('ws://localhost:3000/ws/kv-store');

const mySeeds1 = [
    [Date.now().toString(), {
        location: 'Barcelona',
        temperature: 11,
        precipitation: '0 mm'
    }],
    ['score', 89],
    ['users', ['Pim', 'Pom', 'Anne']],
    // [10, '50%']
];

const mySeeds2 = [
    [Date.now().toString(), {
        location: 'Amsterdam',
        temperature: 5,
        precipitation: '50  mm'
    }],
    ['speed', '100 km/h'],
    ['cat', {
        name: 'Darth Vader',
        color: 'orange',
        age: 7
    }]
];



client1.on('open', () => {
    mySeeds1.forEach(item => {
        client1.send(JSON.stringify(item));
    });
});

client1.on('message', message => {
  console.log(message);
  // check how to close connection
});

client2.on('open', () => {
    mySeeds2.forEach(item => {
        client2.send(JSON.stringify(item));
    });
});

client2.on('message', message => {
  console.log(message);
});

client3.on('open', () => {
    client3.send(JSON.stringify(['speed', '50 km/h']));
});

client3.on('message', message => {
  console.log(message);
});
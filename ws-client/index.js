const WebSocket = require('ws');
const appConfig = require('../config/app-config');

const port = appConfig.PORT || 3000;

const client1 = new WebSocket(`ws://localhost:${port}/ws/kv-store`);
const client2 = new WebSocket(`ws://localhost:${port}/ws/kv-store`);
const client3 = new WebSocket(`ws://localhost:${port}/ws/kv-store`);

const mySeeds1 = [
	['forecast', {
		country: 'Spain',
		temperature: 11,
		precipitation: '0 mm'
	}],
	['temperature', 11],
	['locations', ['Barcelona', 'Madrid', 'Sevilla']],
];

const mySeeds2 = [
	['forecast', {
		location: 'Netherlands',
		temperature: 5,
		precipitation: '50 mm'
	}],
	['precipitation', '50 mm'],
];

client1.on('open', () => {
	mySeeds1.forEach(item => {
		client1.send(JSON.stringify(item));
	});
});
client1.on('message', message => {
	console.log(message);
});
client1.on('close', function close() {
	console.log('disconnected');
});

client2.on('open', () => {
	mySeeds2.forEach(item => {
		client2.send(JSON.stringify(item));
	});
});

client2.on('message', message => {
	console.log(message);
});
client2.on('close', function close() {
	console.log('disconnected');
});

client3.on('open', () => {
	client3.send(JSON.stringify(['wind', '50 km/h']));
});
client3.on('message', message => {
	console.log(message);
});
client3.on('close', function close() {
	console.log('disconnected');
});
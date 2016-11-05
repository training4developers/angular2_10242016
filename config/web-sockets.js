const ws = require('ws');
const redis = require('redis');
 
const wsPort = 3030;

const redisPort = 16208;
const redisHost = 'pub-redis-16208.us-east-1-3.7.ec2.redislabs.com';
const redisPass = 't$dcl@ss!';

const redisClient = new Promise((resolve, reject) => {

	const client = redis.createClient(redisPort, redisHost, { no_ready_check: true });

	client.auth(redisPass, err => {
		if (err) reject(err);
	});

	client.on('connect', err => {
		if (err) reject(err);
		resolve(client);
	});

});

const wss = new ws.Server({ port: wsPort }, () => {
	console.log(`web socket server started on port ${wsPort}`);
});
 
wss.on('connection', ws => {

	console.log(`web socket connection opened on port ${wsPort}`);

	// let counter = 0;
	// let handle;

	ws.on('close', () => {
		console.log(`web socket connection closed on port ${wsPort}`);
		//clearInterval(handle);
	});

	// handle = setInterval(() => {
	// 	ws.send(JSON.stringify(counter++));
	// }, 500);

	redisClient.then(client => {
		client.on('message', (change, message) => {
			console.log(message);
			ws.send(message);
		});
		client.subscribe('update');
	});

 
});
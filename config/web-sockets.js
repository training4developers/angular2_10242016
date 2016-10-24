const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 3020 });
 
wss.on('connection', ws => {

	console.log('connection opened');

	let counter = 0;
	let handle;

	ws.on('close', () => {
		console.log('connection closed');
		clearInterval(handle);
	});

	handle = setInterval(() => {
		ws.send(JSON.stringify(counter++));
	}, 500);
 
});
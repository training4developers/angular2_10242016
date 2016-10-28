const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');
 
const redisPort = 16208;
const redisHost = 'pub-redis-16208.us-east-1-3.7.ec2.redislabs.com';
const redisPass = 't$dcl@ss!';

const appPort = 3020;

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

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/:key', (req, res) => {

	redisClient.then(client => {
		client.get(req.params.key, (err, reply) => {

			if (err) {
				res.status(500).send(err);
				return;
			}

			if (reply === null) {
				res.sendStatus(404);
			} else {
				res.set('Content-Type', 'application/json');
				res.send(reply);
			}
			
		});
	});

});

app.post('/:key', (req, res) => {

	redisClient.then(client => {

		const value = JSON.stringify(req.body);

		client.set(req.params.key, value, (err, reply) => {

			if (err) {
				res.status(500).send(err);
				return;
			}

			client.publish('update', JSON.stringify({
				key: req.params.key,
				value
			}));

			res.json(reply);
		});
	});
});


app.listen(appPort, () => {
	console.log(`redis web server listening on port ${appPort} `)
});
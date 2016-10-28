var redis = require('redis');
 
const redisPort = 16208;
const redisHost = 'pub-redis-16208.us-east-1-3.7.ec2.redislabs.com';
const redisPass = 't$dcl@ss!';
 
var client = redis.createClient(redisPort, redisHost, {no_ready_check: true});
client.auth(redisPass, function (err) {
    if (err) throw err;
});
 
client.on('connect', function() {
    console.log('Connected to Redis');
 
    client.set("foo", "bar", redis.print);
    client.get("foo", function (err, reply) {
            if (err) throw err;
            console.log(reply.toString());
    });
});
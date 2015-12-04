var express = require('express');
var http = require('http');

var api = require('./controller/api');
var socket = require('./controller/socket');

var app = express();

var server = http.createServer(app);

//web socket
var io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

//start server
server.listen(8080, function() {
	console.log('Server wss is up! port: http://localhost:8080');
});
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var api = require('./controller/api');
var socket = require('./controller/socket');

var app = express();

var server = http.createServer(app);

//parser json
app.use(bodyParser.json());

//allowed cors - cross domain
app.use(api.cors);

//routes api
app.get('/api/users', api.getUsers);

app.post('/api/user', api.addUser);

app.delete('/api/user/:id', api.deleteUser);

//web socket
var io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

//start server
server.listen(8080, function() {
	console.log('Server wss is up! port: http://localhost:8080');
});
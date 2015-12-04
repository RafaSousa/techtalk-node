
var express = require('express')
var http = require('http');
var bodyParser = require('body-parser');
var config = require('./config');
var socket = require('./socket.js');
var api = require('./api.js');

var app = express();
var server = http.createServer(app);

//web api
app.use(bodyParser.json());

app.use(api.cors);

app.get('/api/users', api.getUsers);

app.post('/api/user', api.addUser);

app.delete('/api/user/:id', api.deleteUser);

//web socket
var io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

server.listen(config.port, function () {
    console.log('Server API, WSS is up ;) - port:', config.port);
})

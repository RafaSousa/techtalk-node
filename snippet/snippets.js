//code snippet Rafa Sousa =)

/*******************************************/
//1 - code snippet server - web
/*******************************************/
var express = require('express');

var app  = express();

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
	res.sendfile('./index.html');
});

app.listen(3000, function() {
	console.log('Server web up! port: http://localhost:3000');
});



/*******************************************/
//2 - code snippet server - api
/*******************************************/
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var api = require('./controller/api');

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

//start server
server.listen(8080, function() {
	console.log('Server web up! port: http://localhost:8080');
});

/*******************************************/
//3 - code snippet server - sokect.io
/*******************************************/
var socket = require('./socket.js');

//web socket
var io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

server.listen(8080, function () {
    console.log('Server web up! port: http://localhost:8080');
})



/*******************************************/
//4 - code snippet server - config
/*******************************************/
var config = require('./config');
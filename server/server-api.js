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
	console.log('Server api is up! port: http://localhost:8080');
});
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

var users = [];
var messages = [];

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.listen(config.port);

console.log('server web up =)');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var techs = [{ id: 123, name: 'Rafa Sousa' }];
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/tech', function (req, res) {
    res.json(techs);
});

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

app.get('/chat', function (req, res) {
    res.sendfile('./public/chat.html');
});

// app.listen(port);
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {

    console.log('Client connected...');

    socket.on('join', function(data) {
        console.log(data);
        
        socket.emit('messages', 'Hello from server');
    });
    
    socket.on('messages', function (data) {
        
        //socket.emit('broad', data);
        
        socket.broadcast.emit('broad', data);
        
        console.log(data);
    });
});

console.log('server up =)');
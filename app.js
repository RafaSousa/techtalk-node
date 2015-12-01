var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var techs = [];

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/tech', function (req, res) {
    res.json(techs);
});

app.get('/chat', function (req, res) {
    res.sendfile('./public/chat.html');
});

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

// app.listen(port);
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {

    socket.on('setConnection', function (data, callback) {

        techs.push({ id: socket.id, name: data.name });

        socket.emit('sendQtyOnline', getTach(socket));
        socket.broadcast.emit('sendQtyOnline', getTach(socket));

        callback(data);
        
        console.log('setConnection', data);
    });

    socket.on('sendMessage', function (data) {

        var tach = getTach(socket);

        var message = {
            name: tach.name,
            text: data.text,
            time: new Date()
        };
        
        socket.emit('sendBroadcast', message);
        socket.broadcast.emit('sendBroadcast', message);

        console.log('sendMessage', message);
    });
    
    socket.on('disconnect', function () {

        socket.broadcast.emit('sendQtyOnline', getTach(socket));
        
        for (var i = 0; i < techs.length; ++i) {
            if (techs[i].id == socket.id) {
                techs.splice(i, 1);
                return;
            }
        }
        
        console.log('disconnect', socket.id);
    });
});

function getTach(socket) {
    
    var tach = { name: '' };
    
    if (techs && socket) {
        for (var i = 0; i < techs.length; ++i) {
            if (techs[i].id == socket.id) {
                tach = techs[i];
            }
        }
    }
    
    tach.qtyOnline = techs.length;
    
    return tach;
};

console.log('server up =)');
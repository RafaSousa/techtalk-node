var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

var users = [];
var messages = [];

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

//get all users
app.get('/api/users', function (req, res) {
    res.json(users);
});

//create new user
app.post('/api/user', function (req, res) {
    var id = Math.random() * (999 - 0) + 0;
    users.push({ id: parseInt(id), name: req.body.name });
    res.json(users);
});

//delete user
app.delete('/api/user/:id', function (req, res) {
    for (var i = users.length; i--;) {
        if (users[i].id.toString() === req.params.id) {
            users.splice(i, 1);
        }
    }
    res.json(users);
});

//application
app.get('/', function (req, res) {
    res.sendfile('./client/views/index.html');
});

// app.listen(config.port);
var io = require('socket.io').listen(app.listen(config.port));

io.sockets.on('connection', function (socket) {

    //user:get
    socket.on('user:getUser', function (data, callback) {

        var user = getUserById(data.user.id);

        user.id = socket.id;

        console.log('user:getUser', user);
        
        if (callback && typeof (callback) === "function") {
            callback({ users: users, messages: messages });
        }
    });
    
    //user:connect
    socket.on('user:connect', function (data, callback) {

        var user = { id: socket.id, name: data.name, lastMessage: '...' };
        var message = {
            name: 'Sala',
            text: 'Usuário ' + data.name + ' entrou na sala.',
            time: new Date()
        };

        users.push(user);

        socket.broadcast.emit('user:join', {
            user: user,
            message: message
        });

        console.log('user:connect', user);
        
        if (callback && typeof (callback) === "function") {
            callback({ user: user, users: users });
        }
    });
 
    //send:message
    socket.on('send:message', function (data, callback) {

        var user = getUserById(socket.id);

        var message = {
            name: user.name,
            text: data.message,
            time: new Date()
        };

        messages.push(message);

        socket.broadcast.emit('send:broad', message);

        console.log('send:message', user, message);

        if (callback && typeof (callback) === "function") {
            callback(message);
        }
    });

    //send:logout
    socket.on('send:logout', function (data, callback) {

        var message = {
            name: 'Sala',
            text: 'Usuário ' + data.user.name + ' saiu na sala.',
            time: new Date()
        };
        
        //remove da lista de users
        for (var i = 0; i < users.length; ++i) {
            if (users[i].id == data.user.id) {
                users.splice(i, 1);
                break;
            }
        }

        console.log('send:logout', data, users, message);

        if (callback && typeof (callback) === "function") {
            callback(data);
        }

        socket.broadcast.emit('user:left', { user: data.user, message: message });
    });
});

function getUserById(id) {

    var user = {};

    if (users) {
        for (var i = 0; i < users.length; ++i) {
            if (users[i].id == id) {
                user = users[i];
            }
        }
    }

    return user;
};

console.log('server up =)');
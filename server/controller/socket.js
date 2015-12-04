var users = [];
var messages = [];

module.exports = function (socket) {

    socket.on('user:getUser', function (data, callback) {
        var user = getUserById(data.user.id);

        user.id = socket.id;

        console.log('user:getUser', user);

        callback({ users: users, messages: messages });
    });
    
    //user:connect
    socket.on('user:connect', function (data, callback) {
        var user = { id: socket.id, name: data.name, lastMessage: '...' };

        var message = { name: 'Sala', text: 'Usuário ' + data.name + ' entrou na sala.', time: new Date() };

        users.push(user);

        //broadcast
        socket.broadcast.emit('user:join', { user: user, message: message });

        console.log('user:connect', user);

        callback({ user: user, users: users });
    });
 
    //send:message
    socket.on('send:message', function (data, callback) {

        var user = getUserById(socket.id);

        var message = { name: user.name, text: data.message, time: new Date() };

        messages.push(message);

        //broadcast
        socket.broadcast.emit('send:broad', message);

        console.log('send:message', user, message);

        callback(message);
    });

    //send:logout
    socket.on('send:logout', function (data, callback) {

        var message = { name: 'Sala', text: 'Usuário ' + data.user.name + ' saiu na sala.', time: new Date() };
        
        //remove da lista de users
        for (var i = 0; i < users.length; ++i) {
            if (users[i].id == data.user.id) {
                users.splice(i, 1);
                break;
            }
        }

        console.log('send:logout', data, users, message);

        callback(data);

        //broadcast
        socket.broadcast.emit('user:left', { user: data.user, message: message });
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
};
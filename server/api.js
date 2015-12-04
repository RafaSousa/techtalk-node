var users = [];
var messages = [];

//cors allow cross origin
exports.cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

//get all users
exports.getUsers = function (req, res) {
    res.json(users);
};

//add a new user
exports.addUser = function (req, res) {
    users.push({ id: parseInt(Math.random() * 1000), name: req.body.name });

    res.json(users);

    console.log('user:getUser', users);
};

//delete single user by id
exports.deleteUser = function (req, res) {
    for (var i = users.length; i--;) {
        if (users[i].id.toString() === req.params.id) {
            users.splice(i, 1);
        }
    }
    
    res.json(users);
    
    console.log('user:getUser', users);
};
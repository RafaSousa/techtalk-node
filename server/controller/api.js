
var API = {};

API.users = [];

//get all users
API.getUsers = function (req, res) {
    res.json(API.users);
};

//add a new user
API.addUser = function (req, res) {
    API.users.push({ id: parseInt(Math.random() * 1000), name: req.body.name });
    res.json(API.users);
    console.log('user:getUser', API.users);
};

//delete single user by id
API.deleteUser = function (req, res) {
    for (var i = API.users.length; i--;) {
        if (API.users[i].id.toString() === req.params.id) {
            API.users.splice(i, 1);
        }
    }    
    res.json(API.users);    
    console.log('user:getUser', API.users);
};

//cors allow cross origin
API.cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

module.exports = API;
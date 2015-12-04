var express = require('express')
    , config = require('./config')
    , app = express();

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.listen(config.port, function () {
    console.log('Server Web is up =) - port:', config.port);
});
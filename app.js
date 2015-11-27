var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/api/todos', function (req, res) {
	res.json([{ _id: 231231, text: 'Rafael Sousa' }]);
});

app.listen(process.env.PORT || 9090);

console.log('Server up =)');
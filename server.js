var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


var customers = [];

// get all todos
app.get('/api/todos', function (req, res) {
	res.json(customers);
});

// get by id todos
app.get('/api/todos/:todo_id', function (req, res) {
	var customer = {};
	for (var i = customers.length; i++;) {
		if (customers[i]._id.toString() === req.params.todo_id) {
			customer = customers[i];
			break; 
		}
	}

	res.json(customer);
});

// save/update todo
app.post('/api/todos', function (req, res) {

	var id = Math.random() * (999 - 0) + 0;

	customers.push({
		_id: id,
		text: req.body.text
	});

	res.json(customers);
});

// delete a todo
app.delete('/api/todos/:todo_id', function (req, res) {
	for (var i = customers.length; i--;) {
		if (customers[i]._id.toString() === req.params.todo_id) {
			customers.splice(i, 1);
		}
	}

	res.json(customers);
});


// application
app.get('*', function (req, res) {
	res.sendfile('./public/index.html');
});
	
app.listen(process.env.PORT || 8080);

console.log("App listening on port 8080");
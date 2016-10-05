var express = require('express');
// in order to parse JSON in the request body (req.body)
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'));

// data to be used by our route
var data = [
  {id: 1, priority: 1, status: "Open", owner: "Alex", decs: "App crashes when opening"},
  {id: 2, priority: 2, status: "New", owner: "Brian", decs: "Pages have a weird border"},
  {id: 3, priority: 3, status: "New", owner: "Ryan", decs: "Can't login to my e-mail"}
];

// got to localhost:3000/api/bugs to see our bugs (data in the array)
app.get('/api/bugs', function(req, res) {
	// stringifies and returns an array of bugs
	// res.status(200).send(JSON.stringify(data));
	res.json(data);
});

app.use(bodyParser.json());

app.post('/api/bugs', function(req, res) {
	console.log("Req body:", req.body);
	var newBug = req.body;
	newBug.id = data.length + 1;
	data.push(newBug);
	res.json(newBug);
});

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});

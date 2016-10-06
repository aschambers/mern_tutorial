var express = require('express');
// in order to parse JSON in the request body (req.body)
var bodyParser = require('body-parser');
// use mongodb
var MongoClient = require('mongodb').MongoClient;
// set objectId
var ObjectId = require('mongodb').ObjectID;

var app = express();
var db;

app.use(express.static('static'));

// // data to be used by our route
// var data = [
//   {id: 1, priority: 1, status: "Open", owner: "Alex", decs: "App crashes when opening"},
//   {id: 2, priority: 2, status: "New", owner: "Brian", decs: "Pages have a weird border"},
//   {id: 3, priority: 3, status: "New", owner: "Ryan", decs: "Can't login to my e-mail"}
// ];

// got to localhost:3000/api/bugs to see our bugs (data in the array), get a list of filtered records
app.get('/api/bugs', function(req, res) {
	// stringifies and returns an array of bugs
	// res.status(200).send(JSON.stringify(data));
	console.log("Query string", req.query);
	var filter = {};
	if (req.query.priority)
		filter.priority = req.query.priority;
	if (req.query.status)
		filter.status = req.query.status;
	db.collection("bugs").find().toArray(function(err, docs) {
		res.json(docs);
	});
});

app.use(bodyParser.json());
/* Insert a record */
app.post('/api/bugs', function(req, res) {
	console.log("Req body:", req.body);
	var newBug = req.body;
	db.collection("bugs").insertOne(newBug, function(err, result) {
		var newId = result.insertedId
		db.collection("bugs").find({_id: newId}).next(function(err, doc) {
			res.json(doc);
		});
	});
});

/* Get a single record */
app.get('/api/bugs/:id', function(req, res) {
	db.collection("bugs").findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
		res.json(bug);
	});
});

MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection) {
  	db = dbConnection;
  	var server = app.listen(3000, function() {
		var port = server.address().port;
		console.log("Started server at port", port);
	});
});

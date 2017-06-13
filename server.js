
// INIT
console.log('May Node be with you');

// DECLARING REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
// using express is as simple as declaring an instance of the class and requiring it.

app.use(bodyParser.urlencoded({extended: true})); // You must add MIDDLEWARES to EXPRESS by USING them
app.set('view engine', 'ejs') // view engine is for generating looping templates like poly data structures, you MUST set the view engine in express.

// ** MAKE SURE TO ADD CRUD HANDLERS AFTER USING STATEMENTS

var db;

MongoClient.connect('mongodb://daAdmin:defaultPass@ds113841.mlab.com:13841/star-wars-quotes', (err, database) => {
	if (err) return console.log(err);
	db = database;
	// STARTING SERVER LISTENING
	app.listen(3000, function() {
		console.log('server start success');
		console.log('listening on 3000');
	});
});

// ^^ App get's and set's are after the init function here ^^ 

app.get('/', (request, response) => {
	//response.send('hello world'); <-- sends back string
	//response.sendFile(__dirname + '/index.html'); // <-- sends back file in dir
	var cursor = db.collection('quotes').find();
	cursor.toArray(function(err, results) {
		if(err) return console.log(err);

		console.log(results);
		response.render('index.ejs', {quotes: results});
	});
	
});
// the above is a standard GET function run when a page is visited by client,
// in this case it is the index or root page denoted by '/', 
// the callback function takes two arguements, request and response as objects manipulated.
// they seem to have prototype functions built in. 
// KEY =>> WHENEVER A CLIENT REQUESTS PAGE the ENTIRE function runs.

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);

		console.log('saved to db');
		console.log(req.body);
		res.redirect('/');
	});
});
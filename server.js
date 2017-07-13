
// INIT
console.log('May Node be with you');

// DECLARING REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
// using express is as simple as declaring an instance of the class and requiring it.

app.use(bodyParser.urlencoded({extended: true})); // You must add MIDDLEWARES to EXPRESS by USING them
app.use(express.static('public'));
app.use(bodyParser.json())
app.set('view engine', 'ejs'); // view engine is for generating looping templates like poly data structures, you MUST set the view engine in express.

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

// Below is the update function using FETCH and Mongo DB. Pretty self explanatory.
// basically manipulating server to effectively communicate with other machines
// Node contains the verbiage as a language. effectively runs as JS on server
// probalby the point of the language given that is its stated goals. Interesting on the function cycle.
// will look into the way it uses callbacks soon. ON TO DELETE
app.put('/quotes', (req, res) => {
	db.collection('quotes').findOneAndUpdate(
		{name: 'Yoda'},
		{
			$set: {
			name: req.body.name,
			quote: req.body.quote
			}
		},
		{
			sort: {_id:-1},
			upsert: true
		},
		(err, result) => {
			if (err) return res.send(err)
				res.send(result)
		}
	)
});

// DELETE FUNCTION
// here's what I dont understand... Why the eff is the functions HERE when it's client-side
// so the answer is. YOU ARE A FUCKING IDIOT, and right... Commnet out
//var del = document.getElementById('delete')

//del.addEventListener(realized err here LOL)
//Okay, actual Server side delete.
app.delete('/quotes', (req, res) => {
	// handle request
	db.collection('quotes').findOneAndDelete(
		{name: req.body.name},
		(err, result) => {
			if (err) return res.send(500, err)
			res.send('A darth Vader quote got deleted')
	})
})

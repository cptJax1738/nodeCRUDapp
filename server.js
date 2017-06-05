
// INIT
console.log('May Node be with you');

// DECLARING REQUIREMENTS
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// using express is as simple as declaring an instance of the class and requiring it.

app.use(bodyParser.urlencoded({extended: true})); // You must add MIDDLEWARES to EXPRESS by USING them

// ** MAKE SURE TO ADD CRUD HANDLERS AFTER USING STATEMENTS

// STARTING SERVER LISTENING
app.listen(3000, function() {
	console.log('listening on 3000')
});
// ^^ App get's and set's are after the init function here ^^ 

app.get('/', (request, response) => {
	//response.send('hello world'); <-- sends back string
	response.sendFile(__dirname + '/index.html'); // <-- sends back file in dir
});
// the above is a standard GET function run when a page is visited by client,
// in this case it is the index or root page denoted by '/', 
// the callback function takes two arguements, request and response as objects manipulated.
// they seem to have prototype functions built in. 
// KEY =>> WHENEVER A CLIENT REQUESTS PAGE the ENTIRE function runs.

app.post('/quotes', (req, res) => {
	console.log('post method worked');
	console.log(req.body);
});
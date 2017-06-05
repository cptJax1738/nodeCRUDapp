console.log('May Node be with you');

const express = require('express');
const app = express();
// using express is as simple as declaring an instance of the class and requiring it.

app.listen(3000, function() {
	console.log('listening on 3000')
});
// ^^ App get's and set's are after the init function here ^^ 

app.get('/', (request, response) => {
	response.send('hello world')
});
// the above is a standard GET function run when a page is visited by client,
// in this case it is the index or root page denoted by '/', 
// the callback function takes two arguements, request and response as objects manipulated.
// they seem to have prototype functions built in.

// main.js

// PUT REQUEST INFO

var update = document.getElementById('update')

update.addEventListener('click', function() {
	// Send PUT request here
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': 'Darth Vader',
			'quote': 'I find your lack of faith disturbing.'
		})
	}).then(res => {
		if (res.ok) return res.json()
	}).then(data => {
		console.log(data)
		window.location.reload(true)
	})
})

// DELETE ClIENT SIDE
var del = document.getElementById('delete');

del.addEventListener('click', function() {
	fetch('quotes', {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'name': 'Darth Vader'
		})
	})
	.then(res => {
		if (res.ok) return res.json()
	})
	.then(data => {
		console.log(data)
		window.location.reload(true)
	})
})
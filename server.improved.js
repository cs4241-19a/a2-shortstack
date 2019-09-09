const http = require('http'),
	  fs   = require('fs'),
	  // IMPORTANT: you must run `npm install` in the directory for this assignment
	  // to install the mime library used in the following line of code
	  mime = require('mime'),
	  dir  = 'public/',
	  port = 3000

const appdata = []

const server = http.createServer(function(request, response) {
	if (request.method === 'GET') {
		handleGet(request, response)
	} else if (request.method === 'POST'){
		handlePost(request, response) 
	}
})

const handleGet = function(request, response) {
	const filename = dir + request.url.slice(1) 

	if (request.url === '/') {
		sendFile(response, 'public/index.html')
	} else {
		sendFile(response, filename)
	}
}

const handlePost = function(request, response) {
	if (request.url === '/add') {
		handleAdd(request, response)
	} //else if (request.url === '/change') {
		//handleChange(request, response)} 
	else if (request.url === '/checkDone') {
		checkDone(request, response)
	} else if (request.url === '/delete') {
		handleDelete(request, response)
	}
}

const handleAdd = function(request, response) {

	let datastr = ''
	request.on('data', function(data) {
		datastr += data	
	})
	
	request.on('end', function() {
		let exists = ''
		if (findData(JSON.parse(datastr)) == -1) {
			exists = 'no'
			datastr = JSON.parse(datastr)
			datastr.done = "no"

			let now = new Date();
			let due_date_date = new Date(datastr.due_date + 'GMT-0400');
			let time_left = due_date_date - now;
			let days = Math.round(time_left / 8.64e7)
			if (days < 1) days='Today'
	
			datastr.time_left = days
			appdata.push(datastr)
		} else exists = 'yes'

		response.writeHead(200, exists, {'Content-Type': 'text/plain'})
		response.end();
	})
}

const checkDone = function(request, response) {
	let datastr = ''
	request.on('data', function(data) {
		datastr += data	
	})
	
	request.on('end', function() {
		let done = ''
		let find = findData(JSON.parse(datastr));
		if (appdata[find].done == 'yes') {
			appdata[find].done = 'no'
			done = 'no'
		} else {
			appdata[find].done = 'yes'
			done = 'yes'
		}

		response.writeHead(200, done, {'Content-Type': 'text/plain'})
		response.end();
	})
}

const handleDelete = function(request, response) {
	let datastr = ''
	request.on('data', function(data) {
		datastr += data	
	})
	
	request.on('end', function() {
		let find = findData(JSON.parse(datastr))
		delete appdata[find]
		response.writeHead(200, done, {'Content-Type': 'text/plain'})
		response.end();
	})
}

const sendFile = function(response, filename) {
	const type = mime.getType(filename)
	console.log(filename)

	fs.readFile(filename, function(err, content) {
		console.log('1')
		 // if the error = null, then we've loaded the file successfully
		if (err === null) {
			 // status code: https://httpstatuses.com
			 console.log('2')
			 response.writeHeader(200, {'Content-Type': type})
			 response.end(content)
		} else {
			 // file not found, error code 404
			response.writeHeader(404)
			response.end('404 Error: File Not Found')
		}
	})
}

const findData = function(data) {
	const found = appdata.findIndex(function(i) {
		//let obj = JSON.parse(i);
		return(
			i.assignment === data.assignment &&
			i.classname === data.classname &&
			i.due_date === data.due_date
		)
	})
	// if(!found) return 0;
	// else return 1;
	return found;
	//if DNE, return true, else false
	//we don't want it to exist
}

server.listen(process.env.PORT || port)
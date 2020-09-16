const http = require("http");
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");
const mime = require("mime");
const {v4: uuid} = require("uuid");
const moment = require("moment");

const PUBLIC_DIR = "./public";
const PORT = process.env.PORT || 3000;

let users = [
	{id: uuid(), name: "John Smith", email: "jsmith@gmail.com", dob: "11/26/1992", age: "27"}
];

http.createServer((req, res) => {
	switch (req.method) {
		case "GET": {
			handleGet(req, res);
			break;
		}
		case "POST": {
			handlePost(req, res)
			break;
		}
		case "DELETE": {
			console.log("del req");
			handleDelete(req, res)
			break;
		}
		case "PATCH": {
			handlePatch(req, res)
			break;
		}
		default: {
			handleInvalidMethod(res);
		}
	}
}).listen(PORT, () => console.log(`Listening on port ${PORT}`));

const handleGet = (req, res) => {
	if (req.url === "/api/users") {
		handleSuccess(res);
	} else {
		const file = req.url === "/" ? PUBLIC_DIR + "/index.html" : PUBLIC_DIR + req.url;
		fs.readFile(file, (err, content) => {
			if (err) {
				handleResourceNotFound(res);
			} else {
				res.writeHeader(200, {"Content-Type": mime.getType(file)});
				res.end(content);
			}
		});
	}
}

const handlePost = (req, res) => {
	let dataString = "";
	req.on("data", (data) => dataString += data);
	req.on("end", () => {
		if (req.url === "/api/users") {
			const user = JSON.parse(dataString);
			user.id = uuid();
			user.dob = moment(new Date(user.dob)).add(1, "days").format("MM/DD/YYYY");
			user.age = calculateUserAge(user.dob);
			users.push(user);
			console.log("here")
			handleSuccess(res);
		} else {
			handleResourceNotFound(res);
		}
	});
}

const handlePatch = (req, res) => {
	const parsedUrl = url.parse(req.url);
	const query  = querystring.parse(parsedUrl.query);

	if (parsedUrl.pathname === "/api/users") {
		const {id} = query;
		if (users.some(user => user.id === id)) {
			//TODO: update user
			handleSuccess(res);
		} else {
			handleResourceNotFound(res);
		}
	} else {
		handleResourceNotFound(res);
	}
}

const handleDelete = (req, res) => {
	const parsedUrl = url.parse(req.url);
	const query  = querystring.parse(parsedUrl.query);

	if (parsedUrl.pathname === "/api/users") {
		const {id} = query;
		if (users.some(user => user.id === id)) {
			users = users.filter((user) => user.id != id);
			handleSuccess(res);
		} else {
			handleResourceNotFound(res);
		}
	} else {
		handleResourceNotFound(res);
	}
}

const handleSuccess = (res) => {
	res.writeHeader(200, {"Content-Type": "application/json"});
	res.end(JSON.stringify(users));
}

const handleResourceNotFound = (res) => {
	res.writeHeader(404);
	res.end("Error 404 Not Found.");
}

const handleInvalidMethod = (res) => {
	res.writeHeader(405);
	res.end("Error 405 Method not allowed.");
}

const calculateUserAge = (dob) => {
	return moment().diff(moment(dob, "MM/DD/YYYY"), "years");
}
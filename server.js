const http = require("http");
const fs = require("fs");
const mime = require("mime");
const {v4: uuid} = require("uuid");

const PUBLIC_DIR = "./public";
const port = 3000;

const appData = [
	{id: uuid(), name: "Test Testerson"},
];

http.createServer((req, res) => {
	if (req.method === "GET") {
		if (req.url === "/api/data") {
			res.writeHeader(200, {"Content-Type": "application/json"});
			res.end(JSON.stringify(appData));
		} else {
			const file = req.url === "/" ? PUBLIC_DIR + "/index.html" : PUBLIC_DIR + req.url;
			fs.readFile(file, (err, content) => {
				if (err) {
					res.writeHeader(404);
					res.end("Error 404: File Not Found.");
					return;
				}
				res.writeHeader(200, {"Content-Type": mime.getType(file)});
				res.end(content);
			});
		}
	} else if (req.method === "POST") {
		let dataString = "";
		req.on("data", (data) => dataString += data);
		req.on("end", () => {
			appData.push(JSON.parse(dataString));
			console.log("App data: " + appData); 

			res.writeHead(200, "OK", {"Content-Type": "text/plain"});
			res.end();
		});
	} else {
		res.writeHeader(405);
		res.end("Error 405. Method not allowed.");
	}
}).listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));
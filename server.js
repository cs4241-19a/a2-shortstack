const http = require("http");
const fs = require("fs");
const mime = require("mime");
const dir = "public/";
const port = 3000;

const appData = [
	{name: "Test Testerson"},
];

http.createServer((req, res) => {
	if (req.method === "GET") {
		const file = req.url === "/" ? "public/index.html" : dir + req.url.slice(1);	

		fs.readFile(file, (err, content) => {
			if (err) {
				res.writeHeader(404);
				res.end("Error 404: File Not Found.");
			} else {
				res.writeHeader(200, {"Content-Type": mime.getType(file)});
				res.end(content);
			}
		});
	} else if (req.method === "POST") {
		let dataString = "";

		req.on("data", (data) => dataString += data);

		req.on("end", () => {
			appData.push(JSON.parse(dataString));
			console.log("App data:");
			console.log(appData);

			// ... do something with the data here!!!

			res.writeHead(200, "OK", {"Content-Type": "text/plain"});
			res.end();
		});
	} else {
		res.writeHeader(405);
		res.end("Error 405. Method not allowed.");
	}
}).listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));
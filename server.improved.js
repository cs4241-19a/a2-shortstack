const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [{
    "firstname": "Luke",
    "lastname": "Skywalker",
    "major": "Lightsaber Construction",
    "year": 1596,
    "graduated": "Yes",
    "velocity": "42 m/s"
  },
  {
    "firstname": "Obi-Wan",
    "lastname": "Kenobi",
    "major": "Taking the High Ground",
    "year": 1554,
    "graduated": "Yes",
    "velocity": "11 m/s"
  }
];

const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);
  if (request.url === "/") {
    sendFile(response, "public/index.html")
  } else if (request.url === "/getdata") {
    sendData(response, appdata);
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function(request, response) {
  let dataString = "";

  request.on("data", function(data) {
    dataString += data
  });

  request.on("end", function() {
    switch (request.url) {
      case "/submit":
        const data = JSON.parse(dataString);

        const graduated = parseInt(data.year) < 2019 ? "Yes" : "No";

        const newMember = {
          "firstname": data.firstname,
          "lastname": data.lastname,
          "major": data.major,
          "year": data.year,
          "graduated": graduated,
          "velocity": data.velocity
        };
        appdata.push(newMember);
        response.writeHead(200, "OK", {
          "Content-Type": "text/plain"
        });
        response.end();

        break;
      case "/update":
        const updatedData = JSON.parse(dataString);

        const updatedGraduated = parseInt(updatedData.year) < 2019 ? "Yes" : "No";

        const updatedEntry = {
          "firstname": updatedData.firstname,
          "lastname": updatedData.lastname,
          "major": updatedData.major,
          "year": updatedData.year,
          "graduated": updatedGraduated,
          "velocity": updatedData.velocity
        };
        appdata.splice(updatedData.index, 1, updatedEntry);
        response.writeHead(200, "OK", {
          "Content-Type": "text/plain"
        });
        response.end();
        break;

      case "/delete":
        const entryToDelete = JSON.parse(dataString);
        appdata.splice(entryToDelete.memberNum, 1);
        response.writeHead(200, "OK", {
          "Content-Type": "text/plain"
        });
        response.end();
        break;

      default:
        response.end("404 Error: File Not Found");
        break;
    }
  })
};

const sendData = function(response, request) {
  const type = mime.getType(request);
  response.writeHeader(200, {
    "Content-Type": type
  });
  response.write(JSON.stringify({
    data: request
  }));
  response.end();
};

const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    if (err === null) {
      response.writeHeader(200, {
        "Content-Type": type
      });
      response.end(content)
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  })
};

server.listen(process.env.PORT || port);

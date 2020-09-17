const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  { pos: 1, name: "Bill", time: 10, diff: 0, done: "Yes" },
  { pos: 2, name: "Bob", time: 14, diff: 4, done: "Yes" },
  { pos: 3, name: "Jeb", time: 36, diff: 26, done: "Yes" }
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
    sendFile(response, "public/index.html");
  } else if (request.url === "css/style.css") {
    sendFile(response, "public/css/style.css");
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function(request, response) {
  let dataString = "";

  request.on("data", function(data) {
    dataString += data;
    console.log(dataString);
  });

  request.on("end", function() {
    let incoming = JSON.parse(dataString);
    let responseStr = "";
    // ... do something with the data here!!!
    if (request.url === "/submit") {
      //new entry
      addEntry(response, incoming);
    } else if (request.url === "/edit") {
      //edit existing entry
      editEntry(response, incoming);
    } else if (request.url === "/delete") {
      //removing an entry
      deleteEntry(response, incoming);
    } else if (request.url === "/start") {
      //send the data we have right away
      sendAppdata(response);
    }
  });
};

const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);

const sortData = function() {
  //sort the list in terms of which has the lowest time.
  appdata.sort((e1, e2) => (e1.time > e2.time ? 1 : -1));
  //assigning positon numbers and calculating time differences
  for (let i = 0; i < appdata.length; i++) {
    appdata[i].pos = i + 1;
    if ((i = 0)) {
      appdata[i].diff = 0;
    } else {
      appdata[i].diff = appdata[i].time - appdata[0].time;
    }
  }
};

const sendAppdata = function(response) {
  //sortData(); //commenting out sortdata makes it work. no idea why sortdata is bad.
  let data = JSON.stringify(appdata);
  response.writeHeader(200, { "Content-Type": "text/plain" });
  response.end(data);
};

const addEntry = function(response, input) {
  appdata.push(input);
  sendAppdata(response);
};

const editEntry = function(response, input) {
  //first search for the entry to see if it exists, if it does modify it.
  let found = false;
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].name === input.name) {
      //found it, update
      found = true;
      appdata[i] = input;
    }
  }
  sendAppdata(response);
};

const deleteEntry = function(response, input) {
  var index = -1;
  for (var i = 0; i < appdata.length; i++) {
        if (appdata[i]['name'] === input.name) {
            index = i;
        }
    }
  if (index > -1) {
    appdata.splice(index, 1);
  }
  sendAppdata(response);
};

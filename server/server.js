const http = require("http");
const fs = require("fs");
const mime = require("mime");

const sendFile = (fileName, res) => {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      res.writeHeader(404);
      res.end("404: File not found");
    } else {
      const mimeType = mime.getType(fileName);
      res.writeHeader(200, { ContentType: mimeType });
      res.end(data);
    }
  });
};

const state = {
  posts: []
};

const STATE_FILE = "data/state.json";

const saveState = state => {
  fs.writeFile(STATE_FILE, JSON.stringify(state), err => {
    if (err) {
      console.log(err);
    }
  });
};

const addPost = text => {
  state.posts.push(text);
  saveState(state);
};

const POST_ROUTES = {
  "/posts/add": data => {
    addPost(data);
  },
  "/posts/delete": data => {
    console.log("delete post");
    console.log(data);
  }
};

const GET_ROUTES = {
  "/": sendFile.bind(this, "public/index.html"),
  "/api/posts": res => {
    const postsString = JSON.stringify(state.posts);
    res.writeHeader(200, { "Content-Type": "application/json" });
    res.end(postsString);
  }
};

const handleGet = (req, res) => {
  const handler = GET_ROUTES[req.url];
  if (handler) {
    handler(res);
  } else {
    sendFile(req.url.slice(1), res);
  }
};

const handlePost = (req, res) => {
  // Read the data
  let dataText = "";
  req.on("data", data => {
    dataText += data;
  });
  req.on("end", () => {
    const data = JSON.parse(dataText);

    // Use this data
    console.log(`POST: ${req.url}`);

    const handler = POST_ROUTES[req.url];
    if (handler) {
      handler(data);
    }

    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.end();
  });
};

const server = http.createServer((req, res) => {
  console.log(`${req.method}: ${req.url}`);
  switch (req.method) {
    case "POST":
      handlePost(req, res);
      break;
    case "GET":
      handleGet(req, res);
      break;
    default:
      console.log(`Unrecognized method: ${req.method}`);
      res.end();
  }
});

fs.readFile(STATE_FILE, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const parsedState = JSON.parse(data);
    for (const field in parsedState) {
      state[field] = parsedState[field];
    }
  }
  server.listen(process.env.PORT || 3000);
});

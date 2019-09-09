const http = require("http");
const fs = require("fs");
const mime = require("mime");

const send401 = res => {
  res.writeHeader(401);
  res.end("401: Not authorized.");
};

/**
 * Sends a 404 error to the specified response.
 * @param res the response object
 */
const send404 = res => {
  res.writeHeader(404);
  res.end("404: Resource not found.");
};

/**
 * Sends a 204 response to the specified response.
 * @param res the response object
 */
const send204 = res => {
  res.writeHeader(204);
  res.end();
};

/**
 * Attempts to send the specified file to the specified response. If the file
 * can not be read, a 404 error is instead sent.
 * @param fileName the file to send
 * @param res the response object
 */
const sendFile = (fileName, res) => {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      send404(res);
    } else {
      const mimeType = mime.getType(fileName);
      res.writeHeader(200, { "Content-Type": mimeType });
      res.end(data);
    }
  });
};

/**
 * The state of the server.
 */
const state = {
  posts: {}
};

/**
 * The file from which to read the state on startup and to which to write the
 * state to when it is modified.
 */
const STATE_FILE = "data/state.json";

/**
 * Attempts to save the specified server state to the state file.
 * @param state the current server state
 */
const saveState = state => {
  fs.writeFile(STATE_FILE, JSON.stringify(state), err => {
    if (err) {
      console.log(err);
    }
  });
};

/**
 * Adds the specified post to the list of posts.
 * @param post the specified post
 */
const addPost = (ip, post) => {
  const { title, author, timestamp, uuid, content } = post;
  const fullPost = {
    title,
    author,
    timestamp,
    uuid,
    content,
    posterIP: ip,
    likedIPs: []
  };
  state.posts[post.uuid] = fullPost;
};

/**
 * Attempts to delete the post with the specified UUID from the server. If no
 * post was found with the specified UUID, a 404 response is sent. Otherwise, a
 * 200 response is sent.
 * @param uuid the post to delete
 * @param res the response object
 */
const deletePost = (uuid, res) => {
  const deleted = delete state.posts[uuid];
  if (deleted) {
    send204(res);
  } else {
    send404(res);
  }
};

const hasLiked = (ip, likedIPs) => likedIPs.some(likedIP => ip === likedIP);

/**
 * This object instructs the server what to do for each route it receives when
 * it receives a POST request. Information on each specific route is included
 * below.
 */
const POST_ROUTES = {
  // Adds the specified post
  "/api/posts/add": (ip, data, res) => {
    addPost(ip, data);
    send204(res);
    saveState(state);
  },

  "/api/posts/like": (ip, data, res) => {
    const { postUUID } = data;
    const post = state.posts[postUUID];
    if (post) {
      const { likedIPs } = post;
      // Add their like if they have not already liked the post
      if (hasLiked(ip, likedIPs)) {
        send401(res);
      } else {
        likedIPs.push(ip);
        send204(res);
        saveState(state);
      }
    } else {
      send404(res);
    }
  },

  "/api/posts/unlike": (ip, data, res) => {
    const { postUUID } = data;
    const post = state.posts[postUUID];
    if (post) {
      const { likedIPs } = post;

      // If the IP liked the post, remove them from it
      post.likedIPs = likedIPs.filter(likedIP => ip !== likedIP);

      send204(res);
    } else {
      send404(res);
    }
  },

  // Deletes the specified post
  "/api/posts/delete": (ip, data, res) => {
    const { postUUID } = data;
    const post = state.posts[postUUID];
    if (post) {
      // Check if the user attempting to delete is the poster
      if (ip === post.posterIP) {
        deletePost(postUUID, res);
        saveState(state);
      } else {
        // User is not authorized to delete the post.
        send401(res);
      }
    } else {
      send404(res);
    }
  }
};

/**
 * Transforms the specified list of IPs into one appropriate to send to the
 * specified IP. Specifically, rather than sending the user the IP address that
 * posted the post and which IP addresses liked the post, it tells them whether
 * or not they were the poster, whether or not they liked the post, and the
 * number of people that liked the post.
 * @param ip the user's IP address
 * @param posts the list of posts
 */
const transformPosts = (ip, posts) =>
  Object.keys(posts)
    .map(key => {
      const {
        title,
        content,
        author,
        timestamp,
        uuid,
        posterIP,
        likedIPs
      } = posts[key];
      return [
        key,
        {
          title,
          content,
          author,
          timestamp,
          uuid,
          yourPost: ip === posterIP,
          youLiked: hasLiked(ip, likedIPs),
          likes: likedIPs.length
        }
      ];
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

/**
 * This object instructs the server what to do for each route it receives when
 * it receives a GET request. Information on each specific route is included
 * below.
 */
const GET_ROUTES = {
  // Sends the index file
  "/": (_, res) => sendFile("public/index.html", res),

  // Sends the current list of posts
  "/api/posts": (ip, res) => {
    const transformedPosts = transformPosts(ip, state.posts);
    const postsString = JSON.stringify(transformedPosts);
    res.writeHeader(200, { "Content-Type": "application/json" });
    res.end(postsString);
  }
};

/**
 * Handles the specified GET request.
 * @param req the request object
 * @param res the response object
 */
const handleGet = (req, res) => {
  const ip = req.connection.remoteAddress;
  const handler = GET_ROUTES[req.url];
  if (handler) {
    handler(ip, res);
  } else {
    sendFile(req.url.slice(1), res);
  }
};

/**
 * Handles the specified POST request.
 * @param req the request object
 * @param res the response object
 */
const handlePost = (req, res) => {
  // Read the data
  let dataText = "";
  req.on("data", data => {
    dataText += data;
  });
  req.on("end", () => {
    const data = JSON.parse(dataText);

    const ip = req.connection.remoteAddress;
    const handler = POST_ROUTES[req.url];
    if (handler) {
      handler(ip, data, res);
    } else {
      send404(res);
    }
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
      console.log(`[Error] Unrecognized method: ${req.method}`);
      res.writeHeader(405);
      res.end("405: Method not allowed");
  }
});

// Attempt to read the stored state.
fs.readFile(STATE_FILE, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const parsedState = JSON.parse(data);
    for (const field in parsedState) {
      state[field] = parsedState[field];
    }
  }

  // Start the server
  server.listen(process.env.PORT || 3000, "0.0.0.0");
});

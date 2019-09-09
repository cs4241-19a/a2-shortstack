const parser = new DOMParser();

const isValidStatus = status => 200 <= status && status < 300;

const removeChildren = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const parseHtml = html => {
  const element = parser.parseFromString(html, "text/html").firstChild;

  // This is a bit janky, but we grab the element out of the
  // <html><body>...</body></html> after it was parsed.
  const innerElement = element.lastChild.firstChild;

  return innerElement;
};

/**
 * These options determine how we render our date objects, e.g. Monday,
 * September 9, 2019, 12:15 AM.
 */
const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};

/**
 * Renders the specified date object to a string.
 * @param date the specified date object
 */
const renderDate = date => date.toLocaleDateString("en-US", DATE_OPTIONS);

/**
 * Renders the specified post, creating an HTML element representing it.
 * @param post the specified post
 */
const renderPost = post => {
  const {
    title,
    author,
    content,
    uuid,
    timestamp,
    yourPost,
    youLiked,
    likes
  } = post;

  // Construct the date object from when the post was made
  const time = new Date(timestamp);

  // Create the HTML for the post
  const html = `
    <div class="content-box" style="margin-bottom: 10px">
      <h2>
        ${title}
      </h2>
      <p>
        <i>${author}, ${renderDate(time)}</i>
      </p>
      <p>
        ${content}
      </p>
      <input class="like" type="checkbox" id="like-${uuid}">
        Like
      </input>
      (<span id="likes-${uuid}">${likes.toString()}</span> likes)
      <button id="delete-${uuid}" style="float: right">
        Delete
      </button>
    </div>
  `;

  const element = parseHtml(html);

  // Get the relevant elements
  const likeLabel = element.querySelector(`#likes-${uuid}`);
  const likeButton = element.querySelector(`#like-${uuid}`);
  const deleteButton = element.querySelector(`#delete-${uuid}`);

  // Set the status of the checkbox to whether or not we already liked the post
  likeButton.checked = youLiked;

  // Create the like button handler
  likeButton.onclick = () => {
    // Determine whether to like or unlike the post
    const endpoint = likeButton.checked
      ? "/api/posts/like"
      : "/api/posts/unlike";

    // Construct the body of the request
    const data = addMetadata({
      postUUID: uuid
    });
    const body = JSON.stringify(data);

    // Send our request
    fetch(endpoint, {
      method: "POST",
      body
    }).then(({ status }) => {
      // Check if we got a valid status before updating our UI
      if (isValidStatus(status)) {
        // Calculate the new number of likes
        const deltaLikes = likeButton.checked ? 1 : -1;
        const oldLikeValue = parseInt(likeLabel.innerText);
        const newLikeValue = oldLikeValue + deltaLikes;

        // Update the label
        likeLabel.innerText = `${newLikeValue}`;
      }
    });
  };

  if (yourPost) {
    // If this is our post, allow us to delete it
    deleteButton.onclick = () => {
      const data = addMetadata({ postUUID: uuid });
      const body = JSON.stringify(data);
      fetch("/api/posts/delete", {
        method: "POST",
        body
      }).then(({ status }) => {
        if (isValidStatus(status)) {
          updatePosts();
        }
      });
    };
  } else {
    // Disable delete button if not our post
    deleteButton.disabled = true;
  }

  return element;
};

/**
 * Sorts the specified list of posts in descending order from most recent to
 * oldest.
 * @param posts the list of posts
 */
const sortPosts = posts =>
  Object.values(posts).sort(({ timestamp: a }, { timestamp: b }) => b - a);

/**
 * Updates the list of posts on the website from the server.
 */
const updatePosts = () => {
  const postContainer = document.querySelector("#posts");
  removeChildren(postContainer);
  fetch("/api/posts")
    .then(res => res.json())
    .then(posts => {
      if (Object.keys(posts).length > 0) {
        for (const post of sortPosts(posts)) {
          const element = renderPost(post);
          postContainer.appendChild(element);
        }
      } else {
        const html = `<div class="content-box">No posts yet.</div>`;
        const element = parseHtml(html);
        postContainer.appendChild(element);
      }
    });
};

/**
 * Flattens all properties from an element and its children into the specified
 * object recursively.
 * @param values the target object
 * @param element the source element.
 */
const addValues = (values, element) => {
  const { id, value, children } = element;

  // Check if this has children
  if (children.length > 0) {
    for (const child of children) {
      addValues(values, child);
    }
  } else {
    if (id && value !== undefined) {
      values[id] = value;
    }
  }
};

/**
 * Adds a UUID and timestamp to the specified object.
 * @param data the object to add to
 */
const addMetadata = data => ({
  ...data,
  uuid: UUID.generate(),
  timestamp: new Date().getTime()
});

/**
 * Creates a handler for the submission of the specified form. The handler will
 * look at the action property of the form, and attach a listener to its
 * submission such that, when the form is submitted, all fields with IDs in the
 * form have their objects stored in an object, and that object is then
 * submitted as the data in a POST call to the form's action property.
 * @param form the specified form
 */
const submitForm = form => e => {
  e.preventDefault();

  // Look through all children with IDs
  // Create map from ids to values
  const inputs = {};
  addValues(inputs, form);
  const data = addMetadata(inputs);

  const action = form.action;
  const body = JSON.stringify(data);

  fetch(action, {
    method: "POST",
    body
  }).then(() => {
    updatePosts();
  });

  return false;
};

window.onload = () => {
  // Add the form submit listener
  const form = document.querySelector("form");
  form.onsubmit = submitForm(form);

  // Grab posts
  updatePosts();
};

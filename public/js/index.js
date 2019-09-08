const parser = new DOMParser();

const removeChildren = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const updatePosts = () => {
  const postContainer = document.querySelector("#posts");
  removeChildren(postContainer);
  fetch("/api/posts")
    .then(res => res.json())
    .then(posts => {
      if (posts.length > 0) {
        for (const { title, author, content } of posts.reverse()) {
          const html = `
            <div class="content-box">
              <h2>
                ${title}
              </h2>
              <p>
                <i>Author: ${author}</i>
              </p>
              <p>
                ${content}
              </p>
            </div>`;
          const element = parser.parseFromString(html, "text/html").firstChild;
          postContainer.appendChild(element);
        }
      } else {
        const html = `<div class="content-box">No posts yet.</div>`;
        const element = parser.parseFromString(html, "text/html").firstChild;
        postContainer.appendChild(element);
      }
    });
};

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

const submitForm = form => e => {
  e.preventDefault();

  console.log(form);

  // Look through all children with IDs
  // Create map from ids to values
  const inputs = {};
  addValues(inputs, form);

  console.log(inputs);

  const action = form.action;
  const body = JSON.stringify(inputs);

  fetch(action, {
    method: "POST",
    body
  }).then(() => {
    updatePosts();
  });

  return false;
};

window.onload = function() {
  const form = document.querySelector("form");
  form.onsubmit = submitForm(form);
  console.log("Hello world!");

  // Grab posts
  updatePosts();
};

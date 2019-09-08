// Add some Javascript code here, to run on the front end.

unsplash.search.photos("dogs", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
console.log("Welcome to assignment 2!")
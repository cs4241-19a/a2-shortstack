// ES Modules syntax
import Unsplash from 'unsplash-js';

// require syntax
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  applicationId: "210c371817cd6adae5a2fd6484fb09a9c92f0fec9d3443744a797518224071ef",
  secret: "fd62ab61acfdb6f6a1a725f41856dff34770e89a875c51224515c1c2aca625da"
});

const randPhoto = function() {
  unsplash.search.photos("dogs", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
}


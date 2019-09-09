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

const loadFavorites = async function() {
  const resp = await fetch('/', { method: 'GET' });
  const data = await resp.json();
  const favs = data.data;
  
   /*var html = "<table border='1|1'>";
    for (var i = 0; i < rows.length; i++) {
        html+="<tr>";
        html+="<td>"+rows[i].name+"</td>";
        html+="<td>"+rows[i].age+"</td>";
        html+="<td>"+rows[i].email+"</td>";

        html+="</tr>";

    }
    html+="</table>";
    $("div").html(html);*/
  
  /*<div class="card">
          <div class="card-body">
            <h5 class="card-title">Yeezy</h5>
            <p class="card-text"><small class="text-muted">Category</small></p>
            <p class="card-text">Price</p>
          </div>
          <div class="card-footer bg-transparent">Rating</div>
        </div>*/
  
  let htmlCard = `<div class="card">' 
                        <div class="card-body">`
  
  
  for (let i = 0; i < favs.length; i++) {
    htmlCard = `<h5 class="card-title">${favs[i].name}</h5>

    `
  }

  return false;
};

window.onload = function() {
  loadFavorites()
};

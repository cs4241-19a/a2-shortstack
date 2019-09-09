// ES Modules syntax
import Unsplash from 'unsplash-js';

// require syntax
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
  applicationId: "210c371817cd6adae5a2fd6484fb09a9c92f0fec9d3443744a797518224071ef",
  secret: "fd62ab61acfdb6f6a1a725f41856dff34770e89a875c51224515c1c2aca625da"
});

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    console.log( response )
  })

  return false
}
        
const url = function() {
  unsplash.search.photos("shopping", 1)
  .then(toJson)
  .then(json => {
    // Your code
  });
}

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
  
  let htmlCard = `<div class="card"> 
                        <div class="card-body">`;
  
  for (let i = 0; i < 3; i++) {
    htmlCard += `<h5 class="card-title">${favs[i].name}</h5>
                <p class="card-text"><small class="text-muted">${favs[i].category}</small></p>
                <p class="card-text">${favs[i].usd}</p>
                <p class="card-text">${favs[i].eur}</p>
              </div>
              <div class="card-footer bg-transparent">${favs[i].rating}</div>
            </div>`;
  }

  document.getElementById("favorites").innerHTML = htmlCard;

  return false;
}

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit
  
  loadFavorites();
}
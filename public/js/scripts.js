//Front end Part

let playlists = [];
 
const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const title  = document.querySelector( '#title' )
  const artist = document.querySelector( '#artist')
  const album  = document.querySelector( '#album' )
  const year   = document.querySelector( '#year'  )
        
  let json = {
    title:  title.value,
    artist: artist.value,
    album:  album.value,
    year:   year.value,
  }
  
  //To reset all inputs back to nothing
  title.value  = ""
  artist.value = ""
  album.value  = ""
  year.value   = ""
  
  //easier for fetching
  let body = JSON.stringify(json)
  
  fetch( '/sumbit', {
    method: 'POST',
    body
  })
  .then( function( respose ) {
    fetch( '/fResults', {
    method: 'GET'
  })
  .then( function( response ) {
      response.json().then(function(data) {
        console.log(data)
      });
    })
  })
  
  return false  
  }

const results = function (e) {
  e.preventDefault()
  window.location = "results.html"
 
}


window.onload = function() {
  const sButton = document.querySelector( '#submitButton' )
  sButton.onclick = submit
  
  const rButton = document.querySelector( '#resultsButton' )
  rButton.onclick = results
}
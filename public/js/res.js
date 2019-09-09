let play = []

window.onload = function() {
  fetch( '/fResults', {
    method: 'GET'
  })
  .then( function( response ) {
    response.json().then(function(data) {
      play = Object.values(data)
      createTable()
      //displaying table headers
      
      const bButton = document.querySelector( '#backButton' )
       bButton.onclick = backIndex
    })
  })
}

const createTable = function() { //creates table header
  let row = "<table id= dTable>"
      row += "<tr>"
      row += "<td>Song Title</td>"
      row += "<td>Artist</td>"
      row += "<td>Album</td>"
      row += "<td>Album Year</td>"
      row += "<td>The Beatles</td>"
      row += "</tr>"

      
      for(let i=0; i<play.length; i++) { //fills in data for rows
        
        row += "<tr>"
        row += "<td>"+play[i].title+"</td>"
        row += "<td>"+play[i].artist+"</td>"
        row += "<td>"+play[i].album+"</td>"
        row += "<td>"+play[i].year+"</td>"
        
        //this is to determine if the song/album was before or after the beatles.
        //if same year that the beatles "became famous" they are contemporary
        let tBeatles = new Number(play[i].year)
        
        if(tBeatles>1962) {
          row += "<td>After The Beatles</td>"
        }else if (tBeatles<1962) {
          row += "<td>Before The Beatles</td>"
        }else if (tBeatles==1962) {
          row += "<td>Contemporary with The Beatles</td>"
        }
        
        row += "<tr>" 
      }
      
      row += "</table>"
      document.getElementById('createTable').innerHTML = row
}

const backIndex = function( e ) {
  e.preventDefault();
  window.location = "index.html"
}
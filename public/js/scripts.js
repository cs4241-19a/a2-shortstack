window.onload = function(){
    displayTable(); 
  }
  
  var runningCount = 3.5
  var myflag = 0
  
  //Delete a song from the list
  function DeleteSong(id){
    myflag = 1;
    const json = { 
                  'user': null,
                  'id': id }
    const body = JSON.stringify( json )
    fetch( '/deleteSong', {
    method:'POST',
    body
    })
    .then( function(response) {
    displayTable();
    })
  }
  
  function displayTable(){ 
    const json = {user: null},
          body = JSON.stringify(json)
          fetch('/displayTable', {
          method:'POST',
          body
        })
      .then(function(response) {
          response.json().then(data => {
            document.getElementById("Song_Table").innerHTML = ""
            addRow("Song Name", "Artist", "Song Length", "Picture URL", "Link to Video", "Delete Song")
            const len = data.items.length
            if (myflag === 1) {
              runningCount = runningCount - (data.items[len - 1])
            } else {
              if (data.items[len - 1] ===NaN) {
                runningCount = runningCount + 0
              } else {
                let iKim = data.items[len - 1]
                runningCount =  parseFloat(runningCount) + parseFloat(iKim.newLength)
                console.log(runningCount)
              }
            }
            document.getElementById('count').innerHTML = runningCount
            for(let k = 0; k < len; k++){
              let iTim = data.items[k];
              addRow(iTim.songName, iTim.artist, iTim.newLength, iTim.picture, iTim.video, "<button onclick='DeleteSong("+ iTim.id +")'>Delete Row</button>")
  
            }
          })   
      })    
  }
  
  //Add the row to the table
  function addRow(songName, artist, newLength, picture, video, modifyItem, deleteItem){ 
    document.getElementById("Song_Table").innerHTML += "<tr><th>" + songName + "</th><th>" + artist + "</th><th>" + newLength + "</th><th>" + picture + "</th><th>" + video + "</th><th>" + modifyItem + "</th><th>"+ deleteItem + "</th></tr>";
  }
  const add_Song_Row = document.getElementById("add_song");
  add_Song_Row.addEventListener("click", function(event) {
    event.preventDefault();
    const input = document.getElementById('new'),
          json = { user: null,
                   task: {
                     'songName': input.elements["songName"].value,
                     'artist': input.elements["artist"].value,
                     'newLength': input.elements['newLength'].value,
                     'picture': input.elements["picture"].value,
                     'video': input.elements['video'].value
                   }
                },
          body = JSON.stringify( json )
    console.log(body)
    fetch( '/addSong', {
        method:'POST',
        body
        })
    .then( function( response ) {
      displayTable();
    })
  } );
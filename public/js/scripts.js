
    var table // table needs to be global
    var row // need the row to set up edit
    var editButton
    var formDisplayStyle
    var addButtonDisplayStyle
    var isEdit

    const displayTable = function( json ) {
      console.log( json )

      var col = [];
      for (var i = 0; i < json.length; i++) {
        for (var key in json[i]) {
          if (col.indexOf(key) === -1) {
            col.push(key);
          }
        }
      }
      // CREATE DYNAMIC TABLE.
      table.innerHTML = ""

      // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
      var tr = table.insertRow(-1)                   // TABLE ROW.

      for (var i = 0; i < col.length; i++) { // change this 
        var th = document.createElement( "th" )      
        th.innerHTML = col[i]
        tr.appendChild(th)
      }

      // ADD JSON DATA TO THE TABLE AS ROWS.
      for (var i = 0; i < json.length; i++) {
        tr = table.insertRow(-1)

        for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1)
          tabCell.innerHTML = json[i][col[j]]
        }
      }

    var divContainer = document.getElementById( "table" )
    divContainer.innerHTML = ""
    divContainer.appendChild(table)

    table.addEventListener('click', function( event ) {
      row = event.target.parentNode
      row.appendChild(editButton)
      document.getElementById( "editEntryButton" ).style.display = "block"
    })
  }

  const submit = function( e ) { 
    // prevent default form action from being carried out
    e.preventDefault()
    document.getElementById( "formDisplay" ).style.display = "none"
    document.getElementById( "addNewEntry" ).style.display = "block"

    const title = document.querySelector( '#title' ),
          author = document.querySelector( '#author' ),
          genre = document.querySelector( '#genre' ),
          numPages = document.querySelector( '#numPages' ),
          pagesRead = document.querySelector( '#pagesRead' ),
          json = { 'title':title.value,
                   'author':author.value,
                   'genre':genre.value,
                   'numPages':numPages.value,
                   'pagesRead':pagesRead.value
                 },
          body = JSON.stringify( json )

          document.querySelector( '#title' ).value = ""
          document.querySelector( '#author' ).value = ""
          document.querySelector( '#genre' ).value = ""      
          document.querySelector( '#numPages' ).value = ""  
          document.querySelector( '#pagesRead' ).value = ""    

    fetch( '/newEntry', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      document.getElementById("confirm").innerHTML = "Submitted Successfully!"
      console.log( response )
      return response.json()
    }).then( function( json ) {
      displayTable( json )
    })
    return false
  }

  const getData = function() {
    fetch('/getdata', {
      method: 'GET'
    })
    .then( function( response ) {
      console.log( response )
      return response.json()
    }).then( function( json ) {
      displayTable( json )
    })
    return false
  }

  const submitEdit = function() {

    document.getElementById( "formDisplay" ).style.display = "none"
    document.getElementById( "addNewEntry" ).style.display = "block"

    const entryKey = row.firstElementChild.innerHTML,
          title = document.querySelector( '#title' ),
          author = document.querySelector( '#author' ),
          genre = document.querySelector( '#genre' ),
          numPages = document.querySelector( '#numPages' ),
          pagesRead = document.querySelector( '#pagesRead' ),
          json = { 'entryKey': entryKey,
                   'newEntry': 
                   {
                    'title':title.value,
                    'author':author.value,
                    'genre':genre.value,
                    'numPages':numPages.value,
                    'pagesRead':pagesRead.value,
                    'percentRead': 0
                   }
                 },
          body = JSON.stringify( json )

    document.querySelector( '#title' ).value = ""
    document.querySelector( '#author' ).value = ""
    document.querySelector( '#genre' ).value = ""     
    document.querySelector( '#numPages' ).value = ""  
    document.querySelector( '#pagesRead' ).value = ""         

    fetch('/editEntry', {
      method: 'POST',
      body
    })
    .then( function ( response ) {
      console.log( response )
      return response.json()
    })
    .then (function( json ){
      displayTable( json );
    })
    return false
  }

  const submitDelete = function() {
    const entryKey = row.firstElementChild.innerHTML,
          json = { 
                  'title': entryKey,
                 },
          body = JSON.stringify( json )
    
    document.querySelector( '#title' ).value = ""
    document.querySelector( '#author' ).value = ""
    document.querySelector( '#genre' ).value = ""  
    document.querySelector( '#numPages' ).value = ""  
    document.querySelector( '#pagesRead' ).value = ""      

    fetch('/deleteEntry', {
      method: 'POST',
      body
    })
    .then( function ( response ) {
      console.log( response )
      return response.json()
    })
    .then (function( json ){
      displayTable( json );
    })
    return false
    
  }

  const editData = function() {
    isEdit = true;
    document.querySelector( '#title' ).value = row.children[0].innerHTML
    document.querySelector( '#author' ).value = row.children[1].innerHTML
    document.querySelector( '#genre' ).value = row.children[2].innerHTML 
    document.querySelector( '#numPages' ).value = row.children[3].innerHTML 
    document.querySelector( '#pagesRead' ).value = row.children[4].innerHTML   

    document.getElementById( "deleteEntryButton" ).style.display = "block"

    document.getElementById( "formDisplay" ).style.display = "block"
    document.getElementById( "addNewEntry" ).style.display = "none"
    const deleteButton = document.getElementById( 'deleteEntryButton' )
    deleteButton.onclick = function() {
      document.getElementById( "formDisplay" ).style.display = "none"
      document.getElementById( "addNewEntry" ).style.display = "block"

      submitDelete()

    }
    const cancelButton = document.getElementById( 'cancelEditButton' )
    cancelButton.onclick = function() {
      console.log("clicked")
      document.getElementById( "formDisplay" ).style.display = "none"
      document.getElementById( "addNewEntry" ).style.display = "block"

      document.querySelector( '#title' ).value = ""
      document.querySelector( '#author' ).value = ""
      document.querySelector( '#genre' ).value = ""  
      document.querySelector( '#numPages' ).value = ""  
      document.querySelector( '#pagesRead' ).value = ""      
    }
    const button = document.getElementById( 'button1' )
    button.onclick = submitEdit
  }
  
  const displayForm = function() {
    document.getElementById( "addNewEntry" ).style.display = "none"
    document.getElementById( "formDisplay" ).style.display = "block"
    document.getElementById( "deleteEntryButton" ).style.display = "none"
    const cancelButton = document.getElementById( 'cancelEditButton' )
    cancelButton.onclick = function() {
      console.log("clicked")
      document.getElementById( "formDisplay" ).style.display = "none"
      document.getElementById( "addNewEntry" ).style.display = "block"    
    }
    const button = document.getElementById( 'button1' ) 
    button.onclick = submit
  }

  window.onload = function() {
    const newEntryButton = document.getElementById( 'addNewEntry' )
    newEntryButton.onclick = displayForm

    const editEntryButton = document.getElementById( 'editEntryButton' )
    document.getElementById( "editEntryButton" ).style.display = "none"
    document.getElementById( "formDisplay" ).style.display = "none"

    editEntryButton.onclick = editData
    table = document.createElement( "table" )
    editButton = document.getElementById( "editEntryButton" )

    formDisplayStyle = document.getElementById( "formDisplay" ).style.display
    addButtonDisplayStyle = document.getElementById( "addNewEntry" ).style.display

    getData()
    
  }
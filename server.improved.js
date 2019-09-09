const list = document.querySelector('ul');
const nameInput = document.querySelector('#name');
const finalBMI = document.querySelector('#finalBMI');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'name': 'kaitlin', 'height': 68, 'weight': 160 },
  { 'name': 'cass', 'height': 61, 'weight': 120 },
  { 'name': 'mike', 'height': 72, 'weight': 150 }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    //response.send('You are ${context}')
    document.write(response);
    console.log(request.output)
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}
let db;

server.listen( process.env.PORT || port )
window.onload(function () {
  let request = window.indexedDB.open("bmiDB", 1);
  request.onerror = function () {
    console.log('Database failed to open!');
  };
  request.onsuccess = function () {
    console.log('Database opened!');

    db = request.result;

    displayData();
  }
  // Setup the database tables if this has not already been done
  request.onupgradeneeded = function (e) {
    // Grab a reference to the opened database
    let db = e.target.result;

    // Create an objectStore to store our notes in (basically like a single table)
    // including a auto-incrementing key
    let objectStore = db.createObjectStore('bmiOS', {keyPath: 'id', autoIncrement: true});

    // Define what data items the objectStore will contain
    objectStore.createIndex('name', 'name', {unique: false});
    objectStore.createIndex('bmi', 'result', {unique: false});

    console.log('Database setup complete');
  };
  form.onsubmit = addData;

  function addData(e) {
    // prevent default - we don't want the form to submit in the conventional way
    e.preventDefault();

    // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
    let newItem = {name: nameInput.value, bmi: result.value};

    // open a read/write db transaction, ready for adding the data
    let transaction = db.transaction(['bmiOS'], 'readwrite');

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore('bmiOS');

    // Make a request to add our newItem object to the object store
    var request = objectStore.add(newItem);
    request.onsuccess = function () {
      // Clear the form, ready for adding the next entry
      nameInput.value = '';
      result.value = '';
    };
    // Report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function() {
      console.log('Transaction completed: database modification finished.');

      // update the display of data to show the newly added item, by running displayData() again.
      displayData();
    };

    transaction.onerror = function() {
      console.log('Transaction not opened due to error');
    };
  }
// Define the displayData() function
  function displayData() {
    // Here we empty the contents of the list element each time the display is updated
    // If you didn't do this, you'd get duplicates listed each time a new note is added
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // Open our object store and then get a cursor - which iterates through all the
    // different data items in the store
    let objectStore = db.transaction('bmiOS').objectStore('bmiOS');
    objectStore.openCursor().onsuccess = function(e) {
      // Get a reference to the cursor
      let cursor = e.target.result;

      // If there is still another data item to iterate through, keep running this code
      if(cursor) {
        // Create a list item, h3, and p to put each data item inside when displaying it
        // structure the HTML fragment, and append it inside the list
        let listItem = document.createElement('li');
        let h3 = document.createElement('h3');
        let para = document.createElement('p');

        listItem.appendChild(h3);
        listItem.appendChild(para);
        list.appendChild(listItem);

        // Put the data from the cursor inside the h3 and para
        h3.textContent = cursor.value.name;
        para.textContent = cursor.value.bmi;

        // Store the ID of the data item inside an attribute on the listItem, so we know
        // which item it corresponds to. This will be useful later when we want to delete items
        //listItem.setAttribute('data-note-id', cursor.value.id);

        // Create a button and place it inside each listItem
        let deleteBtn = document.createElement('button');
        listItem.appendChild(deleteBtn);
        deleteBtn.textContent = 'Delete';

        // Set an event handler so that when the button is clicked, the deleteItem()
        // function is run
        deleteBtn.onclick = deleteItem;

        // Iterate to the next item in the cursor
        cursor.continue();
      } else {
        // Again, if list item is empty, display a 'No notes stored' message
        if(!list.firstChild) {
          let listItem = document.createElement('li');
          listItem.textContent = 'No items stored.';
          list.appendChild(listItem);
        }
        // if there are no more cursor items to iterate through, say so
        console.log('Notes all displayed');
      }
    };
  }
})

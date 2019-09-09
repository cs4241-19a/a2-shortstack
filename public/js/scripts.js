// Display functions for each table
const displayBooks = function( bkdata ) {
  const template = '<tr><td>{name}</td><td>{author}</td><td>{comments}</td><td>{rating}</tr>'
  const row = template.replace("{name}", bkdata.bookName).replace("{author}", bkdata.authorName).replace("{comments}", bkdata.comments).replace("{rating}", bkdata.rating)
  const tbody = document.querySelector("#all-books")
  tbody.innerHTML += row
}

const displayGoodBooks = function( bkdata ) {
  const template = '<tr><td>{name}</td><td>{author}</td><td>{comments}</td><td>{rating}</tr>'
  const row = template.replace("{name}", bkdata.bookName).replace("{author}", bkdata.authorName).replace("{comments}", bkdata.comments).replace("{rating}", bkdata.rating)
  const tbody = document.querySelector("#good-books")
  tbody.innerHTML += row
}

const displayBadBooks = function( bkdata ) {
  const template = '<tr><td>{name}</td><td>{author}</td><td>{comments}</td><td>{rating}</tr>'
  const row = template.replace("{name}", bkdata.bookName).replace("{author}", bkdata.authorName).replace("{comments}", bkdata.comments).replace("{rating}", bkdata.rating)
  const tbody = document.querySelector("#bad-books")
  tbody.innerHTML += row
}

//displayData for the three different tables
const displayData = function ( data ) {
  document.querySelector("#all-books").innerHTML = ""
  document.querySelector("#good-books").innerHTML = ""
  document.querySelector("#bad-books").innerHTML = ""

  for (let i = 0; i < data.length; i++) {
    const bkdata = data[i]
      displayBooks(bkdata)
    if (bkdata.rating === "1" || bkdata.rating === "2" ) {
      displayBadBooks(bkdata)
    }
    if (bkdata.rating === "3" || bkdata.rating === "4" || bkdata.rating === "5") {
      displayGoodBooks(bkdata)
    }
  }
}

// Fetch the appdata and then call the display functions
const loadData = function( e ) {
  fetch( '/books', {
    method:'GET',
  })
  .then( function( response ) {
    response.json().then(displayData)
    console.log(response)
  })
}
    
//add Book function
    const addBook = function( e ) {
      
      const newBook = {
        bookName: document.getElementById( 'bookName' ).value,
        authorName: document.getElementById( 'authorName' ).value,
        comments:document.getElementById( 'comments' ).value,
        rating: document.getElementById( 'rating' ).value,
        status: 'none'
      };
      
      if (newBook.rating === "1" || newBook.rating === "2" ) {
        newBook.status = 'bad'
      } else {
        newBook.status = 'good'
      }
      
      const body = JSON.stringify( newBook );
      fetch( '/addBook', {
        method:'POST',
        body
      }).then( function( response ) {
          resetOrderForm();
          loadData();
        })
      resetOrderForm();
      loadData();
      return false;
    }
    
    //reset order form after adding book
    const resetOrderForm = () => {
      document.getElementById( 'bookName' ).value = '';
      document.getElementById( 'authorName' ).value = '';
      document.getElementById('comments').value = '';
      document.getElementById('rating').value = '';
    };

  window.onload = function() {
    const addBookbutton = document.getElementById( 'submit-btn' )
    addBookbutton.onclick = addBook
    
    loadData()
  }
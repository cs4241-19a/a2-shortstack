//fetch books for the table

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

// Fetch the appdata and then call the display function
const loadData = function( e ) {
  fetch( '/books', {
    method:'GET',
  })
  .then( function( response ) {
    response.json().then(displayData)
  })
}

//ughhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    const displayBooks2 = async function() {
      try {
        const resp = fetch('/books', { method: 'GET' });
        const data = resp.json();
        const books = data.data;
        let htmlDiv = document.getElementById('books');
        htmlDiv.innerHTML = '<tr>\n' +
                '              <th>Book Name</th>\n' +
                '              <th>Author</th>\n' +
                '              <th>Comments</th>\n' +
                '              <th>Rating</th>\n' +
                '              <th>Status</th>\n' +
                '              <th></th>\n' +
                '              <th></th>\n' +
                '            </tr>';
        for (let i = 0; i < books.length; i++) {
          const book = books[i];
          const stringBook = JSON.stringify(books[i]);
          let newRow = '<tr>\n';
          newRow += (`<td> ${book.bookName} </td>\n`);
          newRow += (`<td> ${book.authorName} </td>\n`);
          newRow += (`<td> ${book.comments} </td>\n`);
          newRow += (`<td> ${book.rating} </td>\n`);
          newRow += (`<td> ${book.status} </td>\n`);
          newRow += '</tr>';
          htmlDiv.innerHTML += newRow;
        }
      } catch (err) {
        console.log(err);
      }
      return false;
    };
    
//add Book function
    const addBook = function( e ) {
      e.preventDefault();
      
      const newBook = {
        bookName: document.getElementById( 'bookName' ).value,
        authorName: document.getElementById( 'authorName' ).value,
        comments:document.getElementById( 'comments' ).value,
        rating: document.getElementById( 'rating' ).value,
        status: 'inprogress'
      };
        const body = JSON.stringify( newBook );
        fetch( '/addBook', {
          method:'POST',
          body
        }).then( function( response ) {
          //document.getElementById('order-confirmation').style.display = "flex";
          //FIX THISSSS
          resetOrderForm();
          console.log(response)
        })
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
    const addBookbutton = document.querySelector( 'submit-btn' )
    addBookbutton.onclick = addBook
    
  }
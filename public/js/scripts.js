//fetch books for the table
    const displayBooks = async function() {
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
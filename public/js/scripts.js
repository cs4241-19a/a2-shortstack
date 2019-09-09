const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    resetTable()

    const input = document.querySelector( '#inputText' ),
          json = { inputText: input.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) { 

      fetch('/getData' , {
      method: 'GET',
      })
      .then( function(response) {
        response.text().then(function(receivedText){
          let split = receivedText.indexOf(']')+1 // split up array of objects from data about total words
          populateTable(JSON.parse(receivedText.slice(0,split)))
          getTotal(JSON.parse(receivedText.slice(split)))
          showResults();
          
        })
      })

    })



    return false
  }

  window.onload = function() {
    const submitButton = document.getElementById( 'submitButton' )
    submitButton.onclick = submit

    const clearButton = document.getElementById('clearButton')
    clearButton.onclick = clear
  }

  // Clear input text area and hide results
  const clear = function(e){
    e.preventDefault()
    let inputArea = document.getElementById("inputText")
    inputArea.value = ""
    hideResults()
    return false;
  }

  // Set value for individual table cell
  // @param contents - value to go into table cell
  // @param row - row object to add cell to
  // @param col - which column to add the data to
  function createCell(contents, row, col){
    let cell = row.insertCell(col);
    cell.innerHTML = contents;
  }

  // fill results table with data from GET call
  // @param results - response from server
  function populateTable(results){
    
    let table = document.getElementById("ResultsTable");

    for(let i = 0; i < results.length; i++){
      let row = table.insertRow()
      row.className = 'row';
      createCell(results[i].strVal, row, 0)
      createCell(results[i].freq, row, 1)
      createCell(results[i].firstOcc, row, 2)
    }
  }

  // Make results visible
  function showResults(){
    const results = document.querySelectorAll(".Results")
    results.forEach(function(element){
      element.style.visibility = "visible"
    })
  }

  // Make results invisible
  function hideResults(){
    const results = document.querySelectorAll(".Results")
    results.forEach(function(element){
      element.style.visibility = "hidden"
    })
  }

  // Reset values in table
  function resetTable(){
    const table = document.getElementById("ResultsTable");

    const length = table.rows.length;
    for(let i = 1; i < length; i++){
      table.deleteRow(1);
    }
  }

  // Extract total words from server response
  function getTotal(input){
    const totalLbl = document.getElementById("Total")
    totalLbl.innerHTML = "Total words: "+ input.total;
  }

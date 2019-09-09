const createCharacter = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    const newCharacter = { 
    	name: document.getElementById( 'name' ).value,
    	age: document.getElementById( 'age' ).value,
    	occupation: document.getElementById( 'occupation' ).value,
    	strength: document.getElementById( 'strength' ).value,
    	dexterity: document.getElementById( 'dexterity' ).value,
    	intelligence: document.getElementById( 'intelligence' ).value,
    	luck: document.getElementById( 'luck' ).value,
    	odd: document.getElementById( 'odd' ).value
    }
          
    if ( validateCharacter( newCharacter ) )  {
    	body = JSON.stringify( newCharacter )
    

	    fetch( '/submit', {
	      method:'POST',
	      body 
	    })
	    .then( function( response ) {
	      document.getElementById( 'character-created' ).style.display = "flex"
        document.getElementById( 'character-created' ).innerHTML += `<div id="character-form">
          <div id="typing-title">
          <h1 id="typing-text2">Welcome to the Overworld, ${newCharacter.name}!</h1>
          </div> `
	      document.getElementById( 'character-form' ).style.display = "none"
        document.getElementById( 'typing-title' ).style.display = "none"
	      console.log( response )
	    })
	  }
    return false
  }

  const validateCharacter = function( newCharacter ) {
  	if ( newCharacter.name =='' || newCharacter.name.length > 20 ) {
  		alert( "Please Enter a Name (20 Characters Max)" )
  		return false
  	}
  	else if ( isNaN( newCharacter.age ) || newCharacter.age == ''){
  		alert( "Please Enter a proper Age (numerical value)" )
  		return false
  	}
  	else if ( newCharacter.occupation =='' || newCharacter.occupation.length > 20 ) {
  		alert( "Please enter an Occupation (20 Characters Max)" )
  		return false
  	}
  	else if ( isNaN( newCharacter.strength ) || newCharacter.strength == '' || newCharacter.strength < 0 || newCharacter.strength > 100 ){
  		alert( "Please enter a Strength Value between 0 and 100 (inclusive)" )
  		return false
  	}
  	else if ( isNaN( newCharacter.dexterity ) || newCharacter.dexterity == '' || newCharacter.dexterity < 0 || newCharacter.dexterity > 100 ){
  		alert( "Please enter a Dexterity Value between 0 and 100 (inclusive)" )
  		return false
  	}
  	else if ( isNaN( newCharacter.intelligence ) || newCharacter.intelligence == '' || newCharacter.intelligence < 0 || newCharacter.intelligence > 100 ){
  		alert( "Please enter an Intelligence Value between 0 and 100 (inclusive)" )
  		return false
  	}
  	else if ( isNaN( newCharacter.luck ) || newCharacter.luck == '' || newCharacter.luck < 0 || newCharacter.luck > 100 ){
  		alert( "Please enter a Luck Value between 0 and 100 (inclusive)" )
  		return false
  	}
  	else if ( isNaN( newCharacter.odd ) || newCharacter.odd == '' || newCharacter.odd < 0 || newCharacter.odd > 100 ){
  		alert( "Please enter an Oddity Value between 0 and 100 (inclusive)" )
  		return false
  	}
  	else
  		return true

  }
  const deleteCharacter = function( number ){
    const charNum = { charNum : number }
    const body = JSON.stringify( charNum )
    
    fetch('/delete', {
      method: 'POST',
      body
    })
    
    viewCharacters()
    
    return false
    
  }
  
  
  const viewCharacters = function() {
    
    document.getElementById( 'character-table' ).style.display = "block"
    document.getElementById( 'character-form' ).style.display = "none"
    document.getElementById( 'typing-title' ).style.display = "none"
    document.getElementById( 'edit-character' ).style.display = "none"
    document.getElementById( 'character-created' ).style.display = "none"
    document.getElementById( 'character-table' ).innerHTML = "<div id='table-content'><tr>"
      + "<th>Name</th>" 
      + "<th>Age</th>"
      + "<th>Occupation</th>"
      + "<th>Strength</th>"
      + "<th>Dexterity</th>"
      + "<th>Intelligence</th>"
      + "<th>Luck</th>"
      + "<th>Oddity</th>"
      + "<th>Total Stats</th>"
      + "<th></th>"
      + "</tr>"
    
    const character =  fetch('/view-characters', {
      method: 'GET'
    }).then(resp => resp.json()).then(
      data => { console.log(data)
        //for (let i = 0; i < data.length; i ++){
        let num = 0
        data.forEach(function(char){
          
          let row = "<tr>"
            + "<td>" + char.name + "</td>"
            + "<td>" + char.age + "</td>"
            + "<td>" + char.occupation + "</td>"
            + "<td>" + char.strength + "</td>"
            + "<td>" + char.dexterity + "</td>"
            + "<td>" + char.intelligence + "</td>"
            + "<td>" + char.luck + "</td>"
            + "<td>" + char.odd + "</td>"
            + "<td>" + char.total + "</td>"
            + `<td> <button class="mod-button" id='delete-character' onclick='deleteCharacter( ${num} )'>Delete</button>`
            + `<button class="mod-button" id='edit-character-button' onclick='dispEdit( ${num} )'>Edit</button> </td>`
            + "</tr> </div>"

          document.getElementById( 'character-table' ).innerHTML += row
          num ++
        })  
    })
    
    
    
    return false
    
  }
  const dispEdit = function( charNum ) {
    
    const character =  fetch('/view-characters', {
      method: 'GET'
    }).then(resp => resp.json()).then(
      data => { console.log(data)
        let char = data[charNum]
        document.getElementById( 'character-table' ).style.display = "none"
        document.getElementById( 'character-form' ).style.display = "none"
        document.getElementById( 'character-created' ).style.display = "none"
        document.getElementById( 'edit-character' ).style.display = "block"
        document.getElementById( 'edit-character' ).innerHTML = `<div id='editing-character'>
        <div id="typing-title">
      <h1 id="typing-text3">
        Editing Character...
      </h1>
      </div>`+`
        <form action="" method="post">
            <div id="form-inner2">
            <div class="descriptor"><span>Basic Info</span> </div>
            <div>
              <label for="name">Name:</label>
              <input type="text" id="edit-name" name="user_name" value=${char.name}>
            </div>
            <div>
              <label for="age">Age:</label>
              <input type="text" id="edit-age" name="user_age" value=${char.age}>
            </div>
            <div>
              <label for="occupation">Occupation:</label>
              <input type="text" id="edit-occupation" name="user_occupation" value=${char.occupation}>
            </div>
            <div class="descriptor"><span>Stats (0 - 100)</span> </div>
            <div>
              <label for="strength">Strength:</label>
              <input type="text" id="edit-strength" name="user_strength" value=${char.strength}>
            </div>
            <div>
              <label for="dexterity">Dexterity:</label>
              <input type="text" id="edit-dexterity" name="user_dexterity" value=${char.dexterity}>
            </div>
            <div>
              <label for="intelligence">Intelligence:</label>
              <input type="text" id="edit-intelligence" name="user_intelligence" value=${char.intelligence}>
            </div>
            <div>
              <label for="luck">Luck:</label>
              <input type="text" id="edit-luck" name="user_luck" value=${char.luck}>
            </div>
            <div>
              <label for="odd">Oddity:</label>
              <input type="text" id="edit-odd" name="user_odd" value=${char.odd}>
            </div>
            <button class="action-button" id="edit-character-button" onclick="editCharacter( ${charNum} )">Edit Character</button> </div>
        </form> </div>` 
       // document.getElementById( 'edit-character' ).style.display = "block"
        //document.getElementById( 'edit-character' ).innerHTML = `<button class="action-button" id="edit-character-button" onclick="editCharacter(${1})">Edit Character</button>`
   
              })
        
        
      
    return false
  }
  
  const editCharacter = function( number ){
    const edits = { 
          name: document.getElementById( 'edit-name' ).value,
          age: document.getElementById( 'edit-age' ).value,
          occupation: document.getElementById( 'edit-occupation' ).value,
          strength: document.getElementById( 'edit-strength' ).value,
          dexterity: document.getElementById( 'edit-dexterity' ).value,
          intelligence: document.getElementById( 'edit-intelligence' ).value,
          luck: document.getElementById( 'edit-luck' ).value,
          odd: document.getElementById( 'edit-odd' ).value
          /*name: 'test',
          age: 2,
          occupation: 'testing',
          strength: 2,
          dexterity: 2,
          intelligence: 2,
          luck: 2,
          odd: 2*/
    }
    
    if ( validateCharacter(edits) ) {
      debugger
      const char = { charNum : number, charEdit: edits}
      const body = JSON.stringify( char )
      
      fetch('/edit', {
        method: 'POST',
        body
      })
    }
    location.reload()
    viewCharacters()
    return false
    
  }
  const mainScreen = function() {
    
    document.getElementById( 'character-table' ).style.display = "none"
    document.getElementById( 'character-form' ).style.display = "flex"
    document.getElementById( 'character-created' ).style.display = "none"
    document.getElementById( 'edit-character' ).style.display = "none"
    location.reload()
    return false
  }

  window.onload = function() {
    const createButton = document.getElementById( 'create-character' )
    createButton.onclick = createCharacter

    /*const deleteButton = document.getElementById( 'delete-character' )
    deleteButton.onclick = deleteCharacter

    const editButton = document.getElementById( 'edit-character' )
    editButton.onclick = editCharacter*/
    
    const characterFormButton = document.getElementById( 'to-character-form' )
    characterFormButton.onclick = mainScreen
    
    const viewAllCharactersButton = document.getElementById( 'view-characters' )
    viewAllCharactersButton.onclick = viewCharacters
    
    document.getElementById( 'character-table' ).style.display = "none"
    document.getElementById( 'character-form' ).style.display = "flex"
    document.getElementById( 'character-created' ).style.display = "none"
    document.getElementById( 'edit-character' ).style.display = "none"

  }

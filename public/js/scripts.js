//***** Karen Royer - https://github.com/Arundelain/a2-arundelain
//***** Assignment 2 CS4241
//***** 09/09/2019
//*****


console.log("Welcome to assignment 2!")

// initial data - declare a key counter for the data structure and
// arrays to hold a collection of verbs, prepositions and colors
var keyCounter = 0;
//story details here
var verb = ['jumped', 'hiked', 'rode', 'traipsed', 'skipped','meandered','fell','hopped','trekked', 'tramped'];
var where = ['over', 'under', 'around','through', 'beyond', 'between', 'across','past','inside', 'near'];
var color = ['red','green', 'blue', 'yellow','orange', 'purple','brown','black','white','sky blue pink'];

// data structure - key, noun, noun, adjective, adjective, verb, where
// this is the first record - key is zero
var appdata = [{ key:keyCounter, noun_01: 'noun', noun_02:'noun', adjective_01:'adjective', adjective_02:'adjective', verb:'verb', where:'preposition'}];

//increment key to prepare to receive user data
keyCounter = 1;

//submit function from submit button
const submitF = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

// setup up initial values of data
  var nounItem_01 = document.querySelector( '#noun_01' ),
      nounItem_02 = document.querySelector('#noun_02'),
      adItem_01 = document.querySelector('#adjective_01'),
      adItem_02 = document.querySelector('#adjective_02'),
      fullSentence = document.querySelector('textarea'),
      list = document.querySelector('ul'),
      listString = [],
      // get a random verb, color and preposition for the sentence.
      json = { key:keyCounter, noun_01: nounItem_01.value, noun_02:nounItem_02.value, adjective_01:adItem_01.value, adjective_02:adItem_02.value, verb:verb[Math.floor(Math.random() * 10)], where:where[Math.floor(Math.random() * 10)]},
      body = JSON.stringify( json ),
      data = '';


    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
      console.log( "this is response" + response );
      //after the user clicks on the submit button, get the data in the input areas to push onto the end of
      //the data array.
  var tempObj = {};
      tempObj['key'] = keyCounter;
      tempObj['noun_01'] = json.noun_01;
      tempObj['noun_02'] = json.noun_02;
      tempObj['adjective_01'] = json.adjective_01;
      tempObj['adjective_02'] = json.adjective_02;
      tempObj['verb'] = verb[Math.floor(Math.random() * 10)];
      tempObj['where'] = where[Math.floor(Math.random() * 10)];
      appdata.push(tempObj);

      // construct the sentence for the text area then output the full sentence
      listString.push(' The '+ appdata[keyCounter].adjective_01 +' '+ color[Math.floor(Math.random() * 10)]+' '+ appdata[keyCounter].noun_01 +' '+ appdata[keyCounter].verb +' '+ appdata[keyCounter].where +' '+ 'the '+' '+ appdata[keyCounter].adjective_02 +' '+ appdata[keyCounter].noun_02 +'. '+'\n');
      fullSentence.textContent += listString;


      //create the list items for the document using the modified database
      let listItem = document.createElement('li');
      let listText = document.createElement('span');
      let listBtn = document.createElement('button');
      var myListItem = [keyCounter, listItem];
      listItem.appendChild(listText);
      listText.textContent = keyCounter + '-'+ appdata[keyCounter].noun_01+ ', '+appdata[keyCounter].noun_02+ ', '+appdata[keyCounter].adjective_01+ ', '+appdata[keyCounter].adjective_02;
      listItem.appendChild(listBtn);
      listBtn.textContent = 'Delete';
      list.appendChild(listItem);
      //increment the keycounter and wait for the next input
      keyCounter++;

      //add actions for the onclick delete button
      listBtn.onclick = function(e) {
     /// let appLength = appdata.length;
      listString = ''
      fullSentence.textContent = '';

      if(myListItem[0]>1){
            list.removeChild(listItem);
            console.log('cut off item'+ appdata[myListItem[0]].nouns_01);
            appdata.splice(myListItem[0],1);
            fullSentence.textContent = "";
          }else{
            fullSentence.textContent = "This first item on the list cannot be deleted."+ "\n";
          }
        }

      //return focus to the first input area and return response.json
      nounItem_01.focus();
      return response.json;
    })
    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#submitButton' );
    button.onclick = submitF;
  }

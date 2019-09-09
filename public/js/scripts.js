// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const inputName = document.querySelector( '#inputName' ),
        inputBDay = document.querySelector( '#inputBDay'),
        json = { yourname: inputName.value,
                  BDay: inputBDay.value },
        body = JSON.stringify( json )
        //create json from fields
        //stringify json to send
        // console.log(json)
  //fetch sends the stringified json, body, via POST method
  //then handles the respose
  fetch( '/submit', {
    method:'POST',
    body
  })
  .then( function( response ) {
    // do something with the reponse
    console.log( response )
    response.text().then(function(text){
      console.log(text)
      setCookie(inputName.value, text, 1);
      let jOBJ = JSON.parse(text)
      alert("congrats! you are a "+jOBJ['horoscope']+" in the year of the "+jOBJ['zodiac']+"!")
      //cookie is set to the table value stored in the temporary server, now cached for a day
    })
  })

  return false
}


const retrieveAll = function() {
  fetch( '/retrieve', {
    method:'GET',
  })
  .then( function( response ) {
    console.log('retrieving')
    // do something with the reponse
    console.log( response )
    response.text().then(function(text){
      console.log(text)
      setCookie('dataTable', text, 1);
      let jOBJ = JSON.parse(text)
      //cookie is set to the table value stored in the temporary server, now cached for a day
    })
  })

  return false
}

const delByName = function() {
  const inputName = document.querySelector( '#inputName' ),
        json = { yourname: inputName.value},
        body = JSON.stringify( json )

  fetch( '/del', {
    method:'POST',
    body
  })
  .then( function( response ) {
    console.log('deleting')
    // do something with the reponse
    console.log( response )
    response.text().then(function(text){
      console.log(text)
      //cookie is set to the table value stored in the temporary server, now cached for a day
    })
  })

  deleteCookie(inputName);
  return false
}


window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit
}

function getCookie() {
  const name = document.querySelector('#inputName').value;
  console.log(name);
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  console.log( v );
  return v ? v[2] : null;
}

function setCookie(name, value, days) {
  let d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function deleteCookie(name) { setCookie(name, '', -1); }

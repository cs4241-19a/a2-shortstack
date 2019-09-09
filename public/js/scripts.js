function delBooking(id){
    fetch( '/api/del?id=' + id)
      .then( function( response ) {
          tableLoad();
      })
}

const tableLoad = function(){
    const viewDate = document.querySelector( '#date' );
    const viewTime = document.querySelector( '#time' );
    let apiData = [];

    $("#reservations").empty();
    $("#empty-alert").empty();
    $("#reservations").append("<tr><th>Seat</th><th>Username</th><th>Email</th><th></th></tr>")

  fetch('/api/avail?date=' + viewDate.value + '&time=' + viewTime.value, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }

  })
  .then(function(response) {
    return response.json();
  })
  .then(function(apiJson) {
    apiData = Array.from(apiJson);
    if (apiData.length < 1) {
        $("#reservations").empty();
        $("#empty-alert").append("<p class='alert alert-success'>Nice! This section has no reservations. Add one or view another section.</p>")
    }
    apiData.forEach(function(reservation) {
        $("#reservations").append("<tr><td>" + reservation.seat + "</td><td>" + reservation.username + "</td><td>" + reservation.email + "</td><td class='alight-right'><button onclick='delBooking(" + reservation.id + ")'>Delete</button></td></li>")
    });
  });
  };

  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const seat = document.querySelector( '#seat' ),
          user = document.querySelector( '#username' ),
          date = document.querySelector( '#date' ),
          time = document.querySelector( '#time' ),
          json = { seat: seat.value, username: username.value, date: date.value, time: time.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
        $("#seat").val("")
        $("#username").val("");
        tableLoad();
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#submit' )
    button.onclick = submit
    const viewDate = document.querySelector( '#date' )
    viewDate.onchange = tableLoad
    const viewTime = document.querySelector( '#time' )
    viewTime.onclick = tableLoad
  }
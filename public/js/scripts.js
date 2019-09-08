// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]', {"type": "date", "displayMode": "dialog"});

const markComplete = function ( sat_id ) {
  fetch( '/end_mission', {
    method:'POST',
    body: JSON.stringify({ id: sat_id })
  }).then(function (response) {
    window.location.hash = "#view"
    location.reload();
  })
}
const removeSat = function ( sat_id ) {
  fetch( '/remove_spacecraft', {
    method:'POST',
    body: JSON.stringify({ id: sat_id })
  }).then(function (response) {
    window.location.hash = "#view"
    location.reload();
  })
}

const displayFuture = function( sat ) {
  const template = '<tr><td>{name}</td><td>{orbit}</td><td>{launch}</td><td><button onclick="removeSat({id})" class="button is-rounded is-danger"> \
  <span class="icon is-small">  <i class="fas fa-times"></i> </span> </button></td></tr>'
  const row = template.replace("{name}", sat.name).replace("{orbit}", sat.orbit_type).replace("{launch}", (new Date(sat.mission_start).toLocaleDateString("en-US")))
        .replace("{id}", sat.id)
  const tbody = document.querySelector("#future-body")
  tbody.innerHTML += row
}

const displayActive = function( sat ) {
  const template = '<tr><td>{name}</td><td>{orbit}</td><td>{launch}</td><td>{elapsed} days</td><td><button onclick="markComplete({id})" class="button is-rounded is-success"> \
  <span class="icon is-small">  <i class="fas fa-check"></i> </span> </button></td></tr>'
  const row = template.replace("{name}", sat.name).replace("{orbit}", sat.orbit_type).replace("{launch}", (new Date(sat.mission_start).toLocaleDateString("en-US")))
        .replace("{elapsed}", Math.round(sat.elapsed / 8.64e+7)).replace("{id}", sat.id)
  const tbody = document.querySelector("#active-body")
  tbody.innerHTML += row
}

const displayInactive = function( sat ) {
  const template = '<tr><td>{name}</td><td>{orbit}</td><td>{launch}</td><td>{end}</td><td>{elapsed} days</td></tr>'
  const row = template.replace("{name}", sat.name).replace("{orbit}", sat.orbit_type).replace("{launch}", new Date(sat.mission_start).toLocaleDateString("en-US"))
        .replace("{elapsed}", Math.round(sat.elapsed / 8.64e+7)).replace("{end}", new Date(sat.mission_end).toLocaleDateString("en-US"))
  const tbody = document.querySelector("#inactive-body")
  tbody.innerHTML += row
}

const displayData = function ( data ) {
  for (let i = 0; i < data.length; i++) {
    const sat = data[i]
    document.querySelector("#future-body")
    document.querySelector("#active-body")
    document.querySelector("#inactive-body")

    if (!sat.has_launched) {
      displayFuture(sat)
    }

    if (sat.has_launched && !sat.mission_completed) {
      displayActive(sat)
    }

    if (sat.has_launched && sat.mission_completed) {
      displayInactive(sat)
    }
  }
}

const loadData = function( e ) {
  fetch( '/spacecraft_data', {
    method:'GET',
  })
  .then( function( response ) {
    response.json().then(displayData)
  })
}

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const name = document.querySelector( '#sat-name' ),
        completed = document.querySelector( '#completed' ).className.indexOf("is-active") !== -1,
        orbit = document.querySelector( '#orbit-select' ),
        launchTime = calendars[0].date.start.getTime(),
        endTime = calendars[1].date.start === undefined ? undefined : calendars[1].date.start.getTime(),
        json = { name: name.value, mission_start: launchTime, mission_completed: completed, mission_end: endTime, orbit_type: orbit.value},
        body = JSON.stringify( json )

  fetch( '/add_spacecraft', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    name.value = ""
    loadData()
    calendars[0].clear()
    calendars[1].clear()
    notCompletedClicked()
  })

  return false
}

const completedClicked = function( e ) {
  const endDate = document.querySelector( '#end-date' )
  const notCompleted = document.querySelector( '#not-completed' )
  const completed = document.querySelector( '#completed' )

  notCompleted.className = ""
  completed.className = "is-active"
  endDate.disabled = false

  checkInput()
}

const notCompletedClicked = function( e ) {
  const endDate = document.querySelector( '#end-date' )
  const notCompleted = document.querySelector( '#not-completed' )
  const completed = document.querySelector( '#completed' )

  completed.className = ""
  notCompleted.className = "is-active"
  endDate.disabled = true

  checkInput()
}

const checkInput = function ( e ) {
  console.log('check')
  const button = document.querySelector( 'button' )
  const satName = document.querySelector( '#sat-name' )
  const completed = document.querySelector( '#completed' )

  if (satName.value === "") {
    button.disabled = true
    return
  }

  if (calendars[0].date.start === undefined) {
    button.disabled = true
    return
  }

  if (completed.className.indexOf("is-active") !== -1 && calendars[1].date.start === undefined) {
    button.disabled = true
    return
  }

  button.disabled = false
}

const toggleView = function(view) {
  const form = document.querySelector( '#new-sat-form' )
  const tables = document.querySelector( '#table-view' )
  const addTab = document.querySelector( '#add-tab' )
  const viewTab = document.querySelector( '#view-tab' )

  switch (view) {
    case 0:
      form.style.display = "block"
      tables.style.display = "none"
      addTab.className = "is-active"
      viewTab.className = ""
      window.location.hash = "#add"
      break
    case 1:
      loadData()
      form.style.display = "none"
      tables.style.display = "block"
      addTab.className = ""
      viewTab.className = "is-active"
      window.location.hash = "#view"
      break
    default:
      form.style.display = "block"
      tables.style.display = "none"
      addTab.className = "is-active"
      viewTab.className = ""
      break
  }
}

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit

  const notCompleted = document.querySelector( '#not-completed' )
  const completed = document.querySelector( '#completed' )
  notCompleted.onclick = notCompletedClicked
  completed.onclick = completedClicked

  const satName = document.querySelector( '#sat-name' )
  const orbit = document.querySelector( '#orbit-select' )

  satName.onchange = checkInput

  calendars[0].on('hide', checkInput)
  calendars[1].on('hide', checkInput)
  loadData()
}



  if(window.location.hash) {
    if (window.location.hash === "#view") {
      toggleView(1)
    } else {
      toggleView(0)
    }
  } else {
    toggleView(0)
  }
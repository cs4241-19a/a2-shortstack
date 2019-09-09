
"use strict"

let uid;

let currentState = {
  cursors: 0,
  hobbyists: 0,
  csMajors: 0,
  softEng: 0,
  server: 0,
  quantum: 0,
  currentLOC: 0
}

let rates = {
  cursors: 1,
  hobbyists: 10,
  csMajors: 30,
  softEng: 50,
  server: 70,
  quantum: 110
}

let resultsShown = false;
let shownIds = [0]; // Array of elements shown in the results table already
let headerState = true;

/**
 * Increment the counter by a specific amount. Default value = 1.
 * @param {} e 
 * @param {*} i 
 */
const incrementCounter = function (e, i = 1) {
  const currentLOC = document.getElementById('counter');
  currentState.currentLOC += i;
  currentLOC.innerHTML = currentState.currentLOC.toLocaleString('en') + " Lines of Code";
}

/**
 * Gets the current lines per second from the current state 
 * @param {} e 
 */
const linesPerSecond = function () {
  return (currentState.cursors * rates.cursors) +
    (currentState.hobbyists * rates.hobbyists) +
    (currentState.csMajors * rates.csMajors) +
    (currentState.softEng * rates.softEng) +
    (currentState.server * rates.server) +
    (currentState.quantum * rates.quantum)
}

/***
* Submit only the current lines of code to the server to save.
*/
const updateLOCOnly = function () {
  const json = {
    action: "modifyData",
    uid: uid,
    cursors: 0,
    hobbyists: 0,
    csMajors: 0,
    softEng: 0,
    server: 0,
    quantum: 0,
    currentLOC: currentState.currentLOC
  },
    body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body
  })
    .then(function (response) {
      response.text().then(function (recieveText) {
        if (recieveText === "Transaction Completed") {
          console.log("Game Saved!");
          getDataFromServer(uid);
        } else {
          console.log("Save Failed");
        }
        getDataFromServer(uid)
      })
    })
}

/**
 * Function to handle when the purchase button is selected.
 */
const purchaseItems = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const cursors = document.querySelector('#cursors'),
    hobbyists = document.querySelector('#hobbyists'),
    csMajors = document.querySelector('#cs_maj'),
    softEng = document.querySelector('#soft_eng'),
    server = document.querySelector('#server_farm'),
    quantum = document.querySelector('#quantum'),
    json = {
      action: "modifyData",
      uid: uid,
      cursors: parseInt(cursors.value),
      hobbyists: parseInt(hobbyists.value),
      csMajors: parseInt(csMajors.value),
      softEng: parseInt(softEng.value),
      server: parseInt(server.value),
      quantum: parseInt(quantum.value),
      currentLOC: currentState.currentLOC
    },
    body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body
  })
    .then(function (response) {
      response.text().then(function (recieveText) {
        if (recieveText === "Transaction Completed") {
          console.log("Transaction Complete");
          getDataFromServer(uid);
        } else {
          console.log(recieveText)
          alert("Not enough lines of code to recruit code contributors.")
          console.log("Transaction Failed");
        }
        getDataFromServer(uid)
      })
    })

  return false
}

/**
 * Refresh the cache from the server to the client (used for after initializing and purchases)
 * @param {} uid 
 */
const getDataFromServer = function (uid) {
  fetch('/getData/' + String(uid), {
    method: 'GET'
  })
    .then(function (response) {
      response.text().then(function (recieveText) {
        console.log(recieveText);
        let obj = JSON.parse(recieveText);
        console.log("Recieved_object:" + obj)
        currentState.currentLOC = obj.loc;
        currentState.cursors = obj.cursors;
        currentState.hobbyists = obj.hobbyists;
        currentState.csMajors = obj.csMajors;
        currentState.softEng = obj.softEngs;
        currentState.server = obj.server;
        currentState.quantum = obj.quantumComputers;
        updateUI();
      })
    })
}

/***
* Updates the user interface given the current cached values
* in the client
*/
const updateUI = function () {
  document.querySelector('#counter').innerHTML = currentState.currentLOC.toLocaleString('en') + " Lines of Code";
  document.querySelector('#purchased_cursors').innerHTML = String(currentState.cursors);
  document.querySelector('#purchased_hobbyists').innerHTML = String(currentState.hobbyists);
  document.querySelector('#purchased_csmajors').innerHTML = String(currentState.csMajors);
  document.querySelector('#purchased_softengs').innerHTML = String(currentState.softEng);
  document.querySelector('#purchased_servers').innerHTML = String(currentState.server);
  document.querySelector('#purchased_quantum').innerHTML = String(currentState.quantum);
  let lps = linesPerSecond()
  document.querySelector('#rate_disp').innerHTML = "Current rate: " + lps.toLocaleString('en') + " lines of code / second"
}

/***
* Sets a cell in a table DOM element given the row of the table (must be already created)
* and the cell number
*/
const setCell = function (row, cellNo, element) {
  let cell = row.insertCell(cellNo);
  cell.innerHTML = element;
}

const showResults = function (e) {

  let resultsButton = document.getElementById('results_button')
  let table = document.getElementById("results_table")
  let resultsSection = document.getElementById("results_section")

  if (resultsShown) {
    resultsButton.innerHTML = "Show Results"
    resultsSection.style.display = "none"
    resultsShown = false;
  } else {

    fetch('/getAllData', {
      method: 'GET'
    })
      .then(function (response) {
        response.text().then(function (recieveText) {
          console.log(recieveText);

          // Get the object array
          let objArray = JSON.parse(recieveText);
          objArray.forEach(function (obj) {
            if (!shownIds.includes(obj.uid)) {

              let row = table.insertRow()
              setCell(row, 0, obj.uid);
              setCell(row, 1, obj.loc);
              setCell(row, 2, obj.cursors);
              setCell(row, 3, obj.hobbyists);
              setCell(row, 4, obj.csMajors);
              setCell(row, 5, obj.softEngs);
              setCell(row, 6, obj.server);
              setCell(row, 7, obj.quantumComputers);
              setCell(row, 8, obj.totalLoc);
              shownIds.push(obj.uid);
            }
            resultsButton.innerHTML = "Hide Results"
            resultsSection.style.display = "block";
            resultsShown = true;
          })
        })
      })
  }
}

window.onload = function () {
  const button = document.getElementById('purchase')
  button.onclick = purchaseItems

  const incButton = document.getElementById('clicker')
  incButton.onclick = incrementCounter

  const resultsButton = document.getElementById('results_button')
  resultsButton.onclick = showResults

  let localStorage = window.localStorage;

  /* Checking if UID exists, if so, get it from the server */
  if (!localStorage.getItem("uid")) {
    console.log("Does not have a cookie for UID, getting one from server.")
    fetch('/getUID', {
      method: 'GET'
    })
      .then(function (response) {
        // do something with the reponse
        response.text().then(function (recieveText) {
          console.log("Response " + recieveText)
          localStorage.setItem("uid", recieveText)
          uid = localStorage.getItem("uid")
          getDataFromServer(uid);
        })
      })
  } else {
    uid = localStorage.getItem("uid")
    getDataFromServer(uid);
    updateUI();
  }
}

/* Get the current linesPerSecond and increment the counter by that amount */
window.setInterval(function () {
  incrementCounter(null, linesPerSecond())
}, 1000)

/* Save the game every ten seconds */
window.setInterval(function () {
  updateLOCOnly();
}, 30000)

/* Update Header every second */
window.setInterval(function () {
  let title = document.querySelector("#cs_clicker_title")
  if(headerState) {
    title.innerHTML = "$CS-Clicker "
    headerState = false;
  } else {
    title.innerHTML = "$CS-Clicker_"
    headerState = true;
  }
}, 500)

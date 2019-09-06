
"use strict"

let counter = 0;

const incrementCounter = function(e) {
  const currentLOC = document.getElementById('counter');
  counter = Number(currentLOC.innerHTML) + 1
  currentLOC.innerHTML = counter;
}

const submit = function (e, action) {
  // prevent default form action from being carried out
  e.preventDefault()

  const cursors = document.querySelector('#cursors'),
    hobbyists = document.querySelector('#hobbyists'),
    csMajors = document.querySelector('#cs_maj'),
    softEng = document.querySelector('#soft_eng')
    server = document.querySelector('#server_farm'),
    quantum = document.querySelector('#quantum'),
    currentLOC = document.getElementById('counter'),
    json = { 
      action: action,
      cursors: cursors.value,
      hobbyists: hobbyists.value,
      csMajors: csMajors.value,
      softEng: softEng.value,
      server: server.value,
      quantum: quantum.value,
      currentLOC: currentLOC.innerHTML},
    body = JSON.stringify(json)

  fetch('/submit', {
    method: 'POST',
    body
  })
    .then(function (response) {
      // do something with the reponse 
      console.log(response)
    })

  return false
}

window.onload = function () {
  const button = document.getElementById('purchase')
  button.onclick = submit

  const incButton = document.getElementById('clicker')
  incButton.onclick = incrementCounter
}


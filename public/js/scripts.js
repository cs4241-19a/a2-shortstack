// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");


const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  //{ pos: 1, name: "Bill", time: 10, diff: 0, done: "Yes" },
  const input = document.querySelector("#yourname"),
    time = document.querySelector("#time"),
    finished = document.querySelector("#loads"),
    json = {
      pos: 0,
      name: input.value,
      time: time.value,
      diff: 0,
      done: finished.value
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  }).then(function(response) {
    // do something with the reponse
    var incomingData = JSON.parse(response);
    createTable(incomingData);
  });

  return false;
};

const edit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.querySelector("#yourname"),
    time = document.querySelector("#time"),
    finished = document.querySelector("#loads"),
    json = {
      pos: 0,
      name: input.value,
      time: time.value,
      diff: 0,
      done: finished.value
    },
    body = JSON.stringify(json);
  fetch("/edit", {
    method: "POST",
    body
  }).then(function(response) {
    // do something with the reponse
    var incomingData = JSON.parse(response);
    createTable(incomingData);
  });

  return false;
};

const delFunc = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.querySelector("#yourname"),
    json = { name: input.value },
    body = JSON.stringify(json);
  fetch("/delete", {
    method: "POST",
    body
  }).then(function(response) {
    // do something with the reponse
    var incomingData = JSON.parse(response);
    createTable(incomingData);
  });
};

window.onload = function() {
  firstTime();
  /*this was meant to try to fetch the data for the first time when the page loads. it doesn't work.*/
  const submitButton = document.querySelector("#submitButton");
  const editButton = document.querySelector("#editButton");
  const delButton = document.querySelector("#delButton");

  submitButton.onclick = submit;
  editButton.onclick = edit;
  delButton.onclick = delFunc;
};

const createTable = function(data) {
  document.getElementById("lbBody").innerHTML = "";
  var html = "";
  data.forEach(function(e, i) {
    html += "<tr>" + 
      "<td>" + e.pos + "</td>" +
      "<td>" + e.name + "</td>" +
      "<td>" + e.time + "</td>" +
      "<td>" + e.diff + "</td>" +
      "<td>" + e.done + "</td>" +
      "</tr>";
  });
  document.getElementById("lbBody").innerHTML = html;
};

const firstTime = function() {
  const json = {start:'start'},
        body = JSON.stringify(json);
  fetch("/start", {
    method: "POST",
    body
  }).then(function(response) {
    console.log(response);
    /*var incomingData = JSON.parse(response);
    createTable(incomingData);*/
  });
}
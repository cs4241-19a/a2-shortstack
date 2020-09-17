// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

 let data = [];
const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const input = document.querySelector("#task");
  const input2 = document.querySelector("#date");
  const input3 = document.querySelector("#time"),
    json = { task: input.value, date: input2.value, time: input3.value },
    body = JSON.stringify(json);

  
  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      // do something with the reponse
      return response.json();
    })

    .then(function(json) {
      data.push(json);
      console.log(json);
    });

  return false;
};

function dataTable(){
    var dataLength = data.length;
    for (var i = 0; i <= dataLength; i++) {

      document.write("<tr>");
      document.write("<td>"+JSON.stringify(data[i])+"</td>");
      document.write("<td>"+data[i+1]+"</td>");
      document.write("<td>"+data[i+2]+"</td>");
      console.log(i);
      document.write("</tr>");
    }
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};

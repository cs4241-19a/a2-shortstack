function calc(){
  let rest = document.getElementById("rest").value;
  let date = document.getElementById("date").value;
  let cost = document.getElementById("cost").value;
  let server = document.getElementById("server").value;
  let tip = (cost * .1* server).toFixed(2);
  let total = (parseFloat(cost, 10) + parseFloat(tip,10)).toFixed(2);
  let quality = "n/a";
  if(server == 3){
    quality = "Amazing";
  }
  else if(server == 2){
    quality = "Average";
  }
  else if(server == 1){
    quality = "Poor"
  }
  alert("Your tip should be: $" + tip);
  row(rest, date, parseFloat(cost, 10).toFixed(2), quality, tip, total);
}

function row(rest, date, cost, server, tip, total) { 
  var table =document.getElementById("past"); 
  var NewRow = table.insertRow(-1); 
  var Rest = NewRow.insertCell(0); 
  var Date = NewRow.insertCell(1); 
  var Cost = NewRow.insertCell(2); 
  var Server = NewRow.insertCell(3); 
  var Tip = NewRow.insertCell(4); 
  var Total = NewRow.insertCell(5); 
  Rest.innerHTML = rest; 
  Date.innerHTML = date;
  Cost.innerHTML = cost;
  Server.innerHTML = server;
  Tip.innerHTML = tip;
  Total.innerHTML = total;
} 

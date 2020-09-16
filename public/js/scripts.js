function addActivity(activity) {
  let table = document.getElementById("activitylist"),
    newRow = table.insertRow(-1),
    newStress = newRow.insertCell(0),
    newTime = newRow.insertCell(1),
    newActivity = newRow.insertCell(2);

  newStress.innerHTML = activity.stress;
  newTime.innerHTML = activity.time;
  newActivity.innerHTML = activity.activity;
}

function getRadioValue() {
  const e = document.getElementsByName("stress");

  for (let i = 0; i < e.length; i++) {
    if (e[i].checked) {
      return e[i].value;
    }
  }
  return false;
}


const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();
  
  const rate = getRadioValue(),
    time = document.querySelector("#time"),
    json = { stress: rate, time: time.value },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let i = json.length - 1;
      addActivity(json[i]);
      console.log(json);
    });

  return false;
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};

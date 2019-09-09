/**
 * Author: Zonglin Peng
 */

let ID = 3;

// GET
const createHeader = function() {
  database.innerHTML = ""
  const headerList = ["ID", "Model", "Year", "MPG", "Value($)"]
  var tr = document.createElement('tr');
  tr.style.width = '100%';
  tr.setAttribute('border', '1');
  for(let i = 0; i < headerList.length; i++) {
    let header = headerList[i];
    let th = document.createElement('th');
    th.innerHTML = header;
    tr.appendChild(th);
  }
  database.appendChild(tr);
}

const getCar = function () {
  fetch('/get', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
      console.log(data)
      createHeader()
      data.map(function (entry) {
        const headerList = [
          entry.id, entry.model, entry.year, 
          entry.mpg, entry.value
        ]
        let tr = document.createElement('tr');
        for(let i = 0; i < headerList.length; i++) {
          let key = headerList[i];
          let td = document.createElement('th');
          td.innerHTML = key;
          tr.appendChild(td);
        }
        database.appendChild(tr);
      })
    })
}

// POST 
function postRequest(req) {
    // prevent default form action from being carried out
    const model = document.querySelector( '#model' ),
          year = document.querySelector( '#year' ),
          mpg = document.querySelector( '#mpg' ),
          idInput = document.querySelector( '#id' ).value,
          id = function() {
            if (req === "add"){
              return ID++;
            }
            else {
              if(idInput !== ""){
                return parseInt(idInput);
              }else{
                return ID++;
              }
            }
          }
          //id = (req !== "add" && idInput !== "") ? parseInt(idInput) : ID++,
          json = {
            id: id(),
            model: model.value,
            year: parseInt(year.value),
            mpg: parseInt(mpg.value),
            value: 0
          },
          body = JSON.stringify( json )

    fetch( `/${req}`, {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log( "Add to server: " + response )
      getCar() //get
    })
  }

// POST - ADD
const addCar = function( e ) {
  e.preventDefault()
  postRequest("add")
  return false
}

// POST - DELETE
const deleteCar = function( e ) {
  e.preventDefault()
  postRequest("delete")
  return false
}

// POST - MODIFY
const modifyCar = function( e ) {
  e.preventDefault()
  postRequest("modify")
  return false
}

const infoAlert = function(){
  swal("How To Use", 
  ">Add: Select models and enter year and mpg.\n"+
  ">Delete: Select models and enter its ID.\n"+
  ">Modify: Select models enter its ID, year, and mpg.")
}

const addButton = document.getElementById('add');
const deleteButton = document.getElementById('del');
const modifyButton = document.getElementById('mod');
const infoIcon = document.getElementById('info');
addButton.onclick = addCar;
deleteButton.onclick = deleteCar;
modifyButton.onclick = modifyCar;
infoIcon.onclick = infoAlert;

window.onload = function() {
  getCar()
}


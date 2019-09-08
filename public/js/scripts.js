const generate = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()

  function getOption(){
    let element = document.getElementById("drawType");
    return element.options[element.selectedIndex].text
  }
  
  const input = {
    vertices: document.getElementById("vertices").value,
    drawType: getOption(),
    name: document.getElementById("name").value
  };
  const body = JSON.stringify( input )
  
  fetch( '/generate', {
    method:'POST',
    body 
  })
  .then( function( response) {
    getData()
  })
  
  return false
}

function getData(idx = -1){
    fetch( '/getDrawings', {
      method: 'GET'
    })
    .then( function( response) {
      return response.json()
    })
    .then( function(data){
      genTable(data, idx)
    })
}

function genTable(dataList, idx) {
  let str = "<tr>"+
              "<th>Number of Vertices</th>" + 
              "<th>Draw Type</th>" + 
              "<th>Name</th>" +
              "<th></th>"
            "</tr>"
  
  let i = 0
  for(let d of dataList){
    if(idx === i){
      str += "<tr>"+
                "<td>" + 
                  "<input type='number' id='vertices' value="+ d.vertices +"></td>" + 
                "<td>            <select id="drawType">
              <option>Line</option>
              <option>Triangle</option>
              <option>Dots</option>
            </select>"+ d.drawType +"</td>" + 
                "<td>"+ d.name +"</td>" +
                "<td>" + 
                  "<button id='v" + i + "' onclick='drawData(" + i + ")'>View</button>" +
                  "<button id='e" + i + "' onclick='editData(" + i + ")'>Edit</button>" +
                  "<button id='d" + i + "'onclick='deleteData(" + i +")'>Delete</button>" +
                "</td>"
              "</tr>"
    }
    else{
      str += "<tr>"+
                "<td>"+ d.vertices +"</td>" + 
                "<td>"+ d.drawType +"</td>" + 
                "<td>"+ d.name +"</td>" +
                "<td>" + 
                  "<button id='v" + i + "' onclick='drawData(" + i + ")'>View</button>" +
                  "<button id='e" + i + "' onclick='editData(" + i + ")'>Edit</button>" +
                  "<button id='d" + i + "'onclick='deleteData(" + i +")'>Delete</button>" +
                "</td>"
              "</tr>"
    }
    i++
  }
  document.getElementById("dataTable").innerHTML = str
}

function drawData(index){
  console.log("draw", index)
}

function editData(index){
  getData(index)
}

function deleteData(index){
  const body = JSON.stringify( index )
  fetch( '/delete', {
    method: 'POST',
    body
  })
  .then( function( response) {
    getData()
  })
}

function updateData(index){
  console.log("update", index)
}


window.onload = function() {
  getData()
  const genBtn = document.getElementById("generate")
  genBtn.onclick = generate
}
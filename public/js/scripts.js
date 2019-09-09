const generate = function(e) {
  // prevent default form action from being carried out
  e.preventDefault()
  
  const body = JSON.stringify(grabInput("numPoly", "vertices", "name"))
  
  fetch( '/generate', {
    method:'POST',
    body 
  })
  .then( function( response) {
    getData()
  })
  
  return false
}

function grabInput(poly, ver, name){
  
  const input = {
    vertices: document.getElementById(ver).value,
    drawType: document.getElementById(poly).value,
    name: document.getElementById(name).value
  };
  return input
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
              "<th>Number of Triangles</th>" + 
              "<th>Name</th>" +
              "<th></th>"
            "</tr>"
  
  let i = 0
  for(let d of dataList){
    if(idx === i){
      str += "<tr>"+
                "<td>" + 
                  "<input type='number' id='verticesE' value="+ d.vertices +"></td>" + 
                "<td>"+
                  "<input type='number' id='numPolyE' value=" + d.numPoly + "></td>" + 
                "<td>" + 
                  "<input type='text' id='nameE' value='" + d.name + "'>" +
                "</td>" +
                "<td>" + 
                  "<button id='v" + i + "' onclick='drawData(" + i + ")'>View</button>" +
                  "<button id='u" + i + "' onclick='updateData(" + i + ")'>Update</button>" +
                  "<button id='d" + i + "'onclick='deleteData(" + i +")'>Delete</button>" +
                "</td>"
              "</tr>"
    }
    else{
      str += "<tr>"+
                "<td>"+ d.vertices +"</td>" + 
                "<td>"+ d.numPoly +"</td>" + 
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
  const input = grabInput("numPolyE", "verticesE", "nameE")
  input.idx = index
  const body = JSON.stringify(input)
  
  fetch( '/update', {
    method:'POST',
    body 
  })
  .then( function( response) {
    getData()
  })
  return false
}


window.onload = function() {
  getData()
  const genBtn = document.getElementById("generate")
  genBtn.onclick = generate
}
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

function getData(){
    fetch( '/getDrawings', {
      method: 'GET'
    })
    .then( function( response) {
      return response.json()
    })
    .then( function(data){
      console.log(data)
      genTable(data)
    })
}

function genTable(dataList) {
  let str = "<tr>"+
              "<th>Number of Vertices</th>" + 
              "<th>Draw Type</th>" + 
              "<th>Name</th>" +
              "<th></th>"
            "</tr>"
  
  for(let d of dataList){
    str += "<tr>"+
              "<td>"+ d.vertices +"</td>" + 
              "<td>"+ d.drawType +"</td>" + 
              "<td>"+ d.name +"</td>" +
              "<td>" + 
                "<button>View</button>" +
                "<button>Edit</button>" +
                "<button>Delete</button>" +
              "</td>"
            "</tr>"
  }
  
  document.getElementById("dataTable").innerHTML = str
}

window.onload = function() {
  getData()
  const genBtn = document.getElementById("generate")
  genBtn.onclick = generate
}
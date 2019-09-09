 var startingClass =[
    { "Department" : "CS1101",
      "Professor"  : "bob",
      "Name" : "programming design concepts"
    },
    { "Department"  : "ME1800",
      "Professor"  : "Jill",
      "Name" : "prototyping"
    },
    { "Department"  : "CS2303",
      "Professor"  : "Andres",
      "Name" : "systems"
    },
    { "Department"  : "PSY1401",
      "Professor"  : "Brian",
      "Name" : "cognitive psych"
    },
    { "Department"  : "RBE1001",
      "Professor"  : "Megan",
      "Name" : "intro to robotics"
    },
    { "Department"  : "ECE2049",
      "Professor"  : "Sam",
      "Name" : "embedded design"
    },
    { "Department"  : "CS4801",
      "Professor"  : "Emily",
      "Name" : "crypto"
    }
  ]
  var list = [".", "Dept code of Class", "Professor Teaching Class", "Name of Class"];
  var bodyTag = document.getElementsByClassName("body");
  bodyTag.addEventListener("load", myFunction());
  var deptArr = ["Test"];
  var profArr = [];
  var nameArr = [];
  var classesByCat = {
    Add: deptArr,
    Modify: profArr,
    Delete: nameArr
  }
  var testing;

  function myFunction() {   
    var table = document.getElementById("results");
    var header = table.createTHead();
    var row = header.insertRow(0);
    for(var i in list){
      var cell = row.insertCell(0);
      cell.innerHTML = "<strong>"+list[3-i]+"</strong>";
    }
    for(var i in startingClass){
      row = header.insertRow()
      cell = row.insertCell()
      cell.innerHTML = i;
      for(var j = 1; j < 4; j++){
        cell = row.insertCell(j);
        if(j == 1){
          cell.innerHTML = startingClass[i].Department;
        }
        else if(j == 2){
          cell.innerHTML = startingClass[i].Professor;
        }
        else{
          cell.innerHTML = startingClass[i].Name;
        }
      }
    } 
  }
    
   


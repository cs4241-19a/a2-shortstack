function onViewPageLoad(){
    if(window.location.pathname === "/viewData.html"){
        createTableFromJSON();
    }
}

function goBack(){
    window.location.pathname = "/index.html"
}

window.onload = function(){
    onViewPageLoad();
};

function createTableFromJSON(){
    fetch( '/getData', {
        method:'GET',
    })
        .then( function( response ) {
            return response.json();
        }).then(function(theJsonData){
        console.log(theJsonData);
        //extract html header values
        let col = [];
        for (let i = 0; i<theJsonData.length; i++){
            for (let key in theJsonData[i]){
                if (col.indexOf(key) === -1){
                    console.log("key is " + key);
                    col.push(key);
                }
            }
        }
        //create dynamic table
        let table = document.createElement("table");

        //create table header
        var tr = table.insertRow(-1);
        tr.setAttribute("style", "max-width: calc(3vw + 3vh);")


        for(var j = 0; j < col.length; j++){
            var th = document.createElement("th"); //table header
            //adding header from json to table
            //and capitalizing first letter of every word
            th.innerHTML = col[j].toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            tr.appendChild(th);
        }
        //now table has been made. adding json data as rows
        //and capitalizing first letter of every word
        for(var k = 0; k < theJsonData.length; k++){
            tr = table.insertRow(-1);
            if(k===0){
            }
            for (var l = 0; l < col.length; l++){
                var tabCell = tr.insertCell(-1);
                let jsonElement = theJsonData[k][col[l]];
                if(jsonElement!=undefined){
                    tabCell.innerHTML =jsonElement.toLowerCase()
                        .split(' ')
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                }else {
                    tabCell.innerHTML = "undefined";
                }
            }
        }

        //add the created table to a container
        let divContainer = document.getElementById("dbTable");
        divContainer.innerHTML = "";
        //add table to div that should contain it
        divContainer.appendChild(table);
        //change height of dataDisplay div based on height of table added to it
        // document.getElementById("tempDataText").innerText = "";
        table.setAttribute("class", "table table-striped");
    });
}
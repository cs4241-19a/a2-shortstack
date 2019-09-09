

window.onload = function() {
    animateText();
    document.querySelector( 'button' ).onclick = submit;
    getDistanceToFrom() //this also gets the data thats already there and makes table
    // viewData(); //get what data is already there
    createTableFromJSON();
};

function moveToViewMode(){
    window.location.pathname = "/viewData.html";
}

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
    let ifReturn = document.getElementById("returnCheck");
    let returnval;
    if(ifReturn=="true"){
        returnval = "Yes";
    } else {
        returnval = "No";
    }
    console.log("this here!!! "+ document.querySelector('input[name="transport"]:checked'))
    const input = document.querySelector( '#yourname' ),
        json = {
            yourname: input.value,
            placeFrom: document.querySelector( '#placeFrom' ).value,
            placeTo: document.querySelector( '#placeTo' ).value,
            mode: document.querySelector('input[name="transport"]:checked').value,
            return: returnval
},
        body = JSON.stringify( json );

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            // do something with the response
            console.log( response )
        });
    getDistanceToFrom();
    return false
};

//title text js
// Wrap every letter in a span
function animateText() {
    let textWrapper = document.querySelector('.ml12');
    textWrapper.setAttribute("display", "hidden");
    setTimeout(function(){
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: false})
            .add({
                targets: '.ml12 .letter',
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 2200,
                delay: (el, i) => 700 + 30 * i
            });
    }, 1000);
}

function viewData(){
    fetch( '/getData', {
        method:'GET',
    })
        .then( function( response ) {
            // do something with the response
            console.log(response.json())
        });
}

//getting distance between given cities
function getDistanceToFrom(){
    //getting all db data
    fetch( '/getData', {
        method:'GET',
    })
    .then( function( response ) {
        return response.json(); //the db data in json format
    }).then(function(theJsonData) {
        //adding all to and from places to array
        for (let a = 0; a < theJsonData.length; a++) {
            // placesFrom.push(theJsonData[a]["placeFrom"]);
            // placesTo.push(theJsonData[a]["placeTo"]);
            // transports.push(theJsonData[a]["mode"].toUpperCase())
            //getting distances
            var service = new google.maps.DistanceMatrixService;
            let travelType = theJsonData[a]["mode"];
            if (travelType.toLowerCase() === "public transportation"){
                travelType = "transit";
            }
            console.log("travel type: " +travelType)
            service.getDistanceMatrix({
                origins: [theJsonData[a]["placeFrom"]],
                destinations: [theJsonData[a]["placeTo"]],
                travelMode: [travelType.toUpperCase()],
            }, function (response, status) {
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                } else if (status === "ZERO_RESULTS") {
                    alert("No results");
                } else {
                    var originList = response.originAddresses; //get proper addresses for the places from
                    var destinationList = response.destinationAddresses; //get proper addresses for the places to
                    console.log("originAddress response " + originList);
                    console.log("destAddress response " + destinationList);
                    console.log("rows response " + response.rows[0].elements[0].distance.text);
                    for (var b = 0; b < originList.length; b++) {
                        var results = response.rows[b].elements;
                        for (var c = 0; c < results.length; c++) {
                            var element = results[c];
                            var distance, duration;
                            if (element.status !== "OK") {
                                distance = "no available routes for this mode of transit";
                                duration = "NA"
                                theJsonData[a]["distance"] = distance;
                                theJsonData[a]["duration"] = duration;
                            } else {
                                distance = element.distance.text;
                                duration = element.duration.text;
                                var from = originList[b];
                                var to = destinationList[c];
                                theJsonData[a]["distance"] = distance;
                                theJsonData[a]["duration"] = duration;
                            }
                            console.log("from: " + from + " to " + to + " distance: " + theJsonData[b]["distance"] + " duration " + theJsonData[b]["duration"])
                            //making modifications to the existing db with the new info on the json, and updating table after modifications are made
                        }
                    }

                }
                fetch('/modifyData', {
                    method: 'POST',
                    body: JSON.stringify(theJsonData)
                }).then(function(){
                    createTableFromJSON();
                })
            })
        }
    })
}

//creating table dynamically
function createTableFromJSON() {
    fetch('/getData', {
        method: 'GET',
    })
        .then(function (response) {
            return response.json();
        }).then(function (theJsonData) {
        console.log(theJsonData);
        //extract html header values
        let col = [];
        for (let i = 0; i < theJsonData.length; i++) {
            for (let key in theJsonData[i]) {
                if (col.indexOf(key) === -1) {
                    console.log("key is " + key);
                    col.push(key);
                }
            }
        }
        //create dynamic table
        let table = document.createElement("table");
        table.setAttribute("class", "table table-responsive-md table-striped text-center table-dark ");
        table.setAttribute("style", "max-width: 100%;")
        table.setAttribute("id", "table-list");
        console.log("table id is " + table.getAttribute("id"))

        var tableHeaders = [
            "Name",
            "Place From",
            "Place To",
            "Mode",
            "Return",
            "Distance",
            "Duration",
            ""
        ];

        //create table header
        var tr = table.insertRow(-1);

        for (var j = 0; j < tableHeaders.length; j++){
            var th = document.createElement("th");
            th.innerHTML = tableHeaders[j];
            tr.appendChild(th);
        }

        //now table has been made. adding json data as rows
        //and capitalizing first letter of every word
        for (var k = 0; k < theJsonData.length; k++) {
            tr = table.insertRow(-1);
            if (k === 0) {
            }
            if(k<theJsonData.length){
                for (var l = 0; l < col.length+1; l++) {
                    //for all other columns add the info thats in the json
                    if(l<col.length){
                        var tabCell = tr.insertCell(-1);
                        let jsonElement = theJsonData[k][col[l]];
                        if (jsonElement != undefined) {
                            tabCell.innerHTML = jsonElement.toLowerCase()
                                .split(' ')
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ');
                        } else {
                            tabCell.innerHTML = "undefined";
                        }
                        //only allow editing of tge first 4 columns
                        if(l < col.length-2){
                            tabCell.setAttribute("contenteditable", "true");
                            tabCell.addEventListener("keyup", event => {
                                if(event.isComposing || event.keyCode === 229){
                                    return
                                } else {
                                    userModify(event.target)
                                }
                            });
                        }
                    } else {    //for the last column insert the remove icon

                        var tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = '<button type="button" class="btn btn-danger btn-rounded btn-sm my-0" onclick="removeRow(this)">Remove';
                    }
                }
            }
        }
        //add the created table to a container
        let divContainer = document.getElementById("dbTable");
        divContainer.innerHTML = "";
        //add table to div that should contain it
        divContainer.appendChild(table);
        //change height of dataDisplay div based on height of table added to it
        document.getElementById("dataDisplay").style.height = "calc(" + document.getElementsByTagName("table")[0].clientHeight.toString() + "px + 12vh + 12vw";
        //remove the temporary text that said to submit something
        document.getElementById("tempDataText").innerText = "";
        // table.setAttribute("class", "table table-striped");
        table.setAttribute("data-aos", "fade-in");
        table.addEventListener("onfocusout", (function(){
            for (var row = 0; row < table.rows.length; row++){
                for(var col = 0; col < table.rows[row].cells.length; col++){
                    alert(table.rows[row].cells[col].innerHTML)
                }
            }
        }));
    });
}



//table editing options
//remove element from table
//and update db
function removeRow(cellBtn){
    //send delete request to server
    //send over a row number, and server will fin that row and delete it from json
    fetch('/deleteData', {
        method: 'POST',
        body: cellBtn.parentNode.parentNode.rowIndex
    })
    document.getElementById("table-list").deleteRow(cellBtn.parentNode.parentNode.rowIndex);
}


//will send index of modified data and the modified data to db to change
function userModify(tabCell) {
    //sending over array of  {rowNo, keyword, info}
    console.log(tabCell.parentNode)
    var cellIdx = tabCell.cellIndex;
    var key = "";
    switch (cellIdx) {
        case 0:
            key = "firstname";
            break;
        case 1:
            key = "placeFrom";
            break;
        case 2:
            key = "placeTo";
            break;
        case 3:
            key = "mode";
            break;
        case 4:
            key = "return";
            break;
        default: key = "na";
    }
    console.log(cellIdx)
    var data = [
        tabCell.parentNode.rowIndex,
        key,
        tabCell.innerHTML
    ];
    fetch('/userModify', {
        method: 'POST',
        body: data
    })

}



//calculating flight distance using the Haversine formula
//never got geolocation to work so never put it to good use :(
function calculateFlightDistance(placeFrom, placeTo){
    var geocoder = new google.maps.Geocoder();
    //getting lat long of placeFrom
    //they're arrays where the first element is latitude and the second is longtitude
    var latLongFrom = getLatLong(geocoder, placeFrom);
    var latLongTo = getLatLong(geocoder, placeTo);

    console.log("lat long from " + latLongFrom);
    console.log("lat long to " + latLongTo);

    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(latLongTo[0] - latLongFrom[0]);
    var dLong = rad(latLongTo[1] - latLongFrom[1]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(placeFrom[0])) * Math.cos(rad(placeTo[0])) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d/1000; // returns the distance in kilometers
}

var rad = function(x) {
    return x * Math.PI / 180;
};

function getLatLong(geocoder, aplace){
    geocoder.geocode({
            "placeId": aplace
        },
        function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    return results[0].geometry.location;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
}
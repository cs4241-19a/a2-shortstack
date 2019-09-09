const TableManager = {
    createTable: function(eventDetails) {
        console.log("Received " + eventDetails);
        const parsedEventDetails = JSON.parse(eventDetails);
        const eventTable = document.getElementById("eventTable");
        const eventName = document.getElementById("eventName");
        eventName.innerHTML = parsedEventDetails.eventName;
        const HOURS = parsedEventDetails.endTime - parsedEventDetails.startTime;
        const DAYS = parsedEventDetails.potentialDates; 
        // Create Table header
        eventTable.appendChild(this.createHeaderRow(DAYS));
        // Create Table Body
        for (let i = 0; i < HOURS; i++) {
            eventTable.appendChild(this.createRow(DAYS, parseFloat(parsedEventDetails.startTime) + i, parsedEventDetails.participants, i + 1));
        }
        // Create Callbacks for cell clicks
        this.generateCellCallbacks(eventTable, this.currentUserAvailability);
    },
    createRow: function(days, currentTime, participants, row) {
        const nextRow = document.createElement("tr");
        for (let i = 0; i < days.length; i++) {
            const nextCol = document.createElement("td");
            const cellData = this.getCellData(participants, row, i);
            nextCol.innerHTML = currentTime + ":00 " + cellData.available + "/" + cellData.total;
            nextCol.style.backgroundColor = "rgb(30, 100, 2, " + cellData.alphaValue + ")";
            nextRow.appendChild(nextCol);   
        }
        return nextRow;
    },
    createHeaderRow: function(days) {
        const nextRow = document.createElement("tr");
        for (let i = 0; i < days.length; i++) {
            const headerTag = document.createElement("th");
            headerTag.innerHTML = days[i].split("T")[0];
            nextRow.appendChild(headerTag);
        }
        return nextRow;
    },
    generateCellCallbacks: function(table, availability) {
        const row = table.rows;
        for (let i = 1; i < row.length; i++) {
            for (let j = 0; j < row[i].cells.length; j++) {
                row[i].cells[j].addEventListener('click', function () {
                    if (this.style.backgroundColor == "green") {
                        this.style.backgroundColor = "";
                        for (let x = 0; x < availability.length; x++) {
                            if (availability[x][0] === i && availability[x][1] === j) {

                                availability.splice(x, 1);
                            }
                        }
                    } else {
                        this.style.backgroundColor = "green";
                        availability.push([i, j]);
                    }
                });
            }
        }
    },
    getCellData: function(participants, x, y) {
        const length = participants.length;
        let availabilePeople = 0;
        for (const person in participants) {
            for (const time of participants[person].availability) {
                if (time[0] === x && time[1] === y) {
                    availabilePeople += 1
                }
            }
        }
        let alpha = (availabilePeople / length) * 0.5 + .5;
        if (availabilePeople == 0) alpha = 0;
        return {
            "alphaValue": alpha,
            "total": length,
            "available": availabilePeople
        };
    },
    currentUserAvailability: [
    ]
};

const EventDetails = {
    getDetails: function() {
        const URL = window.location.href;
        if (URL.indexOf("?") <= -1) {
            console.log("Can't find params")
            return;
        } 
        const parsedURL = URL.split("?");
        const requestURL = "/events/" + parsedURL[1] + ".json";
        const request = new XMLHttpRequest();
        request.open("GET", requestURL);
        request.send();
        
        request.onreadystatechange = (e) => {
            if (request.readyState === 4 && request.status === 200) {
                TableManager.createTable(request.responseText);
            }
        }
    },
    buildJSON: function(availability, name, eventID) {
        const type = "update";
        const json = {
            "type": type,
            "eventID": eventID,
            "name": name,
            "availability": availability 
        };
        return  json;
    },
    updateDetails: function() {
        const availability = TableManager.currentUserAvailability;
        let name = document.getElementById("userName").value;
        const URL = window.location.href;
        const parsedURL = URL.split("?");
        if (name == null) name = "";
        const json = this.buildJSON(availability, name, parsedURL[1]);
        const body =  JSON.stringify(json);
        console.log(body);

        fetch('/updateEvent', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body
        }).then ( function (response) {
            console.log(response);
        });
    }
}
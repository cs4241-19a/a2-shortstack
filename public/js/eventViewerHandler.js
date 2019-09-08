const TableManager = {
    createTable: function(eventDetails) {
        console.log("Received " + eventDetails);
        const parsedEventDetails = JSON.parse(JSON.parse(eventDetails));
        const eventTable = document.getElementById("eventTable");
        const eventName = document.getElementById("eventName");
        eventName.innerHTML = parsedEventDetails.eventName;
        const HOURS = parsedEventDetails.endTime - parsedEventDetails.startTime;
        const DAYS = parsedEventDetails.potentialDates; 
        // Create Table header
        eventTable.appendChild(this.createHeaderRow(DAYS));
        // Create Table Body
        for (let i = 0; i < HOURS; i++) {
            eventTable.appendChild(this.createRow(DAYS, parseFloat(parsedEventDetails.startTime) + i));
        }

        // Create Callbacks for cell clicks
        this.generateCellCallbacks(eventTable);
    },
    createRow: function(days, currentTime) {
        const nextRow = document.createElement("tr");
        for (let i = 0; i < days.length; i++) {
            const nextCol = document.createElement("td");
            nextCol.innerHTML = currentTime + ":00";
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
    generateCellCallbacks: function(table) {
        const row = table.rows;
        for (let i = 0; i < row.length; i++) {
            for (let j = 0; j < row[i].cells.length; j++) {
                row[i].cells[j].addEventListener('click', function () {
                    console.log('clicked on (' + i + "," + j + ")");
                    if (this.style.backgroundColor == "green") {
                        this.style.backgroundColor = "";
                    } else {
                        this.style.backgroundColor = "green";
                    }
                })
            }
        }
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
    }
}
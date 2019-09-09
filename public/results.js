function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key in data[0]) {
        if (Object.prototype.hasOwnProperty.call(data[0], key)) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
}

function fillTable(table, data) {
    console.log("Filling with data: ", data);
    let tbody = table.createTBody();
    data.forEach(function (item) {
        console.log(item);
        let row = tbody.insertRow();
            for (let key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    // console.log(key, ": ", item[key]);
                    let th = document.createElement("td");
                    let text = document.createTextNode(item[key]);
                    th.appendChild(text);
                    row.appendChild(th);
                }
            }
    });
}

window.onload = function () {
    const button = document.querySelector('#submissionButton');
    button.onclick = goToSubmission;
    updateContentLabel();
};


const goToSubmission = function(){
    const url = window.location;
    window.location.href = url.protocol + "//" + url.host + "/index.html";
};


let table = document.querySelector("table");

const getUrl = window.location;
const baseUrl = getUrl.protocol + "//" + getUrl.host + "/get-results";
console.log("url: ", baseUrl);
fetch(baseUrl)
    .then(function (data) {
        data.text().then(function (data) {
            console.log(data);
            let json = JSON.parse(data);
            generateTableHead(table, json);
            fillTable(table, json);
        });
    })
    .catch(function (error) {
        // If there is any error you will catch them here
    });

// client.get(baseUrl, function (response) {
//     let data = JSON.parse(response);
//     console.log(data);
// });



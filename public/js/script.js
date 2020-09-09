"use strict";

const submitButton = document.getElementById("submit-button");

const updateData = async () => {
	fetch("/api/data", {
		method: "GET",
	}).then((res) => {
		return res.json();
	}).then((data) => {
		formatDataAsTable(data);
	});
}

window.addEventListener("load", updateData);

window.setInterval(updateData, 10000);

document.getElementById("submit-button").addEventListener("click", (evt) => {
	evt.preventDefault();

	const fNameField = document.getElementById("f-name");
	const lNameField = document.getElementById("l-name");
	const body = JSON.stringify({name: `${fNameField.value} ${lNameField.value}`, test: "testing"});

	fetch("/submit", {
		method: "POST",
		body,
	}).then((res) => {
		console.log(res);
		updateData();
		fNameField.value = "";
		lNameField.value = "";
	});

	return false;
});
 
const formatDataAsTable = (data) => {
	let keys = [];

	data.forEach(row => {
		for (let key in row) {
			if (!keys.includes(key)) {
				keys.push(key);
			}
		}
	});
	
	const table = document.createElement("table");
	let tableRow = table.insertRow(-1);

	keys.forEach(key => {
		let tableHeader = document.createElement("th");
		tableHeader.innerHTML = key.slice(0, 1).toUpperCase() + key.slice(1);
		tableRow.appendChild(tableHeader);
	});

	data.forEach(row => {
		tableRow = table.insertRow(-1);
		keys.forEach(key => {
			let cell = tableRow.insertCell(-1);
			cell.innerHTML = row[key];
		});
	});

	const dataContainer = document.getElementById("data-container");
	dataContainer.innerHTML = "";
	dataContainer.appendChild(table);
}
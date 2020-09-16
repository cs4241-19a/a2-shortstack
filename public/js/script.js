"use strict";

const updateData = async () => {
	const res = await fetch("/api/users", {method: "GET"});
	const data = await res.json();
	formatDataAsTable(data);
}

window.addEventListener("load", updateData);
window.setInterval(updateData, 10000);

document.getElementById("submit-button").addEventListener("click", async (evt) => {
	evt.preventDefault();

	const fName = document.getElementById("f-name");
	const lName = document.getElementById("l-name");
	const email = document.getElementById("email");
	const dob = document.getElementById("dob");
	const body = JSON.stringify({name: `${fName.value} ${lName.value}`, email: email.value, dob: dob.value});

	const res = await fetch("/api/users", {method: "POST", body});
	if (res) {
		const data = await res.json();
		formatDataAsTable(data);
		fName.value = "";
		lName.value = "";
		email.value = "";
		dob.value = "";
	}

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
	table.className = "table";
	let tableRow = table.insertRow(-1);

	keys.forEach(key => {
		const tableHeader = document.createElement("th");
		tableHeader.innerHTML = key.slice(0, 1).toUpperCase() + key.slice(1);
		tableRow.appendChild(tableHeader);
	});

	if (keys.length > 0) {
		const editHeader = document.createElement("th");
		editHeader.innerHTML = "Edit";
		tableRow.appendChild(editHeader);

		const deleteHeader = document.createElement("th");
		deleteHeader.innerHTML = "Delete";
		tableRow.appendChild(deleteHeader);
	}

	data.forEach(row => {
		tableRow = table.insertRow(-1);
		keys.forEach(key => {
			const cell = tableRow.insertCell(-1);
			const value = row[key];
			cell.innerHTML = value != null ? value : "null";
		});
		
		if (keys.length > 0) {
			const editCell = tableRow.insertCell(-1);
			editCell.style="text-align: center"
			const editButton = document.createElement("input");
			editButton.type = "button";
			editButton.className = "btn btn-secondary";
			editButton.value = "Edit";
			editButton.style="border-radius: 8px";
			editCell.appendChild(editButton);
			editButton.onclick = () => editUser(data[editCell.parentNode.rowIndex - 1]);
			
			const deleteCell = tableRow.insertCell(-1);
			deleteCell.style="text-align: center"
			const deleteButton = document.createElement("input");
			deleteButton.type = "button";
			deleteButton.className = "btn btn-danger";
			deleteButton.value = "X";
			deleteButton.style="border-radius: 8px";
			deleteCell.appendChild(deleteButton);
			deleteButton.onclick = () => deleteUser(data[deleteCell.parentNode.rowIndex - 1]);
		}
	});

	const dataContainer = document.getElementById("data-container");
	if (keys.length > 0) {
		dataContainer.innerHTML = "";
		dataContainer.appendChild(table);
	} else {
		dataContainer.innerHTML = "No users";
	}
}

const editUser = async ({id}) => {
	if (id) {
		const params = new URLSearchParams({id});
		//TODO
		const body = null;
		const res = await fetch(`/api/users?${params}`, {method: "PATCH"}, body);
		if (res) {
			const data = await res.json();
			formatDataAsTable(data);
		}
	}
}

const deleteUser = async ({id}) => {
	if (id) {
		const params = new URLSearchParams({id});
		const res = await fetch(`/api/users?${params}`, {method: "DELETE"});
		if (res) {
			const data = await res.json();
			formatDataAsTable(data);
		}
	}
}
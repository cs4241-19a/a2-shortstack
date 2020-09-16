"use strict";

let isUserBeingEdited = false;

const updateData = async () => {
	const res = await fetch("/api/users", {method: "GET"});
	const data = await res.json();
	formatDataAsTable(data);
}

window.addEventListener("load", updateData);
window.setInterval(() => {
	if (!isUserBeingEdited) {
		updateData();
	}
}, 10000);

document.getElementById("submit-button").addEventListener("click", async (evt) => {
	evt.preventDefault();
	addUser();
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
			if (cell.cellIndex !== 0 && cell.cellIndex !== 4) {
				cell.className = "editable-cell";
			}
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
			editButton.onclick = () => handleUserEditing(data, editButton, editCell.parentNode);
			
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

const handleUserEditing = (data, editButton, row) => {
	isUserBeingEdited = !isUserBeingEdited;
	row.childNodes.forEach(childNode => {
		if (childNode.className === "editable-cell") {
			childNode.contentEditable = isUserBeingEdited;
		}
	});
	if (isUserBeingEdited) {
		editButton.value = "Submit";
	} else {
		editButton.value = "Edit";
		const name = row.cells[1].innerHTML;
		const email = row.cells[2].innerHTML;
		const dob = row.cells[3].innerHTML;
		const editedUser = {...data[row.rowIndex - 1], name, email, dob};
		editUser(editedUser);
	}
}

const addUser = async () => {
	const fName = document.getElementById("f-name");
	const lName = document.getElementById("l-name");
	const email = document.getElementById("email");
	const dob = document.getElementById("dob");

	if (fName.value == "" || lName.value == "" || email.value == "" || dob.value == "") {
		alert("Please fill out the required fields!");
	} else {
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
	}
}

const editUser = async (editedUser) => {
	const {id, name, email, dob} = editedUser;
	if (id) {
		const params = new URLSearchParams({id});
		const body = JSON.stringify({name, email, dob});
		const res = await fetch(`/api/users?${params}`, {method: "PATCH", body});
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

window.addEventListener('load', function() {
    const forms = document.getElementsByClassName("needs-validation");
		const validation = Array.prototype.filter.call(forms, (form) => {
		form.addEventListener("submit", function(evt) {
			if (form.checkValidity() === false) {
			evt.preventDefault();
			evt.stopPropagation();
			}
			form.classList.add('was-validated');
		}, false);
	});
}, false);
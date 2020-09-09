document.getElementById("submit-button").addEventListener("click", (evt) => {
	evt.preventDefault();

	const body = JSON.stringify({name: document.getElementById("f-name").value + " " + document.getElementById("l-name").value});

	fetch("/submit", {
		method: "POST",
		body,
	}).then((res) => {
		console.log(res);
		window.location.replace(window.location.href);
	});

	return false;
});
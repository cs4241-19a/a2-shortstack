const submit = function() {
    // Getting form info
    form = document.getElementById("form")
    name = form.elements[0].value
    job = form.elements[1].value
    day = form.elements[2].value

    // Sending XMLHttp request with data
    data = {"name": name, "job": job, "day": day}
    var req = new XMLHttpRequest()
    req.open("POST", "/", true)
    req.send(data)
}

const reset = function() {
    data = {"name": "reset", "job": "none", "day": form.elements[2].value}
    var req = new XMLHttpRequest()
    req.open("POST", "/", true)
    req.send(data)
}

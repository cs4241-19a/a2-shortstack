const submit = function (e) {
        e.preventDefault()
        const inputText = document.getElementById( 'inputAssignment' ).value
        const inputDate = document.getElementById( 'inputDate' ).value
        const json = {Note: inputText, Date: inputDate}
        const body = JSON.stringify(json)
        fetchJson.post('/submit', json)
            .then(handleData)
            .catch(console.error)
}
function refresh(){
    fetchJson.post('/refresh', {})
        .then(handleData)
        .catch(console.error)
}
const handleData = function (data) {
        const myNode = document.getElementById("notesContainer");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        data.forEach(function(item, index, array){
            let note = document.createElement("li")
            note.innerHTML = item.Note + " due: " + item.Date + " days: " + item.Days
            if(item.Days <=5){
                note.className = "list-group-item list-group-item-danger"
            } else {
                note.className = "list-group-item list-group-item-success"
            }
            document.getElementById("notesContainer").appendChild(note)
        })
}
function createDate(date){
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dateArray = date.split('-')
        return new Date(dateArray[0], dateArray[1]-1, dateArray[2]).toLocaleDateString("en-US", options)
}
window.onload = function () {
        const addButton = document.getElementById("add")
        addButton.onclick = submit
}
document.onload = refresh()
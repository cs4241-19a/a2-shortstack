const submit = function (e) {
        e.preventDefault()
        const inputText = document.getElementById( 'inputAssignment' ).value
        const inputDate = document.getElementById( 'inputDate' ).value
        const json = {Note: inputText, Date: inputDate}
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
        let id = 1;
        data.forEach(function(item, index, array){
            let note = document.createElement("li")
            note.innerHTML = createInnerHTML(item, id)
            id++
            note = setClassName(note, item)
            document.getElementById("notesContainer").appendChild(note)
        })
}
function setClassName(note, item){
    if(item.Days <=5){
        note.className = "list-group-item d-flex list-group-item-danger justify-content-between"
    } else {
        note.className = "list-group-item d-flex list-group-item-success justify-content-between"
    }
    return note
}
function createInnerHTML(item, id){
    return  "<p class='p-0 m-0 flex-grow-1'>" +
            item.Note +
            " due: " + item.Date + 
            " days: " + item.Days +
            "</p>" +
            "<button class='btn-success edit-item-" + id + "'  onClick='editItem("+id+")'>edit</button>" + 
            "<button class='btn-danger delete-item-" + id + "' onClick='deleteItem("+id+")'>delete</button>"
}
function editItem(id){
    console.log("inside edit for " + id)
}
function deleteItem(id){
        const json = {Item: id}
        fetchJson.post('/delete', json)
            .then(handleData)
            .catch(console.error)
        refresh()
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
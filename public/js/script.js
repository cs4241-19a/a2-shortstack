const submit = function (e) {
    e.preventDefault()
    const inputText = $( '#inputAssignment' ).val()
    const inputDate = $( '#inputDate' ).val()
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
    $( "#notesContainer" ).empty()
    let id = 1;
    data.forEach(function(item, index, array){
        let note = document.createElement("li")
        note.innerHTML = createInnerHTML(item, id)
        note = setClassName(note, item, id)
        id++
        $("#notesContainer").append(note)
    })
}
function setClassName(note, item, id){
    if(item.Days <=5){
        note.className = "list-group-item d-flex list-group-item-danger item-" + id + " justify-content-between"
    } else {
        note.className = "list-group-item d-flex list-group-item-success item-" + id + " justify-content-between"
    }
    return note
}
function createInnerHTML(item, id){
    return  "<p class='p-0 m-0 flex-grow-1' id='item-" + id + "'>" +
        item.Note +
        " due: " + item.Date + 
        " days: " + item.Days +
        "</p>" +
        "<button class='btn btn-success mr-1' onClick='editItem("+id+")'>edit</button>" + 
        "<button class='btn btn-danger' onClick='deleteItem("+id+")'>delete</button>"
}
function editItem(id){
    let elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + "item-"+id + ' ')
           > -1) {
            elems[i].innerHTML = createInnerEditHTML(id);
        }
    }
}
function createInnerEditHTML(id){
    return "<input type='text' class='form-control col-4' id='newAssignment-" + id + "' value='" +     getOldAssignmnet(id) + "'>" + 
        "<input type='date' class='form-control col-4' id='newDate-" + id + "' >" +
        "<button class='btn btn-success col-2' onClick='saveItem("+id+")'>save</button>" +
        "</div"
}
function saveItem(id){
    const newAssignment =  $('#newAssignment-'+id).val()
    const newDate = $('#newDate-'+id).val()
    deleteItem(id)
    const json = {Note: newAssignment, Date: newDate}
    fetchJson.post('/submit', json)
        .then(handleData)
        .catch(console.error)
    
}
function getOldAssignmnet(id){
    let innerHTML = $('#item-' + id).html() 
    console.log(innerHTML)
    return innerHTML.split("due:",1)
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
    $("#add").click(submit)
}
document.onload = refresh()
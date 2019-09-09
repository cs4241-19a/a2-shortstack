const editList = function( e ) {
    e.preventDefault()
    console.log("yeee")

    var n = localStorage.getItem('myName')
    var b = localStorage.getItem('myBoard')

    const listName = document.querySelector( '#listNameEdit'),
        json = { name: n, Board: b, listNameEdit: listName.value},
        body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            console.log( "post response: ", response )
            return false
        }). then (function () {
        fetch('/receive')
            .then(function (response) {
                return response.json();
            }).then(function (response) {
            var n = localStorage.getItem('myName')
            var b = localStorage.getItem('myBoard')
            console.log(n)
            console.log(Object.keys(response.users).length)
            document.getElementById('nav').style.backgroundColor = response.users[n][b].color;
            document.getElementById('bName').innerText = JSON.stringify(response.users[n][b].boardName).replace(/^"(.*)"$/, '$1');
            document.getElementById('usrTxt').innerText = JSON.stringify(response.users[n][b].username).replace(/^"(.*)"$/, '$1');
            document.getElementById('listTextH').innerText = JSON.stringify(response.users[n][b].lists[1].listname).replace(/^"(.*)"$/, '$1');
            console.log("get response: ", response)
        })
    });

    return true
}






const add = function( e ) {
    e.preventDefault()
    console.log("yoooooooo")


    var n = localStorage.getItem('myName')
    var b = localStorage.getItem('myBoard')
    var tn = localStorage.getItem('taskNumber')

    console.log(tn)

    var taskno = parseInt(tn) + 1;
    localStorage.setItem('taskNumber', taskno.toString())

    const task = document.querySelector( '#listEleAdd'),
        taskDesc = document.querySelector( '#listEleDesc'),
        due = document.querySelector( '#listEleDue'),
        json = { name: n, Board: b, taskName: task.value, taskDes: taskDesc.value, dueDate: due.value, taskNum: taskno.toString() },
        body = JSON.stringify( json )

        console.log(localStorage.getItem('taskNumber'))

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            console.log( "post response: ", response )
            return false
        }). then (function () {
        fetch('/receive')
            .then(function (response) {
                return response.json();
            }).then(function (response) {
            var n = localStorage.getItem('myName')
            var b = localStorage.getItem('myBoard')
            console.log(n)
            console.log(Object.keys(response.users).length)
            document.getElementById('nav').style.backgroundColor = response.users[n][b].color;
            document.getElementById('bName').innerText = JSON.stringify(response.users[n][b].boardName).replace(/^"(.*)"$/, '$1');
            document.getElementById('usrTxt').innerText = JSON.stringify(response.users[n][b].username).replace(/^"(.*)"$/, '$1');
            document.getElementById('listTextH').innerText = JSON.stringify(response.users[n][b].lists[1].listname).replace(/^"(.*)"$/, '$1');
            console.log("get response: ", response)
        })
    });

    return true
}


const back = function( e ) {
    e.preventDefault()
    window.location = "/"
    return false
}

window.onload = function() {
    fetch( '/receive')
        .then( function( response ) {
           return response.json();
        }).then(function (response){
        var n = localStorage.getItem('myName')
        var b = localStorage.getItem('myBoard')
        console.log(n)
        console.log(response)
        localStorage.setItem('taskNumber', JSON.stringify(response.users[n][b].lists[1].taskNums).replace(/^"(.*)"$/, '$1'));
        document.getElementById('nav').style.backgroundColor = response.users[n][b].color;
        document.getElementById('bName').innerText = JSON.stringify(response.users[n][b].boardName).replace(/^"(.*)"$/, '$1');
        document.getElementById('usrTxt').innerText = JSON.stringify(response.users[n][b].username).replace(/^"(.*)"$/, '$1');
        document.getElementById('listTextH').innerText = JSON.stringify(response.users[n][b].lists[1].listname).replace(/^"(.*)"$/, '$1');
        console.log( "get response: ", response )
    })

    const button1 = document.getElementById( 'doneBtn' )
    button1.onclick = editList

    const button2 = document.getElementById( 'addBtn' )
    button2.onclick = add

    const button = document.getElementById( 'logoutBtn' )
    button.onclick = back
};
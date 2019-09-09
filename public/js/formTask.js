const editList = function( e ) {
    e.preventDefault()

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

            var t = parseInt(localStorage.getItem('taskNumber'));

            for(var f = 0; f < 10000; f++){}

            var str = '<ul style="list-style: none" >';
            for(var i = 1; i <= t; i++) {
                var ref = response.users[n][b].lists[1].tasks[i];
                if(ref !== null) {
                    var col1 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskName).replace(/^"(.*)"$/, '$1')
                    var col2 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDesc).replace(/^"(.*)"$/, '$1')
                    var col3 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDue).replace(/^"(.*)"$/, '$1')
                    str += '<li>'+ '<a class="task1">' + '<br>' + i + '. ' + col1 + ':' + '</br>' + '</a>' + '<a class="task2">' + '<b> Task Desc: </b>' + col2 + '<br>' + '</a>' + '<a class="task3">' + '<b> Due By: </b>' + col3 + '</a>' + '</li>';

                }
            }
            str += '</ul>';
            document.getElementById("tasks").innerHTML = str;
        })
    });
    return true
}

const editTask = function( e ) {
    e.preventDefault()

    var n = localStorage.getItem('myName')
    var b = localStorage.getItem('myBoard')

    const taskN = document.querySelector( '#listEleEditM'),
        taskNam = document.querySelector( '#listEleEditN'),
        taskDe = document.querySelector( '#listEleEditD'),
        taskDu = document.querySelector( '#listEleEditT'),
        json = { name: n, Board: b, taskNum: taskN.value, taskName: taskNam.value, taskDes: taskDe.value, dueDate: taskDu.value, diff: 'yes'},
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

            var t = parseInt(localStorage.getItem('taskNumber'));

            for(var f = 0; f < 10000; f++){}

            var str = '<ul style="list-style: none" >';
            for(var i = 1; i <= t; i++) {
                var ref = response.users[n][b].lists[1].tasks[i];
                if(ref !== null) {
                    var col1 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskName).replace(/^"(.*)"$/, '$1')
                    var col2 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDesc).replace(/^"(.*)"$/, '$1')
                    var col3 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDue).replace(/^"(.*)"$/, '$1')
                    str += '<li>'+ '<a class="task1">' + '<br>' + i + '. ' + col1 + ':' + '</br>' + '</a>' + '<a class="task2">' + '<b> Task Desc: </b>' + col2 + '<br>' + '</a>' + '<a class="task3">' + '<b> Due By: </b>' + col3 + '</a>' + '</li>';

                }
            }
            str += '</ul>';
            document.getElementById("tasks").innerHTML = str;
        })
    });
    return true
}

const delTask = function( e ) {
    e.preventDefault()
    console.log("yuyuyuyu")

    var n = localStorage.getItem('myName')
    var b = localStorage.getItem('myBoard')

    const delTaskN = document.querySelector( '#listEleDel'),
        json = { name: n, Board: b, taskNum: delTaskN.value, diff: 'yes', defDiff: 'yes' },
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

            var t = parseInt(localStorage.getItem('taskNumber'));

            for(var f = 0; f < 10000; f++){}

            var str = '<ul style="list-style: none" >';
            for(var i = 1; i <= t; i++) {
                var ref = response.users[n][b].lists[1].tasks[i];
                if(ref !== null) {
                    var col1 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskName).replace(/^"(.*)"$/, '$1')
                    var col2 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDesc).replace(/^"(.*)"$/, '$1')
                    var col3 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDue).replace(/^"(.*)"$/, '$1')
                    str += '<li>'+ '<a class="task1">' + '<br>' + i + '. ' + col1 + ':' + '</br>' + '</a>' + '<a class="task2">' + '<b> Task Desc: </b>' + col2 + '<br>' + '</a>' + '<a class="task3">' + '<b> Due By: </b>' + col3 + '</a>' + '</li>';

                }
            }
            str += '</ul>';
            document.getElementById("tasks").innerHTML = str;
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
        document.getElementById('name2').innerText = JSON.stringify(response.users[n][b].fullname).replace(/^"(.*)"$/, '$1');
        document.getElementById('emailId2').innerText = JSON.stringify(response.users[n][b].email).replace(/^"(.*)"$/, '$1');
        document.getElementById('listTextH').innerText = JSON.stringify(response.users[n][b].lists[1].listname).replace(/^"(.*)"$/, '$1');


        var t = parseInt(localStorage.getItem('taskNumber'));

        var str = '<ul style="list-style: none" >';
        for(var i = 1; i <= t; i++) {
            var ref = response.users[n][b].lists[1].tasks[i];
            if(ref !== null) {
                var col1 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskName).replace(/^"(.*)"$/, '$1')
                var col2 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDesc).replace(/^"(.*)"$/, '$1')
                var col3 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDue).replace(/^"(.*)"$/, '$1')
                str += '<li>'+ '<a class="task1">' + '<br>' + i + '. ' + col1 + ':' + '</br>' + '</a>' + '<a class="task2">' + '<b> Task Desc: </b>' + col2 + '<br>' + '</a>' + '<a class="task3">' + '<b> Due By: </b>' + col3 + '</a>' + '</li>';

            }
        }
        str += '</ul>';
        document.getElementById("tasks").innerHTML = str;
        console.log( "get response: ", response )
    })

    const button1 = document.getElementById( 'doneBtn' )
    button1.onclick = editList

    const button2 = document.getElementById( 'addBtn' )
    button2.onclick = add

    const button3 = document.getElementById( 'editBtn' )
    button3.onclick = editTask

    const button4 = document.getElementById( 'delBtn' )
    button4.onclick = delTask

    const button = document.getElementById( 'logoutBtn' )
    button.onclick = back



};
const exit = function( e ) {
    e.preventDefault();
    window.location = "/";
    return false
}


window.onload = function() {
    fetch( '/receive')
        .then( function( response ) {
            return response.json();
        }).then(function (response){

        var str = '<ul style="list-style: none" >';
            for(var n in response.users) {
                str += '<li>' + 'Username: ' + JSON.stringify(n).replace(/^"(.*)"$/, '$1') + '</li>';
                for(var b in response.users[n]) {


                    str += '<li>' + 'Board Name: ' + JSON.stringify(b).replace(/^"(.*)"$/, '$1') + '</li>';
                    str += '<li>' + 'Email: ' + JSON.stringify(response.users[n][b].email).replace(/^"(.*)"$/, '$1') + '</li>';
                    str += '<li>' + 'Email: ' + JSON.stringify(response.users[n][b].fullname).replace(/^"(.*)"$/, '$1') + '</li>';
                    str += '<li>' + 'Email: ' + JSON.stringify(response.users[n][b].color).replace(/^"(.*)"$/, '$1') + '</li>';


                    var t = parseInt(JSON.stringify(response.users[n][b].lists[1].taskNums).replace(/^"(.*)"$/, '$1'));
                    str += '<li>' + 'List Name: ' + JSON.stringify(response.users[n][b].lists[1].listname).replace(/^"(.*)"$/, '$1') + '</li>';
                    str += '<li>' + 'Number of Tasks: ' + t + '</li>';


                    for(var i = 1; i <= t; i++) {
                        var ref = response.users[n][b].lists[1].tasks[i];
                        if(ref !== null) {
                            var col1 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskName).replace(/^"(.*)"$/, '$1')
                            var col2 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDesc).replace(/^"(.*)"$/, '$1')
                            var col3 = JSON.stringify(response.users[n][b].lists[1].tasks[i].taskDue).replace(/^"(.*)"$/, '$1')
                            str += '<li>'+ '<a class="task1">' + '<br>' + i + '. ' + col1 + ':' + '</br>' + '</a>' + '<a class="task2">' + '<b> Task Desc: </b>' + col2 + '<br>' + '</a>' + '<a class="task3">' + '<b> Due By: </b>' + col3 + '</a>' + '</li>';
                        }
                    }
                    str += '<li>' + '<br>' + '</li>';
                    str += '<li>' + '<br>' + '</li>';
                }
                str += '<li>' + '<br>' + '</li>';
                str += '<li>' + '<br>' + '</li>';
                str += '<li>' + '<br>' + '</li>';
            }
        str += '</ul>';
        document.getElementById("database").innerHTML = str;
        console.log( "get response: ", response )
    })
    const button = document.getElementById('exitBtn')
    button.onclick = exit
}
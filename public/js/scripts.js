let d = new Date();
let date = d.toString().slice(4, 15);

const publish = function (e) {

    e.preventDefault()

    const name = document.querySelector('#name').value,
        title = document.querySelector('#title').value,
        message = document.querySelector('#message').value


        const json = {
                'name': name,
                'title': title,
                'message': message,
                'date': date
            },

            body = JSON.stringify(json)

        fetch('/publish', {
            method: 'POST',
            body 
        }).then(function (response) {
          showData();
        })

        
        return false
    }

const updateRow = function (index) {
    let updateName = document.getElementById('#name'+index).value
    let updateTitle= document.getElementById('#title'+index).value
    let updateMessage = document.getElementById('#message'+index).value

    if(updateName === '') {
        updateName = '(Redacted)'
    }
    if(updateTitle === '') {
        updateTitle = '(Redacted)'
    }
    if(updateMessage === '') {
      updateMessage = '(Redacted)'
    }

    const json = {
        'name': updateName,
        'title': updateTitle,
        'message': updateMessage,
        'date': date
    }

    const body = JSON.stringify(json)
    fetch('/update', {
        method: 'POST',
        body
    }).then(function(response){
        showData()
    })
}

const genPost = function (data) {
    let container = document.querySelector('#posts');
    container.innerHTML += 
      '<div class="blog-post-thumb"><div class="blog-post-title"><h3>'+ data.title + '</h3></div><div class="blog-post-format"><span>'+ data.name + '</span><span><i class="fa fa-date"></i>' + data.date + '</span></div><div class="blog-post-des"><p>'+ data.message + '</p></div><a class="btn btn-default" onclick="updateRow()"">Edit</a><a class="btn btn-default" onclick="deleteRow()"">Delete</a> </div>';
}

const deleteRow = function (index) {
    const rowData = {rowData: index};
    const body = JSON.stringify(rowData);
    fetch('/delete', {
        method: 'POST',
        body
    }).then(function(response){
        showData();
    })
};

const showData = function () {
    fetch('/reqdata', {
        method: 'GET'
    }).then(function(response) {
        return response.json()
    }).then(function (reqdata) {
        genPost(reqdata)
    })
}

window.onload = function () {
    const button = document.querySelector('#submit')
    button.onclick = publish
}
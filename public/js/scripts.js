const submit = function (e) {
    e.preventDefault()

    const model = document.querySelector('#model')
    const year = document.querySelector('#year')
    const mpg = document.querySelector('#mpg')

    const json = {
        model: model.value,
        year: parseInt(year.value),
        mpg: parseInt(mpg.value)
    }
    const body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(function (response) {
            // do something with the reponse 
            console.log(response)
            console.log(response.url)
        })

    return false
}

window.onload = function () {
    const submitBtn = document.querySelector('#submit')

    submitBtn.onclick = submit
}
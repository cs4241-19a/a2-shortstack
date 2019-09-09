// Add some Javascript code here, to run on the front end.
function submitForm(e) {
    // prevent default form action from being carried out
    e.preventDefault()
    let url = '/search'
    let q = $("#query").val()
    let types = []
    $("#queryForm input:checked").each((i, v) => {
        types.push(v.value)
    })
    let params = $.param({
        q: q,
        type: types.filter(Boolean).join(",")
    })
    fetch(`/search?${params}`, {
            headers: {
                'Authorization': 'Bearer ' + Cookies.get("spotify_access_token")
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if ('error' in data) {
                alert("Please Log in");
                return;
            }
            $('.results-table tbody').remove()
            $('.results-table thead').css('visibility', 'visible')
            let tbody = $('<tbody />').appendTo($('.results-table'))
            for (let track of data.tracks.items) {
                $('<tr>').appendTo(tbody)
                    .append(`<td class="addQueue" data-duration=${track.duration_ms} 
                            data-songid=${track.id}>+</td>`)
                    .append(`<td>${track.name}</td>`)
                    .append(`<td>${track.artists[0].name}</td>`)
                    .append(`<td>${track.album.name}</td>`)
                    .append(`<td align="right">${msToTime(track.duration_ms)}</td>`)
                    .append(`<td style="display: none">${track.id}</td>`)
            }
        }).catch((err) => console.log(err))
    return false;
}

const msToTime = function(ms) {
    return new Date(ms).toISOString().slice(14, -5);
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
}, {});

window.onload = function() {
    document.querySelector('#queryForm').addEventListener('submit', submitForm);
    $(document).on('click', '.addQueue', (e) => {
        let $this = e.target
        let $data = $this.parentNode.children
        fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('spotify_access_token')
                }
            })
            .then((res) => res.json())
            .then((data) => {
                fetch(`/add?id=${$this.getAttribute('data-songid')}
                &title=${$data[1].textContent}
            &artist=${$data[2].textContent}
            &album=${$data[3].textContent}
            &adder=${data.display_name}
            &duration=${$this.getAttribute('data-duration')}`)
                    .then((res) => {
                        if (res.statusCode != 500) {
                            let snackbar = $("#snackbar")
                            snackbar.addClass("show")

                            // After 3 seconds, remove the show class from DIV
                            setTimeout(() => snackbar.removeClass("show"), 3000);
                        }
                    })
            })
    })
}

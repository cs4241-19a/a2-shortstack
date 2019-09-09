window.onload = function() {
    fetch('/queue')
        .then((res) => res.json())
        .then((data) => {
            $('.results-table tbody').remove()
            $('.results-table thead').css('visibility', 'visible')
            let tbody = $('<tbody />').appendTo($('.results-table'))
            for (let track of data) {
                $('<tr>').appendTo(tbody)
                    .append(`<td>${track.title}</td>`)
                    .append(`<td>${track.artist}</td>`)
                    .append(`<td>${track.album}</td>`)
                    .append(`<td align="right">${new Date(track.startTime)}</td>`)
                    .append(`<td style="display: none">${track.id}</td>`)
            }
        })
}

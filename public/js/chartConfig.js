let ctx = document.getElementById('technologies').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['HTML', 'CSS', 'Java', 'JavaScript', 'Ruby', 'Python', 'unit testing'],
        datasets: [{
            backgroundColor: 'rgb(15,101,255)',
            borderColor: 'rgb(000, 000, 000)',
            data: [7, 6, 9, 4, 0, 2, 6]
        }]
    },
    options: {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMax: 10
                }
            }]
        }
    }
});

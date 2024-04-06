const API_KEY = '4194a416a53b41369bf96d38bce926bc';

document.addEventListener('DOMContentLoaded', fetchDataAndCreateChart);

async function fetchDataAndCreateChart() {
    try {
        const response = await fetch(`https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=${API_KEY}`);
        const data = await response.json();

        const chart = 'time-chart';
        const labels = [];
        const values = [];

        const chart2 = 'highest-price-chart';
        const labels2 = [];
        const values2 = [];

        const chart3 = 'average-price-chart';
        const labels3 = [];
        const values3 = [];

        // Extract labels (dates) and values (closing prices) from the API response
        for (const entry of data.values) {
            labels.push(entry.datetime);
            values.push(parseFloat(entry.close));
            labels2.push(entry.datetime);
            values2.push(parseFloat(entry.high));
            labels3.push(entry.datetime);
            values3.push(parseFloat(entry.open));
        }

        createChart(chart, labels, values);
        createChart(chart2, labels2, values2);
        createChart(chart3, labels3, values3);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// const labels = ['women', 'men', 'baby', 'electronics'];
// const values = [90, 45, 81, 30];

// createChart(labels, values);

function createChart(canvasId, labels, values) {
const ctx = document.getElementById(canvasId).getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Sales Data',
            data: values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
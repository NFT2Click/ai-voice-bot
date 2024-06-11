document.addEventListener("DOMContentLoaded", function() {
    // Fetch user stats
    fetch('/api/profiles')
        .then(response => response.json())
        .then(data => {
            const user = data[0]; // Assuming the first user for demonstration
            document.querySelector('.stats .stat:nth-child(1) p').textContent = user.completedQuizzes;
            document.querySelector('.stats .stat:nth-child(2) p').textContent = user.studyHours;
            document.querySelector('.stats .stat:nth-child(3) p').textContent = user.gameScores;
        })
        .catch(error => console.error('Error fetching user profile data:', error));

    // Render progress chart
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Study Hours',
                data: [10, 15, 12, 20, 18, 22, 30],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
});

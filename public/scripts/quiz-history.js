document.addEventListener("DOMContentLoaded", function() {
    const historyList = document.getElementById('historyList');

    function addHistoryItem(date, score, correctAnswers, totalQuestions) {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        const historyDate = document.createElement('h3');
        historyDate.textContent = `Date: ${new Date(date).toLocaleString()}`;
        const historyScore = document.createElement('p');
        historyScore.textContent = `Score: ${score}`;
        const historyCorrectAnswers = document.createElement('p');
        historyCorrectAnswers.textContent = `Correct Answers: ${correctAnswers}`;
        const historyTotalQuestions = document.createElement('p');
        historyTotalQuestions.textContent = `Total Questions: ${totalQuestions}`;

        historyItem.appendChild(historyDate);
        historyItem.appendChild(historyScore);
        historyItem.appendChild(historyCorrectAnswers);
        historyItem.appendChild(historyTotalQuestions);
        historyList.appendChild(historyItem);
    }

    fetch('/api/quiz-history')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(item => {
                    addHistoryItem(item.date, item.score, item.correctAnswers, item.totalQuestions);
                });
            } else {
                console.error('Error: Expected an array of quiz history data.');
            }
        })
        .catch(error => console.error('Error fetching quiz history:', error));
});

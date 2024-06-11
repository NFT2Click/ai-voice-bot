document.addEventListener("DOMContentLoaded", function() {
    const quizForm = document.querySelector('form');
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(quizForm);
        const answers = {};
        formData.forEach((value, key) => {
            answers[key] = value;
        });
        fetch('/api/submit-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Quiz submitted successfully!');
                // Redirect to quiz history or dashboard
            } else {
                alert('There was an error submitting your quiz. Please try again.');
            }
        })
        .catch(error => console.error('Error submitting quiz:', error));
    });
});

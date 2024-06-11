document.addEventListener("DOMContentLoaded", function() {
    console.log("Game script loaded.");
});

function checkGuess() {
    const guess = document.getElementById('guess').value;
    const result = document.getElementById('result');
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (guess == randomNumber) {
        result.textContent = 'Correct! You guessed the number!';
    } else {
        result.textContent = 'Wrong! The correct number was ' + randomNumber;
    }
}

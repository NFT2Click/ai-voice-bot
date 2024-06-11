document.addEventListener("DOMContentLoaded", function() {
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const ws = new WebSocket('ws://localhost:3000');

    function addMessage(sender, text) {
        const message = document.createElement('div');
        message.classList.add(sender);
        message.textContent = text;
        messages.appendChild(message);
    }

    function sendMessage() {
        const text = userInput.value;
        if (text.trim()) {
            addMessage('user', text);
            ws.send(text);
            userInput.value = '';
        }
    }

    ws.onmessage = function(event) {
        addMessage('bot', event.data);
    };

    ws.onopen = function() {
        addMessage('bot', 'Connected to the server');
    };

    ws.onclose = function() {
        addMessage('bot', 'Disconnected from the server');
    };

    document.querySelector('button').addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});

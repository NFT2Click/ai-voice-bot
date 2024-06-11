const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

app.get('/study-materials', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'study-materials.html'));
});

app.get('/quiz-history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz-history.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/api/profiles', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'profiles.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading profiles data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get('/api/quizzes', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'quizzes.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading quizzes data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get('/api/results', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'results.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading results data');
        } else {
            try {
                const resultsData = JSON.parse(data);
                res.json(resultsData);
            } catch (parseError) {
                res.status(500).send('Error parsing results data');
            }
        }
    });
});

app.get('/api/study-materials', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'study-materials.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading study materials data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get('/api/quiz-history', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'results.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading results data');
        }
        try {
            const resultsData = JSON.parse(data);
            if (Array.isArray(resultsData)) {
                res.json(resultsData);
            } else {
                res.status(500).send('Results data is not an array');
            }
        } catch (parseError) {
            res.status(500).send('Error parsing results data');
        }
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users data');
        } else {
            const users = JSON.parse(data);
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                res.json({ success: true, userId: user.id });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }
    });
});

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users data');
        } else {
            const users = JSON.parse(data);
            const existingUser = users.find(u => u.username === username || u.email === email);
            if (existingUser) {
                res.status(400).json({ success: false, message: 'Username or email already exists' });
            } else {
                const newUser = {
                    id: users.length + 1,
                    username,
                    email,
                    password
                };
                users.push(newUser);
                fs.writeFile(path.join(__dirname, 'data', 'users.json'), JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error saving user data');
                    } else {
                        res.json({ success: true });
                    }
                });
            }
        }
    });
});

app.post('/api/submit-quiz', (req, res) => {
    const { answers } = req.body;
    const results = {}; // Logic to calculate results based on answers
    // Example: { correctAnswers: 8, totalQuestions: 10, score: 80 }

    // Save results to `results.json`
    fs.readFile(path.join(__dirname, 'data', 'results.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading results data');
        }
        try {
            const resultsData = JSON.parse(data);
            const newResult = {
                userId: 1, // Placeholder for the actual user ID
                date: new Date().toISOString(),
                ...results
            };
            resultsData.push(newResult);
            fs.writeFile(path.join(__dirname, 'data', 'results.json'), JSON.stringify(resultsData, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Error saving results data');
                }
                res.json({ success: true });
            });
        } catch (parseError) {
            res.status(500).send('Error parsing results data');
        }
    });
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Server: ${message}`);
    });

    ws.send('Welcome to the AI Voice Bot chat!');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

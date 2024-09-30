// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the Express application
const app = express();
app.use(bodyParser.json());

// In-memory array to store user data
const users = [];


const PORT = 3000;


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

   
    switch (true) {
       
        case !name || !email || !password:
            return res.status(400).json({ error: 'All fields are required.' });
        
        case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            return res.status(400).json({ error: 'Invalid input.' });

        
        case password.length < 6:
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });

       
        case users.some(user => user.email === email):
            return res.status(409).json({ error: 'Email already exists.' });

        
        default:
            
            users.push({ name, email, password });
            return res.status(201).json({ message: 'User registered successfully' });
    }
});

// GET /users endpoint to retrieve all registered users
app.get('/users', (req, res) => {
    return res.status(200).json(users);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
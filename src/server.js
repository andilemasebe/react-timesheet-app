const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Initialize Firebase Admin
const serviceAccount = require('../firebase-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Routes
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // User is already registered in Firebase from client side
        // Just store additional user info in MySQL if needed
        const sql = 'INSERT INTO users (email) VALUES (?)';
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Error storing user in database:', err);
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add more routes for timesheet functionality
app.post('/timesheet', (req, res) => {
    // Add timesheet entry
    const { userId, date, hours, project } = req.body;
    const sql = 'INSERT INTO timesheets (user_id, date, hours, project) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [userId, date, hours, project], (err, result) => {
        if (err) {
            console.error('Error adding timesheet entry:', err);
            return res.status(500).json({ error: 'Failed to add timesheet entry' });
        }
        res.status(201).json({ message: 'Timesheet entry added successfully' });
    });
});

app.get('/timesheet/:userId', (req, res) => {
    // Get timesheet entries for a user
    const userId = req.params.userId;
    const sql = 'SELECT * FROM timesheets WHERE user_id = ?';
    
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching timesheet entries:', err);
            return res.status(500).json({ error: 'Failed to fetch timesheet entries' });
        }
        res.status(200).json(results);
    });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
/*
api.js
Handles all Express API routing and SQL queries for the database
*/

const express = require('express');
const db = require('./dbDriver');
const app = express();
const port = 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware to parse JSON in request body
app.use(express.json());

// Route to get a list of all members from MySQL database
app.get('/members', (req, res) => {
    console.log('api.js: get members called');
    const sql = 'SELECT * FROM member';

    db.executeQuery(sql, [], (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log('response: ', results) //DEBUG
        res.header('Content-Type', 'application/json');
        res.json(results);
    });
});

// Add more routes for all database functions...
// TODO

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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

// Route to add a new member in the database
app.post('/members', (req, res) => {
  console.log('api.js: create member called');
  const { name, email } = req.body;
  const sql = 'INSERT INTO member (name, email) VALUES (?, ?)';

  db.executeQuery(sql, [name, email], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.header('Content-Type', 'application/json');
      res.json({ message: 'Member created successfully', memberId: results.insertId });
  });
});

// Add more routes for all database functions...
// TODO

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

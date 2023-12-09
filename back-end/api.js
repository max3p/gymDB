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
app.get('/getAllMembers', (req, res) => {
    console.log('api.js: getAllMembers called');
    const sql = 'SELECT * FROM Member';

    db.executeQuery(sql, [], (err, results) => {
        if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log('response: ', results) //DEBUG
        res.header('Content-Type', 'application/json');
        res.json(results);
    });
});

// Route to get a single member from db
app.post('/getMember', (req, res) => {
  console.log('api.js: getMember called');
  const member_id = req.body.member_id;
  const sql = `SELECT * FROM Member WHERE member_id = ${member_id}`;

  db.executeQuery(sql, [], (err, results) => {
      if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('response: ', results) //DEBUG
      res.header('Content-Type', 'application/json');
      res.json(results);
  });
});

// Route to get a list of all trainers from db
app.get('/getAllTrainers', (req, res) => {
  console.log('api.js: getAllTrainers called');
  const sql = 'SELECT * FROM Trainer';

  db.executeQuery(sql, [], (err, results) => {
      if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('response: ', results) //DEBUG
      res.header('Content-Type', 'application/json');
      res.json(results);
  });
});

// Route to get a single trainer from db
app.post('/getTrainer', (req, res) => {
  console.log('api.js: getTrainer called');
  const member_id = req.body.employee_number;
  const sql = `SELECT * FROM Trainer WHERE employee_number = ${employee_number}`;

  db.executeQuery(sql, [], (err, results) => {
      if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('response: ', results) //DEBUG
      res.header('Content-Type', 'application/json');
      res.json(results);
  });
});

//route to get manager? don't think its needed at the moment

// Route to get a list of all equipment from db
app.get('/getAllEquipment', (req, res) => {
  console.log('api.js: getAllEquipment called');
  const sql = 'SELECT * FROM Equipment';

  db.executeQuery(sql, [], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('response: ', results); // DEBUG
    res.header('Content-Type', 'application/json');
    res.json(results);
  });
});

// Route to get a single equipment from db
app.post('/getEquipment', (req, res) => {
  console.log('api.js: getEquipment called');
  const equipment_id = req.body.equipment_id;
  const sql = `SELECT * FROM Equipment WHERE equipment_id = ${equipment_id}`;

  db.executeQuery(sql, [], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('response: ', results); // DEBUG
    res.header('Content-Type', 'application/json');
    res.json(results);
  });
});

// Route to get a list of all workout plans from db
app.get('/getAllWorkoutPlans', (req, res) => {
  console.log('api.js: getAllWorkoutPlans called');
  const sql = 'SELECT * FROM WorkoutPlan';

  db.executeQuery(sql, [], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('response: ', results); // DEBUG
    res.header('Content-Type', 'application/json');
    res.json(results);
  });
});

// Route to get a single workout plan from db
app.post('/getWorkoutPlan', (req, res) => {
  console.log('api.js: getWorkoutPlan called');
  const report_number = req.body.report_number;
  const sql = `SELECT * FROM WorkoutPlan WHERE report_number = ${report_number}`;

  db.executeQuery(sql, [], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('response: ', results); // DEBUG
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

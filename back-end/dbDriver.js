// dbDriver.js

const createDB = require('./dbCreator');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Set the flag to true if you want to initialize a new database
const initializeNewDB = false;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "gymdb"   //this won't exist if you have not yet initiaized a db, may need to comment out
});

app.use(cors());
app.use(express.json());

// Connect to the DB
con.connect(function (err) {
    if (err) {
        console.error('dbDriver: Error connecting to the database:', err);
        return;
    }
    console.log("dbDriver: Connected to the database");

    // Initialize a new 'gymdb' if not already initialized
    if (initializeNewDB) {
        createDB(function () {
            con.config.database = "gymdb";
            console.log("dbDriver: con.database updated to 'gymdb'");
        });
    }

    // Start the server after connecting to the database
    app.listen(port, () => {
        console.log(`dbDriver: Server is running on port ${port}`);
    });
});

// Callback to be executed after connecting and selecting the database
function onDatabaseConnected(callback) {
    con.connect(function (err) {
        if (err) {
            console.error('dbDriver: Error connecting to the database:', err);
            return;
        }
        console.log("dbDriver: Connected to the database");

        // Initialize a new 'gymdb' if not already initialized
        if (initializeNewDB) {
            createDB(function () {
                con.config.database = "gymdb";
                console.log("dbDriver: con.database updated to 'gymdb'");
                callback(); // Invoke the callback after selecting the database
            });
        } else {
            callback(); // Invoke the callback without initializing the database
        }
    });
}

// Queries MySQL DB
// Input: the query as a string
function queryDB(query, callback) {
    onDatabaseConnected(function () {
        con.query(query, function (err, result) {
            if (err) {
                console.error('Error executing query:', err);
                if (callback) {
                    callback({ error: 'An error occurred while executing the query.' });
                }
            } else {
                if (callback) {
                    callback(result);
                }
            }
        });
    });
}

// Expose the queryDB function
app.post('/query', (req, res) => {
    const { query } = req.body;
    queryDB(query, (result) => {
        res.json(result);
    });
});

// Start the server after connecting to the database
app.listen(port, 'localhost', () => {
    console.log(`dbDriver: Server is running on port ${port}`);
});

module.exports = { queryDB };

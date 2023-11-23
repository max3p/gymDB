// dbDriver.js

const createDB = require('./dbCreator');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
});

// Set initializeDB to true if you want the driver to create a new database
// WARNING: will delete the previous database if true
const initializeNewDB = true;

// Connects to the DB
con.connect(function (err) {
    if (err) {
        console.error('dbDriver: Error connecting to the database:', err);
        return;
    }
    console.log("dbDriver: Connected to the database");

    // Initialize a new 'gymdb' if the flag is set to true
    if (initializeNewDB) {
        createDB(function () {
            con.config.database = "gymdb";
            console.log("dbDriver: con.database updated to 'gymdb'");
        });
    }
});

// Queries MySQL DB
// Input: the query as a string
function queryDB(query, callback) {
    con.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            callback(result);
        }
    });
}

module.exports = { queryDB };

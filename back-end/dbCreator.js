// dbCreator.js

const mysql = require('mysql2');

function createDB() {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "pass",
    });

    con.connect(function (err) {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log("Connected to the database!");

        // Check if 'gymdb' already exists, if so, delete it
        con.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'gymdb'", function (err, rows) {
            if (err) {
                console.error('Error checking if database exists:', err);
                return;
            }

            if (rows.length > 0) {
                con.query("DROP DATABASE gymdb", function (err, result) {
                    if (err) {
                        console.error('Error deleting database:', err);
                        return;
                    }
                    console.log("Database 'gymdb' deleted");
                });
            }

            // Once the previous 'gymdb' is deleted, create a new one
            con.query("CREATE DATABASE gymdb", function (err, result) {
                if (err) {
                    console.error('Error creating database:', err);
                    return;
                }
                console.log("Database 'gymdb' created");
            });
        });
    });
}

module.exports = createDB;

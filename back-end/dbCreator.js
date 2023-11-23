//dbCreator.js

const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
});

// Creates a new gymdb database and adds all tables
function createDB(callback) {
    con.connect(function (err) {
        if (err) {
            console.error('dbCreator: Error connecting to the database:', err);
            return;
        }
        console.log("dbCreator: Connected to the database");

        // Create new DB
        createEmpty(function() {
            // Callback after database creation is complete
            con.changeUser({ database: 'gymdb' }, function(err) {
                if (err) {
                    console.error('dbCreator: Error selecting database:', err);
                    return;
                }

                // Create member table
                createTable("member", "CREATE TABLE `gymdb`.`member` (" +
                    "`member_id` CHAR(10) PRIMARY KEY," +
                    "`name` CHAR(50)," +
                    "`phone_number` CHAR(15)," +
                    "`emergency_contact` CHAR(15)," +
                    "`address` CHAR(100)," +
                    "`credit_card` CHAR(16)," +
                    "`franchise_number` CHAR(10)," +
                    "`trainer_employee_number` CHAR(10)" +
                ");");

                // TODO: create all tables...

                // Callback after table creation is complete
                callback();
            });
        });
    });
}

// Checks is a database named 'gymdb' exists, if so deletes it
// Then creates a new empty database called gymdb
function createEmpty(callback) {

    // Check if 'gymdb' already exists
    con.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'gymdb'", function (err, rows) {
        if (err) {
            console.error('dbCreator: Error checking if database exists:', err);
            return;
        }

        // If 'gymdb' exists, delete it
        if (rows.length > 0) {
            con.query("DROP DATABASE gymdb", function (err, result) {
                if (err) {
                    console.error('dbCreator: Error deleting database:', err);
                    return;
                }
                console.log("dbCreator: Database 'gymdb' deleted");
            });
        }

        // Once the previous 'gymdb' is deleted or confirmed non-existence, create a new one
        con.query("CREATE DATABASE gymdb", function (err, result) {
            if (err) {
                console.error('dbCreator: Error creating database:', err);
                return;
            }
            console.log("dbCreator: Database 'gymdb' created");

            // Callback after database creation is complete
            callback();
        });
    });
}

// Queries MySQL to create a new table
// Input: the table name and the SQL query to create it
function createTable(name, query) {
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log(`dbCreator: ${name} table created`);
    });
}

module.exports = createDB;

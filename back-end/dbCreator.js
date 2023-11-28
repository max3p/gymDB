/*
dbCreator.js
A standalone program that will initialize the gym database with all tables
To run: node dbCreator.js
*/

const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
});

function createDB() {
    con.connect(function (err) {
        if (err) {
            console.error('dbCreator: Error connecting to the database:', err);
            return;
        }
        console.log("dbCreator: Connected to the database");

        createEmpty(function () {
            con.changeUser({ database: 'gymdb' }, function (err) {
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
            });
        });
    });
}

function createEmpty(callback) {
    con.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'gymdb'", function (err, rows) {
        if (err) {
            console.error('dbCreator: Error checking if database exists:', err);
            return;
        }

        if (rows.length > 0) {
            con.query("DROP DATABASE gymdb", function (err, result) {
                if (err) {
                    console.error('dbCreator: Error deleting database:', err);
                    return;
                }
                console.log("dbCreator: Database 'gymdb' deleted");
            });
        }

        con.query("CREATE DATABASE gymdb", function (err, result) {
            if (err) {
                console.error('dbCreator: Error creating database:', err);
                return;
            }
            console.log("dbCreator: Database 'gymdb' created");

            callback();
        });
    });
}

function createTable(name, query) {
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log(`dbCreator: ${name} table created`);
    });
}

// Check if the script is being run directly (not required by another script)
if (require.main === module) {
    createDB();
}


var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
});

con.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("Connected to the database!");
});

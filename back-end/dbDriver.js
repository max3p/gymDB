/*
dbDriver.js
Handles connecting  to MySQL database
*/

const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'gymdb'
});

// Function to execute a query with a connection from the pool
const executeQuery = (sql, params, callback) => {
    console.log('dbDriver.js: query called');
    pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      return callback(err, null);
    }
    console.log('dbDriver.js: connected to database');
    

    connection.query(sql, params, (queryErr, results) => {
      connection.release(); // Release the connection back to the pool

      if (queryErr) {
        console.error('Error executing MySQL query:', queryErr);
        return callback(queryErr, null);
      }

      callback(null, results);
    });
  });
};

module.exports = {
  executeQuery
};

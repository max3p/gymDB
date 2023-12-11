/*
api.js
Contains all functions for retrieving/storing data in the db
*/

const db = require('./dbDriver');

// Retrieves a single member from the database, returned as an object. Must specify member_id as a parameters. 
function getMember(member_id, callback) {
    console.log('api.js: getMember called');
    const sql = `SELECT * FROM Member WHERE member_id = ${member_id}`;
  
    db.executeQuery(sql, [], (err, results) => {
      if (err) {
        return callback({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return callback({ error: 'Member not found' });
      }

      callback(null, results[0]);
    });
}

// Retrieves all members from the database, returned as an array of objects. 
function getAllMembers(callback) {
    console.log('api.js: getAllMembers called');
    const sql = 'SELECT * FROM Member';
  
    db.executeQuery(sql, [], (err, results) => {
      if (err) {
        return callback({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return callback({ error: 'No Members found' });
      }
  
      callback(null, results);
    });
}

  

module.exports = {getMember, getAllMembers};
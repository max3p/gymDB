/*
api.js
Contains all functions for retrieving/storing data in the db
*/

const db = require('./dbDriver');

// Generate a random ID of specified length with numbers 0-9
function generateRandomID(length) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
  

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

// Inserts a new member into the database, must input a Member object as a parameter
// Generates a random member_id starting with 9, returns the ID
function addMember(memberObject, callback) {
    console.log('api.js: addMember called');

    //generate random ID
    const randomMemberId = '9' + generateRandomID(7);

    const sql = `
        INSERT INTO Member 
        (member_id, name, phone_number, emergency_contact, address, credit_card)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        randomMemberId,
        memberObject.name,
        memberObject.phone_number,
        memberObject.emergency_contact,
        memberObject.address,
        memberObject.credit_card,
    ];

    db.executeQuery(sql, values, (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        const memberId = results.insertId;
        callback(null, { memberId });
    });
}



module.exports = {getMember, getAllMembers, addMember};
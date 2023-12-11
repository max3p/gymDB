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

// Edits a specific attribute of a tuple in the database based on entityName, id, attributeName, and newValue
function editTuple(entityName, id, attributeName, newValue, callback) {
    console.log('api.js: editTuple called');

    const sql = `
        UPDATE ${entityName} 
        SET ${attributeName} = ?
        WHERE ${entityName}_id = ?
    `;

    const values = [newValue, id];

    db.executeQuery(sql, values, (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected to determine if the tuple was updated successfully
        const isUpdated = results.affectedRows > 0;

        if (isUpdated) {
            callback(null, { message: `${entityName} updated successfully` });
        } else {
            callback({ error: `${entityName} not found or could not be updated` });
        }
    });
}

// Retrieves a single tuple from the database, returned as an object.
// Must specify entityName and id as parameters.
function getTuple(entityName, id, callback) {
    console.log('api.js: getTuple called');

    const sql = `SELECT * FROM ${entityName} WHERE ${entityName}_id = ?`;

    db.executeQuery(sql, [id], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return callback({ error: `${entityName} not found` });
        }

        callback(null, results[0]);
    });
}










/* ================================== MEMBER ================================== */

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

// Deletes a member from the database based on the member_id, must specify member_id as parameter
function deleteMember(memberId, callback) {
    console.log('api.js: deleteMember called');

    const sql = `DELETE FROM Member WHERE member_id = ?`;

    db.executeQuery(sql, [memberId], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected to determine if the member was deleted successfully
        const isDeleted = results.affectedRows > 0;

        if (isDeleted) {
            callback(null, { message: 'Member deleted successfully' });
        } else {
            callback({ error: 'Member not found or could not be deleted' });
        }
    });
}

/* ================================== WORKER ================================== */

// Retrieves a single worker from the database, returned as an object. Must specify employee_id as a parameter. 
function getWorker(employee_id, callback) {
    console.log('api.js: getWorker called');
    const sql = `SELECT * FROM Worker WHERE employee_id = ${employee_id}`;
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'Worker not found' });
        }

        callback(null, results[0]);
    });
}

// Retrieves all workers from the database, returned as an array of objects. 
function getAllWorkers(callback) {
    console.log('api.js: getAllWorkers called');
    const sql = 'SELECT * FROM Worker';
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'No Workers found' });
        }
  
        callback(null, results);
    });
}

// Inserts a new worker into the database, must input a Worker object as a parameter
// Generates a random employee_id starting with 3, returns the ID
function addWorker(workerObject, callback) {
    console.log('api.js: addWorker called');

    // generate random ID
    const randomEmployeeId = '3' + generateRandomID(7);

    const sql = `
        INSERT INTO Worker 
        (employee_id, name, phone_number, availability, emergency_contact)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        randomEmployeeId,
        workerObject.name,
        workerObject.phone_number,
        workerObject.availability,
        workerObject.emergency_contact,
    ];

    db.executeQuery(sql, values, (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        const employeeId = results.insertId;
        callback(null, { employeeId });
    });
}

// Deletes a worker from the database based on the employee_id, must specify employee_id as parameter
function deleteWorker(employeeId, callback) {
    console.log('api.js: deleteWorker called');

    const sql = `DELETE FROM Worker WHERE employee_id = ?`;

    db.executeQuery(sql, [employeeId], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected to determine if the worker was deleted successfully
        const isDeleted = results.affectedRows > 0;

        if (isDeleted) {
            callback(null, { message: 'Worker deleted successfully' });
        } else {
            callback({ error: 'Worker not found or could not be deleted' });
        }
    });
}

/* ================================== EQUIPMENT ================================== */

// Retrieves a single equipment from the database, returned as an object. Must specify equipment_id as a parameter. 
function getEquipment(equipment_id, callback) {
    console.log('api.js: getEquipment called');
    const sql = `SELECT * FROM Equipment WHERE equipment_id = ${equipment_id}`;
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'Equipment not found' });
        }

        callback(null, results[0]);
    });
}

// Retrieves all equipment from the database, returned as an array of objects. 
function getAllEquipment(callback) {
    console.log('api.js: getAllEquipment called');
    const sql = 'SELECT * FROM Equipment';
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'No Equipment found' });
        }
  
        callback(null, results);
    });
}

// Inserts a new equipment into the database, must input an Equipment object as a parameter
// Generates a random equipment_id starting with 4, returns the ID
function addEquipment(equipmentObject, callback) {
    console.log('api.js: addEquipment called');

    // generate random ID
    const randomEquipmentId = '4' + generateRandomID(7);

    const sql = `
        INSERT INTO Equipment 
        (equipment_id, equipment_condition, name, date_bought, maintenance_history)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        randomEquipmentId,
        equipmentObject.equipment_condition,
        equipmentObject.name,
        equipmentObject.date_bought,
        equipmentObject.maintenance_history,
    ];

    db.executeQuery(sql, values, (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        const equipmentId = results.insertId;
        callback(null, { equipmentId });
    });
}

// Deletes equipment from the database based on the equipment_id, must specify equipment_id as parameter
function deleteEquipment(equipmentId, callback) {
    console.log('api.js: deleteEquipment called');

    const sql = `DELETE FROM Equipment WHERE equipment_id = ?`;

    db.executeQuery(sql, [equipmentId], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected to determine if the equipment was deleted successfully
        const isDeleted = results.affectedRows > 0;

        if (isDeleted) {
            callback(null, { message: 'Equipment deleted successfully' });
        } else {
            callback({ error: 'Equipment not found or could not be deleted' });
        }
    });
}

/* ================================== INCIDENTREPORT ================================== */

// Retrieves a single incident report from the database, returned as an object. Must specify report_number as a parameter. 
function getIncidentReport(report_number, callback) {
    console.log('api.js: getIncidentReport called');
    const sql = `SELECT * FROM IncidentReport WHERE report_number = ${report_number}`;
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'Incident Report not found' });
        }

        callback(null, results[0]);
    });
}

// Retrieves all incident reports from the database, returned as an array of objects. 
function getAllIncidentReports(callback) {
    console.log('api.js: getAllIncidentReports called');
    const sql = 'SELECT * FROM IncidentReport';
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'No Incident Reports found' });
        }
  
        callback(null, results);
    });
}

// Inserts a new incident report into the database, must input an IncidentReport object as a parameter
// Generates a random report_number starting with 1, returns the ID
function addIncidentReport(incidentReportObject, callback) {
    console.log('api.js: addIncidentReport called');

    // generate random ID
    const randomReportNumber = '1' + generateRandomID(7);

    const sql = `
        INSERT INTO IncidentReport 
        (report_number, people_involved, equipment_involved, date, time)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        randomReportNumber,
        incidentReportObject.people_involved,
        incidentReportObject.equipment_involved,
        incidentReportObject.date,
        incidentReportObject.time,
    ];

    db.executeQuery(sql, values, (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        const reportNumber = results.insertId;
        callback(null, { reportNumber });
    });
}

// Deletes an incident report from the database based on the report_number, must specify report_number as parameter
function deleteIncidentReport(reportNumber, callback) {
    console.log('api.js: deleteIncidentReport called');

    const sql = `DELETE FROM IncidentReport WHERE report_number = ?`;

    db.executeQuery(sql, [reportNumber], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected to determine if the incident report was deleted successfully
        const isDeleted = results.affectedRows > 0;

        if (isDeleted) {
            callback(null, { message: 'Incident Report deleted successfully' });
        } else {
            callback({ error: 'Incident Report not found or could not be deleted' });
        }
    });
}

/* ================================== WORKOUTPLAN ================================== */

// Retrieves a single workout plan from the database, returned as an object. Must specify report_number as a parameter. 
function getWorkoutPlan(report_number, callback) {
    console.log('api.js: getWorkoutPlan called');
    const sql = `SELECT * FROM WorkoutPlan WHERE report_number = ${report_number}`;
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'Workout Plan not found' });
        }

        callback(null, results[0]);
    });
}

// Retrieves all workout plans from the database, returned as an array of objects. 
function getAllWorkoutPlans(callback) {
    console.log('api.js: getAllWorkoutPlans called');
    const sql = 'SELECT * FROM WorkoutPlan';
  
    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }
  
        if (results.length === 0) {
            return callback({ error: 'No Workout Plans found' });
        }
  
        callback(null, results);
    });
}

// Inserts a new workout plan into the database, must input a WorkoutPlan object as a parameter
// Generates a random report_number starting with 7, returns the ID
function addWorkoutPlan(workoutPlanObject, callback) {
    console.log('api.js: addWorkoutPlan called');

    // generate random ID
    const randomReportNumber = '7' + generateRandomID(7);

    const sql = `
        INSERT INTO WorkoutPlan 
        (report_number, employee_id, date_generated, days_of_the_week, frequency, exercises)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        randomReportNumber,
        workoutPlanObject.employee_id,
        workoutPlanObject.date_generated,
        workoutPlanObject.days_of_the_week,
        workoutPlanObject.frequency,
        workoutPlanObject.exercises,
    ];

    db.executeQuery(sql, values, (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        const reportNumber = results.insertId;
        callback(null, { reportNumber });
    });
}

// Deletes a workout plan from the database based on the report_number, must specify report_number as parameter
function deleteWorkoutPlan(reportNumber, callback) {
    console.log('api.js: deleteWorkoutPlan called');

    const sql = `DELETE FROM WorkoutPlan WHERE report_number = ?`;

    db.executeQuery(sql, [reportNumber], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected to determine if the workout plan was deleted successfully
        const isDeleted = results.affectedRows > 0;

        if (isDeleted) {
            callback(null, { message: 'Workout Plan deleted successfully' });
        } else {
            callback({ error: 'Workout Plan not found or could not be deleted' });
        }
    });
}

module.exports = { 
    editTuple, getTuple, 
    getMember, getAllMembers, addMember, deleteMember,
    getWorker, getAllWorkers, addWorker, deleteWorker,
    getEquipment, getAllEquipment, addEquipment, deleteEquipment,
    getIncidentReport, getAllIncidentReports, addIncidentReport, deleteIncidentReport,
    getWorkoutPlan, getAllWorkoutPlans, addWorkoutPlan, deleteWorkoutPlan
};


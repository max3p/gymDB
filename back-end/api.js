/*
api.js
Contains all functions for retrieving/storing data in the db
*/

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbDriver');

const app = express();
const port = 3000; 

app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Update with the specific origin(s) you want to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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

// Retrieves all tuples from the database, returned as an array of objects.
// Must specify entityName as a parameter.
function getAllTuples(entityName, callback) {
    console.log(`api.js: getAllTuples called for ${entityName}`);
    const sql = `SELECT * FROM ${entityName}`;

    db.executeQuery(sql, [], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return callback({ error: `No ${entityName} found` });
        }

        callback(null, results);
    });
}

// Deletes a tuple from the database based on the entityName and id.
// Must specify entityName and id as parameters.
function deleteTuple(entityName, entityId, callback) {
    console.log(`api.js: deleteTuple called for ${entityName}`);

    const sql = `DELETE FROM ${entityName} WHERE ${entityName}_id = ?`;

    db.executeQuery(sql, [entityId], (err, results) => {
        if (err) {
            return callback({ error: 'Internal Server Error' });
        }

        // Check if any rows were affected to determine if the tuple was deleted successfully
        const isDeleted = results.affectedRows > 0;

        if (isDeleted) {
            callback(null, { message: `${entityName} deleted successfully` });
        } else {
            callback({ error: `${entityName} not found or could not be deleted` });
        }
    });
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

// API route for getTuple
app.get('/api/:entityName/:id', (req, res) => {
    const { entityName, id } = req.params;
    getTuple(entityName, id, (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }
      res.json(result);
    });
});

// API route for getAllTuples
app.get('/api/:entityName', (req, res) => {
    const { entityName } = req.params;
    getAllTuples(entityName, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});

// API route for deleteTuple
app.delete('/api/:entityName/:id', (req, res) => {
    const { entityName, id } = req.params;
    deleteTuple(entityName, id, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});

// API route for editTuple
app.put('/api/:entityName/:id', (req, res) => {
    const { entityName, id } = req.params;
    const { attributeName, newValue } = req.body;
    editTuple(entityName, id, attributeName, newValue, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});

// API route for addMember
app.post('/api/member', (req, res) => {
    const memberObject = req.body;
    addMember(memberObject, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});

// API route for addWorker
app.post('/api/worker', (req, res) => {
    const workerObject = req.body;
    addWorker(workerObject, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});

// API route for addEquipment
app.post('/api/equipment', (req, res) => {
    const equipmentObject = req.body;
    addEquipment(equipmentObject, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});

// API route for addIncidentReport
app.post('/api/incident-report', (req, res) => {
    const incidentReportObject = req.body;
        addIncidentReport(incidentReportObject, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});

// API route for addWorkoutPlan
app.post('/api/workout-plan', (req, res) => {
    const workoutPlanObject = req.body;
    addWorkoutPlan(workoutPlanObject, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(result);
    });
});
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  
module.exports = app;
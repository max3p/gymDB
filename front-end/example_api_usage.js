/*
example_api_usage.js
Examples functions to retrieve/store data using api.js 
*/

const api = require("../back-end/api.js");

/* ================================= getTuple ================================= */

// Example of using getTuple function to retrieve a single member tuple
const entityId = 2; // Specify the ID of the tuple to retrieve
const entityName = 'Member'; // Specify the name of the table

api.getTuple(entityName, entityId, (err, tupleObject) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('\ngetTuple() Result:');

        // Print each attribute of tupleObject
        console.log('   Member ID:', tupleObject.member_id);
        console.log('   Name:', tupleObject.name);
        console.log('   Phone Number:', tupleObject.phone_number);
        console.log('   Emergency Contact:', tupleObject.emergency_contact);
        console.log('   Address:', tupleObject.address);
        console.log('   Credit Card:', tupleObject.credit_card);
        console.log('   Franchise Number:', tupleObject.franchise_number);
        console.log('   Trainer Employee ID:', tupleObject.trainer_employee_id);
    }
});

/* ================================= getAllTuples ================================= */

// Example of using getAllTuples function to retrieve all tuples from member
const entityNameToRetrieve = 'Member'; // Specify the name of the table
api.getAllTuples(entityNameToRetrieve, (err, tuplesArray) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log(`\ngetAllTuples() Results for ${entityNameToRetrieve}:`);

        // Iterate through each tuple in the array
        tuplesArray.forEach((tupleObject) => {
            console.log('-------------------');
            console.log('   Member ID:', tupleObject.member_id);
            console.log('   Name:', tupleObject.name);
            console.log('   Phone Number:', tupleObject.phone_number);
            console.log('   Emergency Contact:', tupleObject.emergency_contact);
            console.log('   Address:', tupleObject.address);
            console.log('   Credit Card:', tupleObject.credit_card);
            console.log('   Franchise Number:', tupleObject.franchise_number);
            console.log('   Trainer Employee ID:', tupleObject.trainer_employee_id);
        });
    }
});

/* ================================= addMember ================================= */

// Example of using the addMember function to insert a new member into the database
// first create a new Member object
const newMember = {
    name: 'Sharoon',
    phone_number: '123-456-7890',
    emergency_contact: '123-444-4456',
    address: '123 Main St, City',
    credit_card: '1234-5678-9012-3456',
};

// then call addMember to insert the new member into the db
api.addMember(newMember, (err) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('\nInserted new Member into the db');
    }
});

/* ================================= deleteTuple ================================= */

// Example of using deleteTuple function to delete a tuple from a specified table
const entityNameToDelete = 'Member'; // Specify the name of the table
const entityIdToDelete = 92267122; // Specify the ID of the tuple to delete

api.deleteTuple(entityNameToDelete, entityIdToDelete, (err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log(`\n${entityNameToDelete} deleted successfully`);
    }
});

/* ================================= editTuple ================================= */

// Example of using editTuple function to update a specific attribute of a tuple in the database
// Specify the parameters for the update
const entityIdToUpdate = 2; // Specify the ID of the tuple to update
const attributeToUpdate = 'phone_number'; // Specify the attribute to update
const newValueToUpdate = '555-1234'; // Specify the new value for the attribute

// Call the editTuple function to perform the update
api.editTuple('Member', entityIdToUpdate, attributeToUpdate, newValueToUpdate, (err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('\neditTuple() Result:');
        console.log(result.message);
    }
});
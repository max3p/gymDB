/*
example_api_usage.js
Examples functions to retrieve/store data using api.js 
*/

// Assuming this code is running in a web browser and needs to access api.js running in Node.js
// Also, assuming the server is running at http://localhost:3000

const baseURL = 'http://localhost:3000/api'; // Update with your server URL

/* ================================= getTuple ================================= */

// Example of using getTuple function to retrieve a single member tuple
const entityId = 2; // Specify the ID of the tuple to retrieve
const entityName = 'Member'; // Specify the name of the table

fetch(`${baseURL}/${entityName}/${entityId}`)
  .then((response) => response.json())
  .then((tupleObject) => {
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
  })
  .catch((error) => console.error('Error:', error));

/* ================================= getAllTuples ================================= */

// Example of using getAllTuples function to retrieve all tuples from member
const entityNameToRetrieve = 'Member'; // Specify the name of the table
fetch(`${baseURL}/${entityNameToRetrieve}`)
  .then((response) => response.json())
  .then((tuplesArray) => {
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
  })
  .catch((error) => console.error('Error:', error));

/* ================================= addMember ================================= */

// Example of using the addMember function to insert a new member into the database
// first create a new Member object
const newMember = {
  name: 'Quagmire',
  phone_number: '123-456-7890',
  emergency_contact: '123-444-4456',
  address: '123 Main St, City',
  credit_card: '1234-5678-9012-3456',
};

// then call addMember to insert the new member into the db
fetch(`${baseURL}/member`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newMember),
})
  .then((response) => response.json())
  .then(() => console.log('\nInserted new Member into the db'))
  .catch((error) => console.error('Error:', error));

/* ================================= deleteTuple ================================= */

// Example of using deleteTuple function to delete a tuple from a specified table
const entityNameToDelete = 'Member'; // Specify the name of the table
const entityIdToDelete = 92267122; // Specify the ID of the tuple to delete

fetch(`${baseURL}/${entityNameToDelete}/${entityIdToDelete}`, {
  method: 'DELETE',
})
  .then(() => console.log(`\n${entityNameToDelete} deleted successfully`))
  .catch((error) => console.error('Error:', error));

/* ================================= editTuple ================================= */

// Example of using editTuple function to update a specific attribute of a tuple in the database
// Specify the parameters for the update
const entityIdToUpdate = 2; // Specify the ID of the tuple to update
const attributeToUpdate = 'phone_number'; // Specify the attribute to update
const newValueToUpdate = '555-1234'; // Specify the new value for the attribute

// Call the editTuple function to perform the update
fetch(`${baseURL}/member/${entityIdToUpdate}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ attributeName: attributeToUpdate, newValue: newValueToUpdate }),
})
  .then((response) => response.json())
  .then((result) => {
    console.log('\neditTuple() Result:');
    console.log(result.message);
  })
  .catch((error) => console.error('Error:', error));

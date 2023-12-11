/*
example_api_usage.js
Examples functions to retrieve/store data using api.js
*/

const api = require("../back-end/api.js");

// Example of using the getMember function to retrieve a single member
const memberId = 2; 
api.getMember(memberId, (err, memberObject) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('\ngetMember() Result:');

        // Print each attribute of memberObject
        console.log('   Member ID:', memberObject.member_id);
        console.log('   Name:', memberObject.name);
        console.log('   Phone Number:', memberObject.phone_number);
        console.log('   Emergency Contact:', memberObject.emergency_contact);
        console.log('   Address:', memberObject.address);
        console.log('   Credit Card:', memberObject.credit_card);
        console.log('   Franchise Number:', memberObject.franchise_number);
        console.log('   Trainer Employee ID:', memberObject.trainer_employee_id);
    }
});

// Example of using the getAllMembers function to retrieve all members
api.getAllMembers((err, membersArray) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('\ngetAllMembers() Results:');
    
        // Iterate through each member in the array
        membersArray.forEach((memberObject) => {
            console.log('-------------------');
            console.log('Member ID:', memberObject.member_id);
            console.log('Name:', memberObject.name);
            console.log('Phone Number:', memberObject.phone_number);
            console.log('Emergency Contact:', memberObject.emergency_contact);
            console.log('Address:', memberObject.address);
            console.log('Credit Card:', memberObject.credit_card);
            console.log('Franchise Number:', memberObject.franchise_number);
            console.log('Trainer Employee ID:', memberObject.trainer_employee_id);
        });
    }
});

// Example of using the addMember function to insert a new member into the database

// first create a new Member object
const newMember = {
    name: 'John Doe',
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

// Example of using deleteMember to delete a tuple in the database

const memberIdToDelete = 92909376; //must specifiy id of member to delete

api.deleteMember(memberIdToDelete, (err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('\nMember deleted successfully');
    }
});

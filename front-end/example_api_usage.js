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
    console.log('Result:');

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
      console.log('Results:');
  
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
  
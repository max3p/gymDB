/*
staff.js
Populates the table in staff.html
*/

const baseURL = 'http://localhost:3000/api';

// User Icon
var imageUrl = "./images/user-icon.png";

async function fetchData() {
    try {
        // Set up variables
        const entityNameToRetrieve = 'Worker';
        const response = await fetch(`${baseURL}/${entityNameToRetrieve}`);
        const staffList = await response.json();

        // Iterate through each tuple in the array and print for debug
        console.log(`Data retrieved from database:`);
        staffList.forEach((tupleObject) => {
            console.log('-------------------');
            console.log('   Staff ID:', tupleObject.employee_id);
            console.log('   Name:', tupleObject.name);
        });

        // Get the table by ID
        var table = document.getElementById("staffTable");

        // Iterate through the data and create rows
        for (var i = 0; i < staffList.length; i++) {
            // Create a new row
            var row = table.insertRow(i);

            // Insert an image into the leftmost cell
            var imgCell = row.insertCell(0);
            var img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Image";
            imgCell.appendChild(img);

            // Insert employee_id into the second cell
            var employeeIdCell = row.insertCell(1);
            employeeIdCell.innerHTML = staffList[i].employee_id;

            // Insert name into the third cell
            var nameCell = row.insertCell(2);
            nameCell.innerHTML = staffList[i].name;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call async function
fetchData();

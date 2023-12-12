/*
staff.js
Populates the table in staff.html
*/

const baseURL = 'http://localhost:3000/api';

// User Icon
var imageUrl = "./images/user-icon.png";

// Fetches entire table from database
async function fetchAllData() {
    try {
        // Set up variables
        const entityNameToRetrieve = 'Employee';
        const response = await fetch(`${baseURL}/${entityNameToRetrieve}`);
        const staffList = await response.json();
        console.log(`Data retrieved from database`);

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

            // Insert "Expand" button into the fourth cell
            var expandCell = row.insertCell(3);
            var expandButton = document.createElement("button");
            expandButton.innerHTML = "Expand";
            expandCell.appendChild(expandButton);
        }

        // Add an event listener for clicking expand
        table.addEventListener("click", function(event) {
            var target = event.target;

            // Check if the clicked element is a "Expand" button
            if (target.tagName === 'BUTTON' && target.innerHTML === 'Expand') {
                // Find the corresponding row
                var rowIndex = target.closest('tr').rowIndex;

                // Get the employee_id from the second cell of the clicked row
                var employeeId = table.rows[rowIndex].cells[1].innerHTML;

                // Call the expand function with the employee_id
                expand(employeeId);
            }
        });

     } catch (error) {
        console.error('Error:', error);
    }
}

// Fetches data on one entity, then opens the Expand modal
async function expand(employeeID) {
    console.log("Expanding employee ID:", employeeID);

    const entityName = 'Employee';
    fetch(`${baseURL}/${entityName}/${employeeID}`)
        .then((response) => response.json())
        .then((tupleObject) => {
            openExpandModal(tupleObject);
        })
        .catch((error) => console.error('Error:', error));
}

// Function to open expand modal and display employee ID
function openExpandModal(employeeObject) {
    var modal = document.getElementById("expandModal");
    var employeeIdInModal = document.getElementById("employeeIdInModal");

    // Set the employee data in the modal content
    employeeNameInModal.textContent = "Name: " + employeeObject.name;
    employeeIdInModal.textContent = "Employee ID: " + employeeObject.employee_id;
    employeePhoneInModal.textContent = "Phone number: " + employeeObject.phone_number;
    employeeAvInModal.textContent = "Availability: " + employeeObject.availability;
    employeeEmergencyCInModal.textContent = "Emergency Contact: " + employeeObject.emergency_contact;

    // Display the modal
    modal.style.display = "block";
}

// Opens the Add New modal
function openAddNewModal() {
    var modal = document.getElementById("addNewModal");
    // Display the modal
    modal.style.display = "block";
}

// Collects data in a form for the Add New modal
function collectData() {
    // Get form elements
    var name = document.getElementById("name").value;
    var phone_number = document.getElementById("phone").value;
    var availability = document.getElementById("availability").value;
    var emergency_contact = document.getElementById("emergencyPhone").value;

    // Create an object to store the data
    var dataObject = {
        name: name,
        phone_number: phone_number,
        availability: availability,
        emergency_contact: emergency_contact
    };

    // Display the collected data
    document.getElementById("text").innerHTML = "Collected Data: " + JSON.stringify(dataObject);

    // Close modal and show a popup window confirmation
    closeModal("addNewModal");
    alert("Data Submitted");
}

// Function to close a modal
function closeModal(modalName) {
    var modal = document.getElementById(modalName);
    modal.style.display = "none";
}

// Close all modals if the user clicks outside of it
window.onclick = function (event) {
    var modal = document.getElementById("expandModal");
    var modal2 = document.getElementById("addNewModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }else if(event.target == modal2){
        modal2.style.display = "none";
    }
};

// Call async function to fetch data upon load
fetchAllData();

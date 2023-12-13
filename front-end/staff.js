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

// Define Edit and Delete buttons outside of Expand modal
var editButton = document.createElement("button");
editButton.innerHTML = "Edit";
editButton.classList.add("modal-button");
editButton.addEventListener("click", function() {
    // Placeholder function for now
    console.log("Edit button clicked");
});
document.getElementsByClassName("modal-buttons")[0].appendChild(editButton);

var deleteButton = document.createElement("button");
deleteButton.innerHTML = "Delete";
deleteButton.classList.add("modal-button");
deleteButton.addEventListener("click", function() {
    // Placeholder function for now
    console.log("Delete button clicked");
});
document.getElementsByClassName("modal-buttons")[0].appendChild(deleteButton);

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

    // Update event listeners and text for "Edit" and "Delete" buttons
    editButton.removeEventListener("click", null);
    editButton.addEventListener("click", function() {
        editEmployee(employeeObject);
    });

    deleteButton.removeEventListener("click", null);
    deleteButton.addEventListener("click", function() {
        deleteEmployee(employeeObject.employee_id);
    });

    // Display the modal
    modal.style.display = "block";
}

// Function to open Add New modal
function openAddNewModal() {
    var modal = document.getElementById("addNewModal");
    
    // Ensure form is clear
    document.getElementById("name").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("availability").value = '';
    document.getElementById("emergencyPhone").value = '';

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
    var newObject = {
        name: name,
        phone_number: phone_number,
        availability: availability,
        emergency_contact: emergency_contact
    };

    // Send the new object to the database
    fetch(`${baseURL}/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
      })
        .then((response) => response.json())
        .then(() => console.log('\nInserted new Employee into the db'))
        .catch((error) => console.error('Error:', error));

    // Close modal, show a popup window confirmation, then refresh page
    closeModal("addNewModal");
    alert("New Employee Added Successfully");
    location.reload();
}

// Opens a form to edit the employee with the specified ID
function editEmployee(employeeObject){
    console.log("edit employee with id:" + employeeObject.employee_id);

    // Close Expand modal
    closeModal('expandModal');

    // Display Edit modal
    var modal = document.getElementById("editModal");
    modal.style.display = "block";

    // Populate form fields with default values
    document.getElementById("name2").value = employeeObject.name;
    document.getElementById("phone2").value = employeeObject.phone_number;
    document.getElementById("availability2").value = employeeObject.availability;
    document.getElementById("emergencyPhone2").value = employeeObject.emergency_contact;
}

// Collects data in a form for Edit modal, updates the database
function updateData() {
    // Get form elements
    var name = document.getElementById("name2").value;
    var phone_number = document.getElementById("phone2").value;
    var availability = document.getElementById("availability2").value;
    var emergency_contact = document.getElementById("emergencyPhone2").value;

    // Create an object to store the data
    var newObject = {
        name: name,
        phone_number: phone_number,
        availability: availability,
        emergency_contact: emergency_contact
    };

    //update 
    //TODO

    // Close modal, show a popup window confirmation, then refresh page
    closeModal("editModal");
    alert("Employee updated Successfully");
    location.reload();
}

// Deletes the employee with the specified ID
function deleteEmployee(employee_id){
    console.log("deleting employee with id:" + employee_id);

    // Show a confirmation dialog
    var confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
        // If user clicks "OK"
        const entityNameToDelete = 'Employee';
        fetch(`${baseURL}/${entityNameToDelete}/${employee_id}`, {
        method: 'DELETE',
        })
        .then(() => {
            console.log(`\n${entityNameToDelete} deleted successfully`);
            closeModal("expandModal");
            location.reload();
        })
        .catch((error) => console.error('Error:', error));

        //Close modal and refresh page
        

    } else {
        // If user clicks "Cancel"
        console.log("Delete cancelled");
    }
}

// Function to close a modal
function closeModal(modalName) {
    var modal = document.getElementById(modalName);

    // Hide
    modal.style.display = "none";
}

// Close all modals if the user clicks outside of it
window.onclick = function (event) {
    var modal = document.getElementById("expandModal");
    var modal2 = document.getElementById("addNewModal");
    var modal3 = document.getElementById("editModal");
    if (event.target == modal) {
        closeModal("expandModal");
    }else if(event.target == modal2){
        closeModal("addNewModal");
    }else if(event.target == modal3){
        closeModal("editModal");
    }
};

// Call async function to fetch data upon load
fetchAllData();

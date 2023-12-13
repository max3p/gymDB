/*
incidentReport.js
Populates the table in incidentReport.html
*/

const baseURL = 'http://localhost:3000/api';

// User Icon
var imageUrl = "./images/equipment.png";

// Fetches entire table from database
async function fetchAllData() {
    try {
        // Set up variables
        const entityNameToRetrieve = 'IncidentReport';
        const response = await fetch(`${baseURL}/${entityNameToRetrieve}`);
        const incidentReportList = await response.json();
        console.log(`Data retrieved from database`);

        // Get the table by ID
        var table = document.getElementById("incidentReportTable");

        // Iterate through the data and create rows
        for (var i = 0; i < incidentReportList.length; i++) {
            // Create a new row
            var row = table.insertRow(i);

            // Insert an image into the leftmost cell
            var imgCell = row.insertCell(0);
            var img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Image";
            imgCell.appendChild(img);

            // Insert incidentReport_id into the second cell
            var incidentReportIdCell = row.insertCell(1);
            incidentReportIdCell.innerHTML = incidentReportList[i].incidentreport_id;

            // Insert "Expand" button into the fourth cell
            var expandCell = row.insertCell(2);
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

                // Get the incidentReport_id from the second cell of the clicked row
                var incidentReportId = table.rows[rowIndex].cells[1].innerHTML;

                // Call the expand function with the incidentReport_id
                expand(incidentReportId);
            }
        });

     } catch (error) {
        console.error('Error:', error);
    }
}

// Fetches data on one entity, then opens the Expand modal
async function expand(incidentReportID) {
    console.log("Expanding incidentReport ID:", incidentReportID);

    const entityName = 'IncidentReport';
    fetch(`${baseURL}/${entityName}/${incidentReportID}`)
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

// Function to open expand modal and display incidentReport ID
function openExpandModal(incidentReportObject) {
    var modal = document.getElementById("expandModal");
    var incidentReportIdInModal = document.getElementById("incidentReportIdInModal");

    // Set the incidentReport data in the modal content
    incidentReportIdInModal.textContent = "IncidentReport ID: " + incidentReportObject.incidentReport_id;
    incidentReportPeopleInvolvedInModal.textContent = "People Inolved: " + incidentReportObject.people_involved;
    incidentReportEquipmentInvolvedInModal.textContent = "Equipment Involved: " + incidentReportObject.equipment_involved;
    incidentReportDateInModal.textContent = "Date: " + incidentReportObject.date;

    // Update event listeners and text for "Edit" and "Delete" buttons
    editButton.removeEventListener("click", null);
    editButton.addEventListener("click", function() {
        editIncidentReport(incidentReportObject);
    });

    deleteButton.removeEventListener("click", null);
    deleteButton.addEventListener("click", function() {
        deleteIncidentReport(incidentReportObject.incidentReport_id);
    });

    // Display the modal
    modal.style.display = "block";
}

// Function to open Add New modal
function openAddNewModal() {
    var modal = document.getElementById("addNewModal");
    
    // Ensure form is clear
    document.getElementById("peopleInvolved").value = '';
    document.getElementById("equipmentInvolved").value = '';
    document.getElementById("date").value = '';

    modal.style.display = "block";
}

// Collects data in a form for the Add New modal
function collectData() {
    // Get form elements
    var people_invoved = document.getElementById("peopleInvolved").value;
    var equipment_involved = document.getElementById("equipmentInvolved").value;
    var date = document.getElementById("date").value;

    // Create an object to store the data
    var newObject = {
        people_involved: people_invoved,
        equipment_involved: equipment_involved,
        date: date
    };

    // Send the new object to the database
    fetch(`${baseURL}/incidentReport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
      })
        .then((response) => response.json())
        .then(() => console.log('\nInserted new IncidentReport into the db'))
        .catch((error) => console.error('Error:', error));

    // Close modal, show a popup window confirmation, then refresh page
    closeModal("addNewModal");
    alert("New IncidentReport Added Successfully");
    location.reload();
}

// Opens a form to edit the incidentReport with the specified ID
function editIncidentReport(incidentReportObject){
    console.log("edit incidentReport with id:" + incidentReportObject.incidentReport_id);

    // Close Expand modal
    closeModal('expandModal');

    // Display Edit modal
    var modal = document.getElementById("editModal");
    modal.style.display = "block";

    // Populate form fields with default values
    document.getElementById("peopleInvolved2").value = incidentReportObject.peopleInvolved;
    document.getElementById("equipmentInvolved2").value = incidentReportObject.equipmentInvolved;
    document.getElementById("date2").value = incidentReportObject.date;
}

// Collects data in a form for Edit modal, updates the database
function updateData() {
    // Get form elements
    var people_invoved = document.getElementById("peopleInvolved2").value;
    var equipment_involved = document.getElementById("equipmentInvolved2").value;
    var date = document.getElementById("date2").value;
    var id = document.getElementById("id2").value;

    // Create an object to store the data
    var updateObject = {
        incidentReport_id: id,
        people_involved: people_invoved,
        equipment_involved: equipment_involved,
        date: date
    };

    // Update each attribute in the database one by one
    const entityType = 'incidentReport';
    for (const [key, value] of Object.entries(updateObject)) {
        if (key !== 'incidentReport_id') {
            const attributeToUpdate = key;
            const newValueToUpdate = value;

            fetch(`${baseURL}/${entityType}/${updateObject.incidentReport_id}`, {
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
        }
    }

    // Close modal, show a popup window confirmation, then refresh page
    closeModal("editModal");
    alert("IncidentReport updated Successfully");
    location.reload();
}

// Deletes the incidentReport with the specified ID
function deleteIncidentReport(incidentReport_id){
    console.log("deleting incidentReport with id:" + incidentReport_id);

    // Show a confirmation dialog
    var confirmed = window.confirm("Are you sure you want to delete this incidentReport?");
    if (confirmed) {
        // If user clicks "OK"
        const entityNameToDelete = 'IncidentReport';
        fetch(`${baseURL}/${entityNameToDelete}/${incidentReport_id}`, {
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

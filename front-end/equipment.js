/*
equipment.js
Populates the table in equipment.html
*/

const baseURL = 'http://localhost:3000/api';

// User Icon
var imageUrl = "./images/equipment.png";

// Fetches entire table from database
async function fetchAllData() {
    try {
        // Set up variables
        const entityNameToRetrieve = 'Equipment';
        const response = await fetch(`${baseURL}/${entityNameToRetrieve}`);
        const equipmentList = await response.json();
        console.log(`Data retrieved from database`);

        // Get the table by ID
        var table = document.getElementById("equipmentTable");

        // Iterate through the data and create rows
        for (var i = 0; i < equipmentList.length; i++) {
            // Create a new row
            var row = table.insertRow(i);

            // Insert an image into the leftmost cell
            var imgCell = row.insertCell(0);
            var img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Image";
            imgCell.appendChild(img);

            // Insert equipment_id into the second cell
            var equipmentIdCell = row.insertCell(1);
            equipmentIdCell.innerHTML = equipmentList[i].equipment_id;

            // Insert name into the third cell
            var nameCell = row.insertCell(2);
            nameCell.innerHTML = equipmentList[i].name;

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

                // Get the equipment_id from the second cell of the clicked row
                var equipmentId = table.rows[rowIndex].cells[1].innerHTML;

                // Call the expand function with the equipment_id
                expand(equipmentId);
            }
        });

     } catch (error) {
        console.error('Error:', error);
    }
}

// Fetches data on one entity, then opens the Expand modal
async function expand(equipmentID) {
    console.log("Expanding equipment ID:", equipmentID);

    const entityName = 'Equipment';
    fetch(`${baseURL}/${entityName}/${equipmentID}`)
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

// Function to open expand modal and display equipment ID
function openExpandModal(equipmentObject) {
    var modal = document.getElementById("expandModal");
    var equipmentIdInModal = document.getElementById("equipmentIdInModal");

    // Set the equipment data in the modal content
    equipmentNameInModal.textContent = "Name: " + equipmentObject.name;
    equipmentIdInModal.textContent = "Equipment ID: " + equipmentObject.equipment_id;
    equipmentConditionInModal.textContent = "Condition: " + equipmentObject.equipment_condition;
    equipmentDateInModal.textContent = "Date Bought: " + equipmentObject.date_bought;
    equipmentHistoryInModal.textContent = "Maintenence History: " + equipmentObject.maintenence_history;

    // Update event listeners and text for "Edit" and "Delete" buttons
    editButton.removeEventListener("click", null);
    editButton.addEventListener("click", function() {
        editEquipment(equipmentObject);
    });

    deleteButton.removeEventListener("click", null);
    deleteButton.addEventListener("click", function() {
        deleteEquipment(equipmentObject.equipment_id);
    });

    // Display the modal
    modal.style.display = "block";
}

// Function to open Add New modal
function openAddNewModal() {
    var modal = document.getElementById("addNewModal");
    
    // Ensure form is clear
    document.getElementById("name").value = '';
    document.getElementById("equipmentCondition").value = '';
    document.getElementById("dateBought").value = '';
    document.getElementById("maintenenceHistory").value = '';

    modal.style.display = "block";
}

// Collects data in a form for the Add New modal
function collectData() {
    // Get form elements
    var name = document.getElementById("name").value;
    var equipment_condition = document.getElementById("equipmentCondition").value;
    var date_bought = document.getElementById("dateBought").value;
    var maintenence_history = document.getElementById("maintenenceHistory").value;

    // Create an object to store the data
    var newObject = {
        name: name,
        equipment_condition: equipment_condition,
        date_bought: date_bought,
        maintenance_history: maintenence_history
    };

    // Send the new object to the database
    fetch(`${baseURL}/equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
      })
        .then((response) => response.json())
        .then(() => console.log('\nInserted new Equipment into the db'))
        .catch((error) => console.error('Error:', error));

    // Close modal, show a popup window confirmation, then refresh page
    closeModal("addNewModal");
    alert("New Equipment Added Successfully");
    location.reload();
}

// Opens a form to edit the equipment with the specified ID
function editEquipment(equipmentObject){
    console.log("edit equipment with id:" + equipmentObject.equipment_id);

    // Close Expand modal
    closeModal('expandModal');

    // Display Edit modal
    var modal = document.getElementById("editModal");
    modal.style.display = "block";

    // Populate form fields with default values
    document.getElementById("name2").value = equipmentObject.name;
    document.getElementById("equipmentCondition2").value = equipmentObject.equipment_condition;
    document.getElementById("dateBought2").value = equipmentObject.date_boughtt;
    document.getElementById("maintenenceHistory2").value = equipmentObject.maintenance_history;
}

// Collects data in a form for Edit modal, updates the database
function updateData() {
    // Get form elements
    var name = document.getElementById("name2").value;
    var equipment_condition = document.getElementById("equipmentCondition2").value;
    var date_bought = document.getElementById("dateBought2").value;
    var maintenence_history = document.getElementById("maintenenceHistory2").value;
    var id = document.getElementById("id2").value;

    // Create an object to store the data
    var updateObject = {
        equipment_id: id,
        name: name,
        equipment_condition: equipment_condition,
        date_bought: date_bought,
        maintenance_history: maintenence_history
    };

    // Update each attribute in the database one by one
    const entityType = 'equipment';
    for (const [key, value] of Object.entries(updateObject)) {
        if (key !== 'equipment_id') {
            const attributeToUpdate = key;
            const newValueToUpdate = value;

            fetch(`${baseURL}/${entityType}/${updateObject.equipment_id}`, {
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
    alert("Equipment updated Successfully");
    location.reload();
}

// Deletes the equipment with the specified ID
function deleteEquipment(equipment_id){
    console.log("deleting equipment with id:" + equipment_id);

    // Show a confirmation dialog
    var confirmed = window.confirm("Are you sure you want to delete this equipment?");
    if (confirmed) {
        // If user clicks "OK"
        const entityNameToDelete = 'Equipment';
        fetch(`${baseURL}/${entityNameToDelete}/${equipment_id}`, {
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

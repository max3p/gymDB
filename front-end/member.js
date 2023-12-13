/*
member.js
Populates the table in member.html
*/

const baseURL = 'http://localhost:3000/api';

// User Icon
var imageUrl = "./images/user-icon.png";

// Fetches entire table from database
async function fetchAllData() {
    try {
        // Set up variables
        const entityNameToRetrieve = 'Member';
        const response = await fetch(`${baseURL}/${entityNameToRetrieve}`);
        const memberList = await response.json();
        console.log(`Data retrieved from database`);

        // Get the table by ID
        var table = document.getElementById("memberTable");

        // Iterate through the data and create rows
        for (var i = 0; i < memberList.length; i++) {
            // Create a new row
            var row = table.insertRow(i);

            // Insert an image into the leftmost cell
            var imgCell = row.insertCell(0);
            var img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Image";
            imgCell.appendChild(img);

            // Insert member_id into the second cell
            var memberIdCell = row.insertCell(1);
            memberIdCell.innerHTML = memberList[i].member_id;

            // Insert name into the third cell
            var nameCell = row.insertCell(2);
            nameCell.innerHTML = memberList[i].name;

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

                // Get the member_id from the second cell of the clicked row
                var memberId = table.rows[rowIndex].cells[1].innerHTML;

                // Call the expand function with the member_id
                expand(memberId);
            }
        });

     } catch (error) {
        console.error('Error:', error);
    }
}

// Fetches data on one entity, then opens the Expand modal
async function expand(memberID) {
    console.log("Expanding member ID:", memberID);

    const entityName = 'Member';
    fetch(`${baseURL}/${entityName}/${memberID}`)
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

// Function to open expand modal and display member ID
function openExpandModal(memberObject) {
    var modal = document.getElementById("expandModal");
    var memberIdInModal = document.getElementById("memberIdInModal");

    // Set the member data in the modal content
    memberNameInModal.textContent = "Name: " + memberObject.name;
    memberIdInModal.textContent = "Member ID: " + memberObject.member_id;
    memberPhoneInModal.textContent = "Phone number: " + memberObject.phone_number;
    memberEmergencyCInModal.textContent = "Emergency Contact: " + memberObject.emergency_contact;
    memberAddressInModal.textContent = "Address: " + memberObject.address;
    memberCCInModal.textContent = "Credit Card: " + memberObject.credit_card;

    // Update event listeners and text for "Edit" and "Delete" buttons
    editButton.removeEventListener("click", null);
    editButton.addEventListener("click", function() {
        editMember(memberObject);
    });

    deleteButton.removeEventListener("click", null);
    deleteButton.addEventListener("click", function() {
        deleteMember(memberObject.member_id);
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
    document.getElementById("emergencyPhone").value = '';
    document.getElementById("address").value = '';
    document.getElementById("creditCard").value = '';

    modal.style.display = "block";
}

// Collects data in a form for the Add New modal
function collectData() {
    // Get form elements
    var name = document.getElementById("name").value;
    var phone_number = document.getElementById("phone").value;
    var emergency_contact = document.getElementById("emergencyPhone").value;
    var address = document.getElementById("address").value;
    var credit_card = document.getElementById("creditCard").value;

    // Create an object to store the data
    var newObject = {
        name: name,
        phone_number: phone_number,
        emergency_contact: emergency_contact,
        address: address,
        credit_card: credit_card
    };

    // Send the new object to the database
    fetch(`${baseURL}/member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newObject),
      })
        .then((response) => response.json())
        .then(() => console.log('\nInserted new Member into the db'))
        .catch((error) => console.error('Error:', error));

    // Close modal, show a popup window confirmation, then refresh page
    closeModal("addNewModal");
    alert("New Member Added Successfully");
    location.reload();
}

// Opens a form to edit the member with the specified ID
function editMember(memberObject){
    console.log("edit member with id:" + memberObject.member_id);

    // Close Expand modal
    closeModal('expandModal');

    // Display Edit modal
    var modal = document.getElementById("editModal");
    modal.style.display = "block";

    // Populate form fields with default values
    document.getElementById("name2").value = memberObject.name;
    document.getElementById("phone2").value = memberObject.phone_number;
    document.getElementById("emergencyPhone2").value = memberObject.emergency_contact;
    document.getElementById("address2").value = memberObject.address;
    document.getElementById("creditCard2").value = memberObject.credit_card;
    document.getElementById("id2").value = memberObject.member_id;
}

// Collects data in a form for Edit modal, updates the database
function updateData() {
    // Get form elements
    var name = document.getElementById("name2").value;
    var phone_number = document.getElementById("phone2").value;
    var emergency_contact = document.getElementById("emergencyPhone2").value;
    var address = document.getElementById("address2").value;
    var credit_card = document.getElementById("creditCard2").value;
    var id = document.getElementById("id2").value;

    // Create an object to store the data
    var updateObject = {
        member_id: id,
        name: name,
        phone_number: phone_number,
        emergency_contact: emergency_contact,
        address: address,
        credit_card: credit_card
    };

    // Update each attribute in the database one by one
    const entityType = 'member';
    for (const [key, value] of Object.entries(updateObject)) {
        if (key !== 'member_id') {
            const attributeToUpdate = key;
            const newValueToUpdate = value;

            fetch(`${baseURL}/${entityType}/${updateObject.member_id}`, {
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
    alert("Member updated Successfully");
    location.reload();
}

// Deletes the member with the specified ID
function deleteMember(member_id){
    console.log("deleting member with id:" + member_id);

    // Show a confirmation dialog
    var confirmed = window.confirm("Are you sure you want to delete this member?");
    if (confirmed) {
        // If user clicks "OK"
        const entityNameToDelete = 'Member';
        fetch(`${baseURL}/${entityNameToDelete}/${member_id}`, {
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

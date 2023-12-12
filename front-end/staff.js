/*
staff.js
Populates the table in staff.html
*/

const baseURL = 'http://localhost:3000/api';

// User Icon
var imageUrl = "./images/user-icon.png";

async function fetchAllData() {
    try {
        // Set up variables
        const entityNameToRetrieve = 'Worker';
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

// Expand function
async function expand(employeeID) {
    console.log("Expanding employee ID:", employeeID);

    const entityName = 'Worker';
    fetch(`${baseURL}/${entityName}/${employeeID}`)
        .then((response) => response.json())
        .then((tupleObject) => {
            console.log('\ngetTuple() Result:');
            openModal(tupleObject.employee_id);
        })
        .catch((error) => console.error('Error:', error));
}

// Function to open modal and display employee ID
function openModal(employeeId) {
    var modal = document.getElementById("expandModal");
    var employeeIdInModal = document.getElementById("employeeIdInModal");

    // Set the employee ID in the modal content
    employeeIdInModal.textContent = "Employee ID: " + employeeId;

    // Display the modal
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById("expandModal");
    modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    var modal = document.getElementById("expandModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Call async function to fetch data
fetchAllData();

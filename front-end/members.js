const baseURL = 'http://localhost:3000/api';
let currentMember; // Variable to store the current member being processed

// Sample list of objects representing members
const membersList = [
  {
    id: 33312345,
    firstName: 'Peter',
    middleName: 'James',
    lastName: 'Griffin',
    age: '24'
  },
  {
    id: 33312346,
    firstName: 'Lois',
    lastName: 'Griffin',
    age: '34'
  },
  {
    id: 33312347,
    firstName: 'Joe',
    lastName: 'Swanson',
    age: '44'
  },
  {
    id: 33312348,
    firstName: 'Cleveland',
    lastName: 'Brown',
    age: '44'
  },
  // Add more members as needed
];

document.addEventListener('DOMContentLoaded', function () {
  const table = document.querySelector('table');

  for (let i = 0; i < membersList.length; i++) {
    const member = membersList[i];
    const row = table.insertRow();

    // Add user icon to the first cell and make it clickable
    const iconCell = row.insertCell(0);
    const icon = document.createElement('i');
    icon.className = 'fas fa-user clickable-icon';
    icon.style.fontSize = '24px';
    icon.addEventListener('click', function () {
      // Open the modal with member information
      const modalBody = document.getElementById('memberModalBody');
      modalBody.innerHTML = ''; // Clear previous content

      // Create HTML elements for member details
      const detailsContainer = document.createElement('div');
      detailsContainer.innerHTML = `<h2>${member.firstName} ${member.lastName}</h2><ul>`;

      // Loop through the attributes of the member
      for (const key in member) {
        if (member.hasOwnProperty(key)) {
          detailsContainer.innerHTML += `<li>${key}: ${member[key]}</li>`;
        }
      }
      detailsContainer.innerHTML += `</ul>`;

      // Append details to the modal body
      modalBody.appendChild(detailsContainer);

      // Show the modal
      $('#memberModal').modal('show');
    });
    iconCell.appendChild(icon);

    // Add trash icon to the last cell and make it clickable
    const trashIconCell = row.insertCell(-1);
    const trashIcon = document.createElement('i');
    trashIcon.className = 'fas fa-trash clickable-icon';
    trashIcon.style.fontSize = '24px';

    trashIcon.addEventListener('click', function () {
      // Set the 'currentMember' variable to the clicked member
      currentMember = member;

      // Open a confirmation modal before removing the member
      const confirmationModal = document.getElementById('confirmationModal');
      confirmationModal.style.display = 'block';

      // Handle the logic to cancel the removal
      const cancelButton = document.getElementById('cancelRemoveButton');
      cancelButton.addEventListener('click', function () {
        // Close the confirmation modal
        confirmationModal.style.display = 'none';
      });
    });

    trashIconCell.appendChild(trashIcon);

    // Add other cells
    row.insertCell(1).textContent = member.id;
    row.insertCell(2).textContent = member.firstName;
    row.insertCell(3).textContent = member.lastName;
  }

  function openEditModal() {
    document.getElementById('editModal').style.display = 'block';
  }

  function submitEditForm() {
    // Add logic to handle the edit form submission
    // Close the edit modal
    document.getElementById('editModal').style.display = 'none';
  }

  // Event handler for the confirm button
  function onConfirm() {
    // Handle logic to remove the member
    const memberId = currentMember.id;

    // Send a DELETE request to the server's API
    fetch(`${baseURL}/member/${memberId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Member deleted successfully
          console.log(`Member with ID ${memberId} deleted successfully`);
          removeMember(memberId); // Update front end if needed
        } else {
          // Error handling for unsuccessful deletion
          console.error('Error deleting member:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        // Close the confirmation modal
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.style.display = 'none';

        // Update the table with the new list of members
        updateTable();
      });
  }

  // Function to handle member removal
  function removeMember(memberId) {
    // Logic to remove the member using the memberId
    console.log('Remove member with ID:', memberId);
    // Implement logic to update the front end (remove the row from the table, etc.)
  }

  // Function to update the table with the new list of members
  function updateTable() {
    // Remove all rows from the table
    const tableBody = document.getElementById('memberTableBody');
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }

    // Fetch the updated list of members (replace with your API endpoint)
    fetch(`${baseURL}/members`)
      .then(response => response.json())
      .then(data => {
        // Populate the table with the updated list of members
        data.forEach(member => {
          const row = table.insertRow();

          // Add user icon to the first cell and make it clickable
          const iconCell = row.insertCell(0);
          const icon = document.createElement('i');
          icon.className = 'fas fa-user clickable-icon';
          icon.style.fontSize = '24px';
          icon.addEventListener('click', function () {
            // Open the modal with member information
            const modalBody = document.getElementById('memberModalBody');
            modalBody.innerHTML = ''; // Clear previous content

            // Create HTML elements for member details
            const detailsContainer = document.createElement('div');
            detailsContainer.innerHTML = `<h2>${member.firstName} ${member.lastName}</h2><ul>`;

            // Loop through the attributes of the member
            for (const key in member) {
              if (member.hasOwnProperty(key)) {
                detailsContainer.innerHTML += `<li>${key}: ${member[key]}</li>`;
              }
            }
            detailsContainer.innerHTML += `</ul>`;

            // Append details to the modal body
            modalBody.appendChild(detailsContainer);

            // Show the modal
            $('#memberModal').modal('show');
          });
          iconCell.appendChild(icon);

          // Add trash icon to the last cell and make it clickable
          const trashIconCell = row.insertCell(-1);
          const trashIcon = document.createElement('i');
          trashIcon.className = 'fas fa-trash clickable-icon';
          trashIcon.style.fontSize = '24px';

          trashIcon.addEventListener('click', function () {
            // Set the 'currentMember' variable to the clicked member
            currentMember = member;

            // Open a confirmation modal before removing the member
            const confirmationModal = document.getElementById('confirmationModal');
            confirmationModal.style.display = 'block';

            // Handle the logic to cancel the removal
            const cancelButton = document.getElementById('cancelRemoveButton');
            cancelButton.addEventListener('click', function () {
              // Close the confirmation modal
              confirmationModal.style.display = 'none';
            });
          });

          trashIconCell.appendChild(trashIcon);

          // Add other cells
          row.insertCell(1).textContent = member.id;
          row.insertCell(2).textContent = member.firstName;
          row.insertCell(3).textContent = member.lastName;
        });
      })
      .catch(error => {
        console.error('Error fetching members:', error);
      });
  }
});

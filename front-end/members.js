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
        // Open a confirmation modal before removing the member
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.style.display = 'block';
  
        // Handle the logic to remove the member if confirmed
        const confirmButton = document.getElementById('confirmRemoveButton');
        confirmButton.addEventListener('click', function () {
          // Handle logic to remove the member
          removeMember(member.id);
  
          // Close the confirmation modal
          confirmationModal.style.display = 'none';
        });
  
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
  
    // Function to handle member removal
    function removeMember(memberId) {
      // Logic to remove the member using the memberId
      console.log('Remove member with ID:', memberId);
    }
  
    var suModal = document.getElementById('id21');
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == suModal) {
        suModal.style.display = 'none';
      }
    };
  
    function navigateToPage() {
      window.location.href = 'login.html';
    }
  
    function openNav() {
      document.getElementById('myNav').style.width = '100%';
    }
  
    function closeNav() {
      document.getElementById('myNav').style.width = '0%';
    }
  
    // Find the form in your HTML (add an ID to the form if not present)
    const signupForm = document.querySelector('#signupForm');
  
    // Listen for the form submission event
    signupForm.addEventListener('submit', function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      console.log('submit button pressed');
  
      // Get user input from the form fields
      const name = document.querySelector('input[name="Name"]').value;
      const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
      const address = document.querySelector('input[name="Address"]').value;
      const card = document.querySelector('input[name="Card"]').value;
      const ePhone = document.querySelector('input[name="ePhone"]').value;
  
      // Create a new member object
      const newMember = {
        name: name,
        phone_number: phoneNumber,
        emergency_contact: ePhone,
        address: address,
        card: card
        // Add other properties as needed
      };
  
      // then call addMember to insert the new member into the db
      fetch(`${baseURL}/member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      })
        .then((response) => response.json())
        .then(() => console.log('\nInserted new Member into the db'))
        .catch((error) => console.error('Error:', error));
    });
  });
  
// Sample list of objects representing members
const membersList = [
    {
      id: 33312345,
      firstName: 'Peter',
      middleName: 'james',
      lastName: 'Griffin',
      age: '24'
    },
    {
      id: 33312345,
      firstName: 'Lois',
      lastName: 'Griffin',
      age: '34'
    },
    {
      id: 33312345,
      firstName: 'Joe',
      lastName: 'Swanson',
      age: '44'
    },
    {
      id: 33312345,
      firstName: 'Cleveland',
      lastName: 'Brown',
      age: '44'
    },
    // Add more members as needed
  ];
  
  // Accessing and displaying information in the table
  document.addEventListener('DOMContentLoaded', function () {
    const table = document.querySelector('table');

for (let i = 0; i < membersList.length; i++) {
  const member = membersList[i];
  const row = table.insertRow();

  // Add user icon to the first cell and make it clickable
  const iconCell = row.insertCell(0);
  const icon = document.createElement('i');
  icon.className = 'glyphicon glyphicon-user clickable-icon';
  icon.style.fontSize = '24px';
  icon.addEventListener('click', function() {
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

    // Create HTML elements for member details
    // const detailsContainer = document.createElement('div');
    // detailsContainer.innerHTML = `
    //   <h2>${member.firstName} ${member.lastName}</h2>
    //   <p>ID: ${member.id}</p>
    //   <p>Age: ${member.age}</p>
    //   <p>Email: ${member.email}</p>
    //   <!-- Add more details as needed -->
    // `;

    // Append details to the modal body
    modalBody.appendChild(detailsContainer);

    // Show the modal
    $('#memberModal').modal('show');
  });
  iconCell.appendChild(icon);
  
        // Add other cells
        row.insertCell(1).textContent = member.id;
        row.insertCell(2).textContent = member.firstName;
        row.insertCell(3).textContent = member.lastName;
      }
  });
  
// Sample list of objects representing members
const membersList = [
    {
      id: 33312345,
      firstName: 'Peter',
      lastName: 'Griffin',
    },
    {
      id: 33312345,
      firstName: 'Lois',
      lastName: 'Griffin',
    },
    {
      id: 33312345,
      firstName: 'Joe',
      lastName: 'Swanson',
    },
    {
      id: 33312345,
      firstName: 'Cleveland',
      lastName: 'Brown',
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
        modalBody.innerHTML = `<h2>${member.firstName} ${member.lastName}</h2><p>ID: ${member.id}</p>`;
        $('#memberModal').modal('show');
      });
      iconCell.appendChild(icon);

      row.insertCell(1).textContent = member.id;
      row.insertCell(2).textContent = member.firstName;
      row.insertCell(3).textContent = member.lastName;
    }
  });
  
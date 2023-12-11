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
      row.insertCell(0).textContent = member.id;
      row.insertCell(1).textContent = member.firstName;
      row.insertCell(2).textContent = member.lastName;
    }
  });
  
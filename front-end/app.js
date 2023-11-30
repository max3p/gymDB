/*
app.js
Fetches data from the back-end API
*/

document.addEventListener('DOMContentLoaded', () => {
    const membersListElement = document.getElementById('membersList');
    const workersListElement = document.getElementById('workersList');

    // Function to fetch members from the API
    const fetchMembers = async () => {
        console.log('app.js: called fetchMembers'); //DEBUG
        try {
            const response = await fetch('http://localhost:3000/members');
            const members = await response.json();
            console.log('Members:', members);

            // Update the UI with the fetched members
            members.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `Member ${item.id}: ${item.name}`;
                membersListElement.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    // Function to fetch workers from the API
    //TODO

    // Call the fetchMembers
    fetchMembers();
});


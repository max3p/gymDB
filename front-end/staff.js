/*
staff.js
Populates the table in staff.html
*/

// Get list of all staff in db

// User Icon
var imageUrl = "./images/user-icon.png";

// test data
var staffList = [
    { employee_id: "001", name: "John Doe" },
    { employee_id: "002", name: "Jane Smith" },
    { employee_id: "003", name: "Bob Johnson" }
];

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
}

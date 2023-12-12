/*
staff.js
Populates the table in staff.html
*/

// Get list of all staff in db

// Sample data
var data = [
    ["Data 1", "Data 2", "Data 3", "Data 4"],
    ["Data 1", "Data 2", "Data 3", "Data 4"],
    ["Data 1", "Data 2", "Data 3", "Data 4"]
];

// Get the table by ID
var table = document.getElementById("staffTable");

// Iterate through the data and create rows
for (var i = 0; i < data.length; i++) {
    // Create a new row
    var row = table.insertRow(i);

    // Iterate through the data for each row and create cells
    for (var j = 0; j < data[i].length; j++) {
        // Create a new cell and set its content
        var cell = row.insertCell(j);
        cell.innerHTML = data[i][j];
    }
}

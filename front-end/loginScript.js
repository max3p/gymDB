// loginScript.js

document.addEventListener('DOMContentLoaded', function () {
    var loginButton = document.getElementById('id05');
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            loginUser();
        });
    }
});

function loginUser() {
    var hardcodedUsername = 'user';
    var hardcodedPassword = 'pass';

    // Get the entered username and password
    var username = document.getElementsByName('uname')[0].value;
    var password = document.getElementsByName('psw')[0].value;

    if (username === hardcodedUsername && password === hardcodedPassword) {
        // Redirect to another page if username and password match
        window.location.href = 'index.html';
    } else {
        // Display a message if username or password doesn't match
        alert('Invalid username or password. Please try again.');
    }
}

// loginScript.js

document.addEventListener('DOMContentLoaded', function () {
    var loginButton = document.getElementById('id05');
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            loginUser();
        });
    }
    var signupButton = document.getElementById('id14');
    if (signupButton) {
        signupButton.addEventListener('click', function () {
            signupUser();
        });
    }
});

function loginUser() {
    var hardcodedUsername = 'admin';
    var hardcodedPassword = 'password';

    // Get the entered username and password
    var username = document.getElementsByName('uname')[0].value;
    var password = document.getElementsByName('psw')[0].value;

    if (username === hardcodedUsername && password === hardcodedPassword) {
        // Redirect to another page if username and password match
        window.location.href = 'staffMenu.html';
    } else {
        // Display a message if username or password doesn't match
        alert('Invalid username or password. Please try again.');
    }
}

function signupUser(){
    var staff1ID ='344555666';
    var staff2ID ='344555666';

    var sID = document.getElementById('staffID')[0].value;
    if(sID === staff1ID || sID === staff2ID){
        window.location.href = 'staffMenu.html';
    }
    else {
        // Display a message if username or password doesn't match
        alert('Invalid ID. Please try again.');
    }
}

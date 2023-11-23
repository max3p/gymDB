// exampleQuery.js

const { queryDB } = require('./dbDriver');

// Example usage
queryDB('SELECT * FROM member', function (result) {
    console.log(result);
});

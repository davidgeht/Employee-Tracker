// Dependencies
var mysql = require('mysql');
var initQues = require('./functionset');
// connection
var connection = mysql.createConnection({
    host: 'localhost',
    PORT:3306,
    user: 'root',
    password:'30112055',
    database:'employee_db'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    initQues();

});
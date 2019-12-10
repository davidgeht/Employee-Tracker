// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');

// connection
var connection = mysql.createConnection({
    host: 'localhost',
    PORT:3306,
    user: 'root',
    password:'',
    database:'employee_db'
});
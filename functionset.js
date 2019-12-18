// dependancies
var inquirer = require("inquirer");
const { printTable } = require('console-table-printer');

// imported question sets
var {introSet,departmentSet} = require('./questions');

// var employeeSet = require('./questions');
// var employeeViewSet = require('./questions');
// var employeeUpdateSet = require('./questions');
// var roleSet = require('./questions');
// var roleViewSet = require('./questions');
// initial question 
function initQues() {
    inquirer.prompt(introSet)
        .then(async function(answers){
            switch (answers.choice) {
                case "Department Options":
                    departmentOpt();
                    break;
                
                case "Employee Options":
                    employeeOpt();
                    break;

                case "Role Options":
                    roleOpt();
                    break;

                case "Close":
                    connection.end();
                    console.log("BYE");
                    process.exit();
                    break;
            }
        });   
}

// // main option Functions
function departmentOpt(){
    inquirer.prompt(departmentSet)
        .then(async function(answers){
            switch (answers.choice){
                case "View Departments":
                    viewDepart();
                    break;
                case "Add Departments":
                    addDepart();
                    break;
                case "View Department Budgets":
                    departBudgets();
                    break;
                case "Go Back":
                    initQues();
                    break;
            }
        });
}

// function employeeOpt(){
//     inquirer.prompt(employeeSet)
//         .then(async function(answers){
//             switch (answers.choice){
//                 case "View Employees":
//                     viewEmployee();
//                     break;
//                 case "Add Employee":
//                     addEmployee();
//                     break;
//                 case "Delete Employee":
//                     deleteEmployee();
//                     break;
//                 case "Update Employee":
//                     updateEmployee();
//                     break;
//                 case "Go Back":
//                     initQues();
//                     break;  
//             }
//         });
// }

// function roleOpt(){
//     inquirer.prompt(roleSet)
//         .then(async function(answers){
//             switch(answers.choice){
//                 case "View Roles":
//                     viewRole();
//                     break;
//                 case "Add Roles":
//                     addRole();
//                     break;
//                 case "Go Back":
//                     initQues();
//                     break;
//             }
//         });
// }

// // Department funtions
// function viewDepart(){
//     let query = `SELECT id as ID, name as "Department" FROM department;`;
//     connection.query(query, function(err, res) {
//             if (err) throw err;
//     })
// }

// function addDepart(){
//     inquirer.prompt({
//         type: "input",
//         message:"What is the new departments' name ?",
//         name:"depName",
//         validate:function(value){
//             var string = value.match(/^\s*\S+.*/);
//             if (string) {
//               return true;
//             } else {
//               return "What is the new departments' name";
//             }
//           }
//     })
//     .then(function(answers){
//         let query = `INSERT INTO department (name) VALUES('${answers.depName})`;
//         connection.query(query, function(err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " record INSERTED");
//         });
//         departmemtOpt();
//     })
// };


// async function departBudgets(){
//         // Bringing updated values from a VIEW created in Database : TOTAL_BUDGET
//         let query = `select department_name as DEPARTMENT_NAME, sum(salary) as TOTAL_BUDGET from employee_budget
//         group by department_name ;`;
//             connection.query(query, function(err, res) {
//                 if (err) throw err;
//                 printTable(res);
//                 departmemtOpt();
//             });
//         }


// // Role Functions 

// function viewRole(){
//     inquirer.prompt(roleViewSet)
//         .then(async function(answers){
//             switch(answers.choice){
//                 case "All Roles":
//                     viewAllRoles();
//                     break;
//                 case "By Department":
//                     byDepRole();
//                     break;
//             }
//         });
// }

// function viewAllRoles(){
//     let query = "SELECT id AS ID, title as ROLE, salary as SALARY FROM role;";
//     connection.query(query, function(err, res) {
//           if (err) throw err;
//           printTable(res);
//           roleOpt();
// });
// }

// async function byDepRole(){
//     await departmentsJSON();

//     inquirer.prompt({
//         type:"list",
//         message:"Which Department do you wanna view the Roles by ?",
//         choices:departArr,
//         name:"depRole"
//     })
//     .then(function(answers){
//         let departID= getDepartId(answers.depName,departArr);
//         let query = `SELECT FROM Role WHERE department_id = ${departID}; `;
//         connection.query(query, function(err, res) {
//             if (err) throw err;
//             printTable(res);
//             roleOpt();
//     })
// })
// }
// async function addRole(){
//     await departmentsJSON();
//     inquirer.prompt([{
//         name:"title",
//         type:"input",
//         message:"What is the name of the role you want to create ? ",
//         validate: function(value){
//             var string = value.match(/^\s*\S+.*/);
//             if (string) {
//               return true;
//             } else {
//               return "Please enter the new ROLE Name";
//             }
//             }
//             },
//           {
//               name:"salary",
//               type:"input",
//               message:"What is the salary for the new role",
//               validate: function( value ) {
//                 var valid = !isNaN(parseFloat(value));
//                 return valid || "Please enter the SALARY ";
//               }
//           },
//           {
//               name:"department",
//               type:"list",
//               message:"What Department is the Role for ?",
//               choices:departArr
//           }
//     ])
//     .then(function(answers){
//         let departID = geDepId(answers.department,departArr);
//         var query = `INSERT INTO role(title,salary,department_id) VALUESn(?,?,${departID})`;
//         connection.query(query, [answers.title, answers.salary], function(err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " Record INSERTED");

//             roleOpt();
//     })

// })
// }
// // employee set functions
// async function addEmployee(){
//     await rolesJSON();
//     await employeesJSON();
//     inquirer.prompt([
//         {type:"input",
//         message:"What is the first name of the Employee ?",
//         name:"firstName",
//         validate: function(value){
//             var string = value.match(/^\s*\S+.*/);
//             if (string) {
//               return true;
//             } else {
//               return "Please enter the Employees FIRST NAME ";
//             }
//           }
//         },
//         {
//         type:"input",
//         message:"What is the last name of the Employee?",
//         name:"lastName",
//         validate: function(value){
//             var string = value.match(/^\s*\S+.*/);
//             if (string) {
//               return true;
//             } else {
//               return "Please enter the Employees LAST NAME ";
//             }
//           }
//         },
//         {
//         type:"list",
//         message:"What is the role of the new Employee ?",
//         choices:EmpRoleTitle,
//         name:"empRole"
//         },
//         {
//         type:"list",
//         message:"Who is the Manager of the new Employee ?",
//         choices:empManagersName,
//         name:"manager"
//         }
//     ])
//     .then(async function(answers){
//         let roleId = getRoleID(answers.empRole,roleArr);
//         let manID = getMangID(answers.manager, employeesArr);
//         function addEmp(answers,roleId,manID){
//         let query = `INSERT into employee (first_name, last_name, role_id, manager_id) VALUES('${answers.firstName}','${answers.lastName}','${answers.roleId}','${answers.managerID}');`;
//         connection.query(query, function(err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " record INSERTED");
//             employeeOpt();

//     });
// }
// addEmp(answers,roleId,manID);

// })
// }
// async function deleteEmployee() {
//     inquirer
//         .prompt([{
//             name: "EmployeeName",
//             type: "list",
//             message: "Choose the EMPLOYEE you want to REMOVE ? ",
//             choices: employeeFullName
//         }
//         ])
//         .then(function(answers) {
//             var splitName = answers.empFullName.split(" ");
//             let query = `DELETE FROM employee WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
//             connection.query(query, function(err, res) {
//                 if (err) throw err;
//                 console.log(res.affectedRows + " record DELETED");
//                 cli();
//             });
//         })
// }

// async function updateEmployee(){
//     await employeesJSON();
//     await rolesJSON();
//     inquirer.prompt([
//         {
//             type:'list',
//             message: 'Choose Employee you want to update:',
//             choices: employeeNameArr,
//             name:'employeeName'
//         }
//     ])
//     .then(function(answers){
//         var splitName = answers.employeeName.split(" ");
//         if(answers.employeeName === "None"){
//             employeeOpt();
//         }else{
//             inquirer.prompt(employeeUpdateSet)
//             .then(function(answers) {

//                 if(answers.choice === "Update First Name"){
//                     inquirer.prompt({
//                         name: "newFirstName",
//                         message: `What is the new first name for the Employee ? `,
//                         type: "input",
//                         validate: function(value){
//                             var string = value.match(/^\s*\S+.*/);
//                             if (string) {
//                               return true;
//                             } else {
//                               return "Please enter the new first name for the Employee";
//                             }
//                           }
//                     })
//                     .then(function(answers2) {
//                         let query = `UPDATE employee SET first_name='${answers2.newFirstName}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
//                         connection.query(query, function(err, res) {
//                             if (err) throw err;
//                             console.log(res.affectedRows + " record UPDATED");
//                             updateEmployee;
//                         });
//                     })
//                 }
        
//                 if(answers.choice === "Update Last Name"){
//                     inquirer.prompt({
//                         name: "newLastName",
//                         message: `What is the new last name for the Employee ? `,
//                         type: "input",
//                         validate: function(value){
//                             var string = value.match(/^\s*\S+.*/);
//                             if (string) {
//                               return true;
//                             } else {
//                               return "Please enter the new last name for the Employee";
//                             }
//                           }
//                     })
//                     .then(function(answers2) {
//                         let query = `UPDATE employee SET last_name='${answers2.newLastName}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
//                         connection.query(query, function(err, res) {
//                             if (err) throw err;
//                             console.log(res.affectedRows + " record UPDATED");
//                             updateEmployee();
//                         });
//                     })
//                 }
        
//                 if(answers.choice === "Update Role"){
//                     inquirer.prompt({
//                         name: "newRole",
//                         message: `Choose a new Role for the Employee ? `,
//                         type: "list",
//                         choices: empRole
//                     })
//                     .then(function(answers2) {
//                         let roleId = getRoleID(answers2.newRole, rolesArray);
//                         let query = `UPDATE employee SET role_id='${roleId}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
//                         connection.query(query, function(err, res) {
//                             if (err) throw err;
//                             console.log(res.affectedRows + " record UPDATED");
//                             updateEmployee();
//                         });
//                     })
//                 }
        
//                 if(answers.choice === "Update Manager"){
//                     inquirer.prompt({
//                         name: "newManager",
//                         message: `Choose the new manager for the employee ? `,
//                         type: "list",
//                         choices: employeeNameArr
//                     })
//                     .then(function(answers2) {
//                         let manId = getMangID(answers2.newManager, employeesArray);
//                         let query = `UPDATE employee SET manager_id='${manId}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
//                         connection.query(query, function(err, res) {
//                             if (err) throw err;
//                             console.log(res.affectedRows + " record UPDATED");
//                             updateEmployee();
//                         });
//                     })
        
//                 }
//                 if(answers.choice === "Go Back"){
//                     employeeOpt();
//                 }
    
//             })
//     }})

//     }

// function viewEmployee (){
//     inquirer.prompt(employeeViewSet)
//     .then(function(answers){
//         switch (answers.choice){
//             case "View All":
//                 employeeViewAll();
//                 break;
//             case "View By Role":
//                 employeeViewRole();
//                 break;
//             case "View By Manager":
//                 employeeViewManager();
//                 break;
//             case "View By Department":
//                 employeeViewDepart();
//                 break;
//             case "Go Back":
//                 employeeOpt();
//         }

//     });

// }
// // View Employees functions

// function employeeViewAll(){
//     let query = `SELECT e.id as "ID", e.first_name as "First Name", e.last_name as "Last Name",
//     r.title AS "Role", d.name as "Department", r.salary AS "Salary",
//     (select concat(emp.first_name,' ',emp.last_name) from employee as emp where e.manager_id = emp.id) AS "MANAGER"
//     FROM employee e 
//     LEFT JOIN role r ON e.role_id=r.id
//     LEFT JOIN department d ON r.department_id = d.id;`;
//     connection.query(query, function(err, res){
//         if (err) throw err;
//         printTable(res);
//         viewEmployee();
//     });

// }
// async function employeeViewRole(){
//     await rolesJSON();

//     inquirer.prompt({
//         name:"choice",
//         type:"list",
//         message:"Which Roles would you like to view the Employees from ? ",
//         choices:rolesArr
//     })
//     .then(function(answers){
//     let rolesID = getRoleID(answers.choice,rolesArr);
//     let query = `SELECT e.id as "ID", e.first_name as "First Name", e.last_name as "Last Name",
//     r.title AS "Role", d.name as "Department", r.salary AS "Salary",
//     (select concat(emp.first_name,' ',emp.last_name) from employee as emp where e.manager_id = emp.id) AS "MANAGER"
//     FROM employee e
//     WHERE role_id =${rolesID}
//     LEFT JOIN role r ON e.role_id=r.id
//     LEFT JOIN department d ON r.department_id = d.id;`;
//     connection.query(query, function(err, res){
//         if (err) throw err;
//         printTable(res);
//         viewEmployee();
//     });
//     })
//     }

// async function employeeViewDepart(){
//     await departmentsJSON();

//     inquirer.prompt({
//         name:'choice',
//         type:'list',
//         message:'Which department would you like to view the Employees from ? ',
//         choices: departArr

//     })
//     .then(function(answers){
//         let departID = getDepartId(answers.choice,departArr);
//         let query = `SELECT e.id as "ID", e.first_name as "First Name", e.last_name as "Last Name",
//     r.title AS "Role", d.name as "Department", r.salary AS "Salary",
//     (select concat(emp.first_name,' ',emp.last_name) from employee as emp where e.manager_id = emp.id) AS "MANAGER"
//     FROM employee e
//     WHERE department_id =${departID}
//     LEFT JOIN role r ON e.role_id=r.id
//     LEFT JOIN department d ON r.department_id = d.id;`;
//     connection.query(query, function(err, res){
//         if (err) throw err;
//         printTable(res);
//         viewEmployee();
//     });
//     })
// }

// // get Id functions
// function getRoleID(employeeRole, array){
//     for (var i=0; i<array.length; i++) {
//         if (array[i].title === employeeRole) {
//             return array[i].id;
//             }
//         }
// }

// function getMangID(managerName, array){
//     if (managerName === "NONE"){
//         return array.id = null;
//       }
//     else{
//     var splitName = managerName.split(" ");
//         for (var i=0; i<array.length; i++) {
//             if (array[i].first_name === splitName[0]) {
//                 return array[i].id;
//                 }
//             }
//       } 
    
// }

// function getDepartId(departmentName, array){
//         for (var i=0; i<array.length; i++) {
//             if (array[i].name === departmentName) {
//                 return array[i].id;
//                 }
//             }
// }

// // json functions
// function rolesJSON(){
//     connection.query("SELECT id, title FROM role;", function (err, res) {
//         res.forEach(function(row){
//             rolesArr.push({id:row.id , title:row.title});
//             employeeRolesNames.push(row.title);
//         })
//       if (err) throw err;
//     });
// }

//  function employeesJSON(){
// employeeFullName.push("NONE");

// connection.query("SELECT id, first_name, last_name FROM employee;", function (err, res) {
//     res.forEach(function(row){
//         employeesArr.push({id:row.id , first_name:row.first_name, last_name:row.last_name});
//         employeeName.push(row.first_name + " " + row.last_name);
//     })
//   if (err) throw err;
// });
// }

// function departmentsJSON(){
// connection.query("SELECT id, name FROM department;", function (err, res) {
//     res.forEach(function(row){
//         roleDepartment.push(row.name);
//         departArr.push({id:row.id , name:row.name});
//     })
//   if (err) throw err;
// });
// }


module.exports = initQues;
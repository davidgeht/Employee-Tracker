// dependancies
var inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
var mysql = require("mysql");
// initializing
var employeeRolesNames = [];
var employeeName = [];
var roleDepartment = [];

var rolesArr = [];
var employeesArr = [];
var departArr = []




// var connection = require("./EmployeeCRUD")
JAWSDB_URL = `mysql://n4t32x79qhpahe0n:mbpubkf5bhqmxreq@yhrz9vns005e0734.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/nskpbbqx4x6lnjrp`;
var connection;
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
    host: "yhrz9vns005e0734.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    PORT:3306,
    user: 'n4t32x79qhpahe0n',
    password:'mbpubkf5bhqmxreq',
    database:'nskpbbqx4x6lnjrp'
});
}
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    initQues();

});

// imported question sets
var {introSet,departmentSet,employeeUpdateSet,employeeSet,roleSet,roleViewSet,employeeViewSet} = require('./questions');
// initial question 
function initQues(){
    inquirer
        .prompt(introSet)
        .then(async function(answers){
            switch (answers.choice) {
                case "Department Options":
                    departmentOpt();
                    break;
                
                case "Employee Options":
                    employeeOpt();
                    break;

                case "Roles Options":
                    roleOpt();
                    break;

                case "Close":
                    connection.end();
                    console.log("BYE");
                    process.exit();
                    break;
            }
        });   
};
// main option Functions
function departmentOpt(){
    inquirer.prompt(departmentSet)
        .then(async function(answers){
            switch (answers.choice){
                case "View Departments":
                    viewDepart();
                    break;
                case "Add Department":
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

function employeeOpt(){
    inquirer.prompt(employeeSet)
        .then(function(answers){
            switch (answers.choice){
                case "View Employees":
                    viewEmployee();
                    break;
                case "Add Employees":
                    rolesJSON();
                    employeesJSON();
                    setTimeout(addEmployee,500);
                    break;
                case "Delete Employees":
                    employeesJSON();
                    setTimeout(deleteEmployee,500);
                    break;
                case "Update Employees":
                    employeesJSON();
                    rolesJSON();
                    setTimeout(updateEmployee,500);
                    break;
                case "Go Back":
                    initQues();
                    break;  
            }
        });
}

function roleOpt(){
    inquirer.prompt(roleSet)
        .then(function(answers){
            switch(answers.choice){
                case "View Roles":
                    viewRole();
                    break;
                case "Add Roles":
                    departmentsJSON();
                    setTimeout(addRole, 500);
                    break;
                case "Go Back":
                    initQues();
                    break;
            }
        });
}
// Department funtions

function viewDepart() {
    let query = `SELECT id as ID, name as "Department" FROM Department;`;
        connection.query(query, function(err, res) {
                if (err) throw err;
                printTable(res);
                departmentOpt();
            }); 
        }

function addDepart(){
    inquirer.prompt(
        {
        name:"depName",
        type: "input",
        message:"What is the new departments' name ?",
        validate:function(value){
            var string = value.match(/^\s*\S+.*/);
            if (string) {
              return true;
            } else {
              return "What is the new departments' name"
            }
          }
    })
    .then(function(answers){
        let query = `INSERT INTO Department (name) VALUES('${answers.depName}');`;
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " record INSERTED");
            departmentOpt();
        });
        
    })
};


async function departBudgets(){
        // Bringing updated values from a VIEW created in Database : TOTAL_BUDGET
        let query = `select department_name as DEPARTMENT, sum(salary) as BUDGET from department_budget
        group by department_name ;`;
            connection.query(query, function(err, res) {
                if (err) throw err;
                printTable(res);
                departmentOpt();
            });
        }


// Role Functions 

function viewRole(){
    inquirer.prompt(roleViewSet)
        .then(async function(answers){
            switch(answers.choice){
                case "All Roles":
                    viewAllRoles();
                    break;
                case "By Department":
                    departmentsJSON();
                    setTimeout(byDepRole, 500);
                    break;
            }
        });
}

function viewAllRoles(){
        let query = "SELECT id AS ID, title as ROLE, salary as SALARY FROM Role;";
        connection.query(query, function(err, res) {
              if (err) throw err;
              printTable(res);
              roleOpt();
    });
    }
    
    async function byDepRole(){
    
        inquirer.prompt({
            type:"list",
            message:"Which Department do you wanna view the Roles by ?",
            choices:departArr,
            name:"depRole"
        })
        .then(function(answers){
            let departID= getDepartId(answers.depRole,departArr);
            let query = `SELECT * FROM Role WHERE department_id = ${departID};`;
            connection.query(query, function(err, res) {
                if (err) throw err;
                printTable(res);
                roleOpt();
        })
    })
    }
    async function addRole(){
        inquirer.prompt([{
            name:"title",
            type:"input",
            message:"What is the name of the role you want to create ? ",
            validate: function(value){
                var string = value.match(/^\s*\S+.*/);
                if (string) {
                  return true;
                } else {
                  return "Please enter the new ROLE Name";
                }
                }
                },
              {
                  name:"salary",
                  type:"input",
                  message:"What is the salary for the new role",
                  validate: function( value ) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || "Please enter the SALARY ";
                  }
              },
              {
                  name:"department",
                  type:"list",
                  message:"What Department is the Role for ?",
                  choices:departArr
              }
        ])
        .then(function(answers){
            let departID = getDepartId(answers.department,departArr);
            var query = `INSERT INTO Role(title,salary,department_id) VALUES(?,?,${departID});`;
            connection.query(query, [answers.title, answers.salary], function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Record INSERTED");
    
                roleOpt();
        })
    
    })
    }
// employee set functions
async function addEmployee(){
  
    inquirer.prompt([
        {type:"input",
        message:"What is the first name of the Employee ?",
        name:"firstName",
        validate: function(value){
            var string = value.match(/^\s*\S+.*/);
            if (string) {
              return true;
            } else {
              return "Please enter the Employees FIRST NAME ";
            }
          }
        },
        {
        type:"input",
        message:"What is the last name of the Employee?",
        name:"lastName",
        validate: function(value){
            var string = value.match(/^\s*\S+.*/);
            if (string) {
              return true;
            } else {
              return "Please enter the Employees LAST NAME ";
            }
          }
        },
        {
        type:"list",
        message:"What is the role of the new Employee ?",
        choices:employeeRolesNames,
        name:"empRole"
        },
        {
        type:"list",
        message:"Who is the Manager of the new Employee ?",
        choices:employeeName,
        name:"manager"
        }
    ])
    .then(async function(answers){
        let roleID = getRoleID(answers.empRole,rolesArr);
        let managerID = getMangID(answers.manager, employeesArr);
        function addEmp(answers,roleID,managerID){
        let query = `INSERT INTO Employee (first_name,last_name,role_id, manager_id) VALUES('${answers.firstName}','${answers.lastName}','${roleID}','${managerID}');`;
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " record INSERTED");
            employeeOpt();

    });
}
addEmp(answers,roleID,managerID);

})
}
async function deleteEmployee() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "Choose the employee you want to delete ? ",
            choices: employeeName
        }
        )
        .then(function(answers) {
            var splitName = answers.choice.split(" ");
            let query = `DELETE FROM Employee WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " record DELETED");
                employeeOpt();
            });
        })
}

async function updateEmployee(){
    
    inquirer.prompt([
        {
            type:'list',
            message: 'Choose Employee you want to update:',
            choices: employeeName,
            name:'employeeName'
        }
    ])
    .then(function(answers){
        var splitName = answers.employeeName.split(" ");
        if(answers.employeeName === "None"){
            employeeOpt();
        }else{
            inquirer.prompt(employeeUpdateSet)
            .then(function(answers) {

                if(answers.choice === "Update First Name"){
                    inquirer.prompt({
                        name: "newFirstName",
                        message: `What is the new first name for the Employee ? `,
                        type: "input",
                        validate: function(value){
                            var string = value.match(/^\s*\S+.*/);
                            if (string) {
                              return true;
                            } else {
                              return "Please enter the new first name for the Employee";
                            }
                          }
                    })
                    .then(function(answers2) {
                        let query = `UPDATE Employee SET first_name='${answers2.newFirstName}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            updateEmployee();
                        });
                    })
                }
        
                if(answers.choice === "Update Last Name"){
                    inquirer.prompt({
                        name: "newLastName",
                        message: `What is the new last name for the Employee ? `,
                        type: "input",
                        validate: function(value){
                            var string = value.match(/^\s*\S+.*/);
                            if (string) {
                              return true;
                            } else {
                              return "Please enter the new last name for the Employee";
                            }
                          }
                    })
                    .then(function(answers2) {
                        let query = `UPDATE Employee SET last_name='${answers2.newLastName}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            updateEmployee();
                        });
                    })
                }
        
                if(answers.choice === "Update Role"){
                    inquirer.prompt({
                        name: "newRole",
                        message: `Choose a new Role for the Employee ? `,
                        type: "list",
                        choices: employeeRolesNames
                    })
                    .then(function(answers2) {
                        let roleId = getRoleID(answers2.newRole, rolesArr);
                        let query = `UPDATE Employee SET role_id='${roleId}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            updateEmployee();
                        });
                    })
                }
        
                if(answers.choice === "Update Manager"){
                    inquirer.prompt({
                        name: "newManager",
                        message: `Choose the new manager for the employee ? `,
                        type: "list",
                        choices:employeeName
                    })
                    .then(function(answers2) {
                        let manId = getMangID(answers2.newManager, employeesArr);
                        let query = `UPDATE Employee SET manager_id='${manId}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`
                        connection.query(query, function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " record UPDATED");
                            updateEmployee();
                        });
                    })
        
                }
                if(answers.choice === "Go Back"){
                    employeeOpt();
                }
    
            })
    }})

    }

function viewEmployee (){
    inquirer.prompt(employeeViewSet)
    .then(function(answers){
        switch (answers.choice){
            case "View All":
                employeeViewAll();
                break;
            case "View By Role":
                rolesJSON();
                setTimeout(employeeViewRole,1000);
                break;
            case "View By Manager":
                employeesJSON();
                setTimeout(employeeViewManager,500);
                break;
            case "Go back":
                employeeOpt();
                break;
        }

    });

}
// View Employees functions

function employeeViewAll(){
    let query = `SELECT e.id as "ID", e.first_name as "First Name", e.last_name as "Last Name",
    r.title AS "Role", d.name as "Department", r.salary AS "Salary",
    (select concat(emp.first_name,' ',emp.last_name) from Employee as emp where e.manager_id = emp.id) AS "MANAGER"
    FROM Employee e 
    LEFT JOIN Role r ON e.role_id=r.id
    LEFT JOIN Department d ON r.department_id = d.id;`;
    connection.query(query, function(err, res){
        if (err) throw err;
        printTable(res);
        viewEmployee();
    });

}
async function employeeViewRole(){

    inquirer.prompt({
        name:"choice",
        type:"list",
        message:"Which Roles would you like to view the Employees from ? ",
        choices:employeeRolesNames
    })
    .then(function(answers){
    let rolesID = getRoleID(answers.choice,rolesArr);
    let query = `SELECT id AS ID, first_name as 'FIRST NAME', last_name as 'LAST NAME' FROM Employee WHERE role_id=${rolesID};`;
    connection.query(query, function(err, res){
        if (err) throw err;
        printTable(res);
        viewEmployee()
    });
    })
    }

function employeeViewManager(){
    inquirer.prompt({
        name:"choice",
        type:'list',
        message:'Which manager would like to view the employees from ?',
        choices: employeeName
    })
    .then(async function(answers) {
        let manId = getMangID(answers.choice, employeesArr);

        let query = `SELECT id AS ID, first_name as 'FIRST NAME', last_name as 'LAST NAME' FROM Employee WHERE manager_id=${manId};`;
    connection.query(query, function(err, res) {
                if (err) throw err;
                if(res.length === 0){
                    console.log("No Employees working under him !!!");
                }
                else{
                    printTable(res);
                }
            employeeOpt();
        }); 
    }) 

}



// // get Id functions
function getRoleID(employeeRole, array){
    for (var i=0; i<array.length; i++) {
        if (array[i].title === employeeRole) {
            return array[i].id;
            }
        }
}

function getMangID(managerName, array){
    if (managerName === "NONE"){
        return array.id = null;
      }
    else{
    var splitName = managerName.split(" ");
        for (var i=0; i<array.length; i++) {
            if (array[i].first_name === splitName[0]) {
                return array[i].id;
                }
            }
      } 
    
}

function getDepartId(departmentName, array){
        for (var i=0; i<array.length; i++) {
            if (array[i].name === departmentName) {
                return array[i].id;
                }
            }
}


// json functions
function rolesJSON(){
    connection.query("SELECT id, title FROM Role;", function (err, res) {
        res.forEach(function(row){
            employeeRolesNames.push(row.title);
            rolesArr.push({id:row.id ,title:row.title});
        })
      if (err) throw err;
    });
}

 function employeesJSON(){
employeeName.push("NONE");

connection.query("SELECT id, first_name, last_name FROM Employee;", function (err, res) {
    res.forEach(function(row){
        employeesArr.push({id:row.id , first_name:row.first_name, last_name:row.last_name});
        employeeName.push(row.first_name + " " + row.last_name);
    })
  if (err) throw err;
});
}

function departmentsJSON(){
connection.query("SELECT id, name FROM Department;", function (err, res) {
    res.forEach(function(row){
        roleDepartment.push(row.name);
        departArr.push({id:row.id , name:row.name});
    })
  if (err) throw err;
});
}

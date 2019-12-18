var introSet = 
    {
        name:"choice",
        type:"list",
        message: "What would you like to do ?",
        choices: [
            "Department Options",
            "Employee Options",
            "Roles Options",
            "Close"
                ]
        
    };


var departmentSet = 
    {
        name: "choice",
        types:"list",
        message:"What would you like to do ?",
        choices: [
            "View Departments",
            "Add Department",
            "View Department Budgets",
            "Go Back"
        ],
        
    };


// var employeeSet = 
//     {
//         types:"list",
//         message:"What would you like to do ?",
//         choices:[
//             "View Employees",
//             "Add Employees",
//             "Delete Employees",
//             "Update Employee",
//             "Go Back"
//         ],
//         name: "choice"
//     }

// var employeeViewSet = 
//     {
//         types:"list",
//         message:"How would you like to view Employees ?",
//         choices:[
//             "View All",
//             "View By Role",
//             "View By Manager",
//             "View By Department",
//             "Go back"
//         ],
//         name:"choice"
//     }

// var employeeUpdateSet = 
//     {
//         types:"list",
//         message:"What would you like to update ?",
//         choice:[
//             "Update First Name",
//             "Update Last Name",
//             "Update Role",
//             "Update Manager",
//             "Go Back"
//         ],
//         name:"choice"
//     }

// var roleSet = 
//     {
//         types:"list",
//         message:"What would you like to do ?",
//         choices:[
//             "View Roles",
//             "Add Roles",
//             "Go Back"
//         ],
//         name: "choice"

//     }


// var roleViewSet = 
//     {
//         type:"list",
//         message:"How would you like to view Roles ?",
//         choices:[
//             "All Roles",
//             "By Department"
//         ],
//         name:"choice"
//     }




module.exports = {
    introSet,
    departmentSet,
    // employeeSet,
    // employeeViewSet,
    // employeeUpdateSet,
    // roleSet,
    // roleViewSet
};
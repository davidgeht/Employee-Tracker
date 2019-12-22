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
        type:"list",
        message:"What would you like to do ?",
        choices: [
            "View Departments",
            "Add Department",
            "View Department Budgets",
            "Go Back"
        ],
        
    };


var employeeSet = 
    {
        name: "choice",
        type:"list",
        message:"What would you like to do ?",
        choices:[
            "View Employees",
            "Add Employees",
            "Delete Employees",
            "Update Employees",
            "Go Back"
        ],
        
    };

var employeeViewSet = 
    {
        name:"choice",
        type:"list",
        message:"How would you like to view Employees ?",
        choices:[
            "View All",
            "View By Role",
            "View By Manager",
            "Go back"
        ],
        
    };

var employeeUpdateSet = 
    {
        name:"choice",
        type:"list",
        message:"What would you like to update ?",
        choices:[
            "Update First Name",
            "Update Last Name",
            "Update Role",
            "Update Manager",
            "Go Back"
        ],
        
    };

var roleSet = 
    {
        name: "choice",
        type:"list",
        message:"What would you like to do ?",
        choices:[
            "View Roles",
            "Add Roles",
            "Go Back"
        ],
        

    };


var roleViewSet = 
    {
        type:"list",
        message:"How would you like to view Roles ?",
        choices:[
            "All Roles",
            "By Department"
        ],
        name:"choice"
    };




module.exports = {
    introSet,
    departmentSet,
    employeeSet,
    employeeViewSet,
    employeeUpdateSet,
    roleSet,
    roleViewSet
};
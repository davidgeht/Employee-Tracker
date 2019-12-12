var introSet = 
    {
        types:"list",
        message: "What would you like to do ?",
        choices: [
            "Department Options",
            "Employee Options",
            "Roles Options"
                ],
        name: "choice"
    }


var departmentSet = 
    {
        types:"list",
        message:"What would you like to do ?",
        choices: [
            "View Departments",
            "Add Department",
            "Delete Department",
            "View Department Budgets"
        ],
        name: "choice"
    }


var employeeSet = 
    {
        types:"list",
        message:"What would you like to do ?",
        choices:[
            "View Employees",
            "Add Employees",
            "Delete Employees",
            "Update Employees"
        ],
        name: "choice"
    }

var employeeViewSet = 
    {
        types:"list",
        message:"How would you like to view Employees ?",
        choices:[
            "View All",
            "View By Role",
            "View By Manager",
            "View By Salary",
            "View By Department",
        ],
        name:"choice"
    }

var employeeUpdateSet = 
    {
        types:"list",
        message:"What would you like to update ?",
        choice:[
            "Update Role",
            "Update Manager"
        ],
        name:"choice"
    }

var roleSet = 
    {
        types:"list",
        message:"What would you like to do ?",
        choices:[
            "View Roles",
            "Add Roles",
            "Delete Roles"
        ],
        name: "choice"

    }


var roleViewSet = 
    {
        type:"list",
        message:"How would you like to view Roles ?",
        choices:[
            "All Roles",
            "By Department"
        ],
        name:"choice"
    }




module.exports = {
    introSet,
    departmentSet,
    employeeSet,
    employeeViewSet,
    employeeUpdateSet,
    roleSet,
    roleViewSet
};
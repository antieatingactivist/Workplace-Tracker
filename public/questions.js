var questionSets = {
    continue: [
        {
            name: "continue",
            type: "confirm",
            message: "Continue?",
        }
    ],
    welcome : [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'whatToDo',
            choices: [
                'View All Employees',
                'View Employees by Department',
                'View Employees by Manager',
                'Add Employee',
                'Remove Employee', 
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Remove Role',
                'View All Departments',
                'View Department Total Utilized Budget',
                'Add Department',
                'Remove Department',
                'Quit'
            ]
        }
    ],
    addDepartment : [
        {
            type: 'input',
            message: 'Please enter the department name.',
            name: 'departmentName'      
        }
    ],
    addRole : [
        {
            type : 'input',
            message: 'Please enter the name of the role.',
            name : 'roleName'
        },{
            type : 'input',
            message: 'Please enter the salary of this role.',
            name : 'salary'
        },{
            type: 'list',
            message: 'Which department is this role located in?',
            name: 'department',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
                
            
        }
    ],
    addEmployee : [
        {
            type : 'input',
            message: 'Please enter employee\'s first name',
            name : 'firstName'
        },{
            type : 'input',
            message: 'Please enter employee\'s last name',
            name : 'lastName'
        },{
            type: 'list',
            message: 'Please enter employee\'s role',
            name: 'role',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            }
        },{
            type: 'list',
            message: 'Please enter employee\'s manager',
            name: 'manager',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            }
        }
    ],
    viewEmployeeByDepartment : [
        {
            type: 'list',
            message: 'Please select department to view',
            name: 'departmentToView',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            }
        } 
    ],
    viewEmployeeByManager : [
        {
            type: 'list',
            message: 'Please select manager whose subordiates you would like to view',
            name: 'managerToView',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
        } 
    ],
    removeEmployee : [
        {
            type: 'list',
            message: 'Please select employee to remove',
            name: 'employeeToRemove',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
        } 
    ],
    removeRole : [
        {
            type: 'list',
            message: 'Please select role to remove',
            name: 'roleToRemove',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            }
        } 
    ],
    removeDepartment : [
        {
            type: 'list',
            message: 'Please select department to remove',
            name: 'departmentToRemove',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            }
        } 
    ],
    viewDepartmentBudget : [
        {
            type: 'list',
            message: 'Please select department to view total utilized budget',
            name: 'budget',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
        } 
    ],
    updateEmployeeRole : [
        {
            type: 'list',
            message: 'Please select employee',
            name: 'name',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
        },{
            type: 'list',
            message: 'Please enter the employee\'s new role',
            name: 'role',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
        }
    ],
    updateEmployeeManager : [
        {
            type: 'list',
            message: 'Please select employee',
            name: 'name',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
        },{
            type: 'list',
            message: 'Please enter the employee\'s new manager',
            name: 'manager',
            choices: [],
            filter(answer) {
                
                if (answer !== "cancel") return answer.match(/[1-9]/g).join('');
                else return answer;
            } 
        }
    ]
};

module.exports = questionSets;

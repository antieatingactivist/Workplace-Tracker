const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      port: 3306,
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const questionSets = {
    welcome : [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'whatToDo',
            choices: [
                'View All Employees', 
                'Add Employee', 
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
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
            type : 'input',
            message: 'Which department is this role located in?',
            name : 'department'
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
            type : 'input',
            message: 'Please enter employee\'s role',
            name : 'role'
        },{
            type : 'input',
            message: 'Please enter employee\'s manager',
            name : 'manager'
        }
    ]
};



function askQuestion(questionSet) {

    inquirer
        .prompt(questionSet)
        .then((response) => {
            console.log(response);
             switch (response.whatToDo) {
                 case 'Quit' : {
                    process.exit();
                 }
                 case 'Add Department' : {
                    askQuestion(questionSets.addDepartment);
                    break;
                 }
                 case 'Add Role' : {
                    askQuestion(questionSets.addRole);
                    break;
                 }
                 case 'Add Employee' : {
                    askQuestion(questionSets.addEmployee);
                    break;
                 }
                 case 'View All Employees' : {
                    queryDatabase('employee', ['first_name', 'last_name']);
                    break;

                 }
                 case 'View All Departments' : {
                    queryDatabase('department', ['name', 'id']);
                    break;
                 }

                 default : return response;
             }
        });
}
function queryDatabase (table, parameters) {
    db.query(`SELECT * FROM ${table}`, function (err, results) {
        if(results) {
            // console.log(results);
            results.forEach(function(result){
                parameters.forEach(function(parameter){
                    process.stdout.write(`${result[parameter]} `);
                });
                process.stdout.write('\n');
          });
        }
    });
}
askQuestion(questionSets.welcome);




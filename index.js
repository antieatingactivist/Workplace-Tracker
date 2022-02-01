const inquirer = require('inquirer');
const mysql = require('mysql2');
var AsciiTable = require('ascii-table');


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
                    // queryDatabase('department', ['name', 'id']);
                    queryDatabase('department');
                    break;
                 }

                 default : return response;
             }
        });
}
function queryDatabase (table, parameters) {
    db.query(`SELECT * FROM ${table}`, function (err, results, fields) {
        if(results) {
            // console.log(results);
            if (parameters) {
                let ascii = new AsciiTable();
                ascii.setHeading(parameters[0], parameters[1]);
                for (let i of results) {
                    ascii.addRow(i[parameters[0]], i[parameters[1]]);
                }
                console.log(ascii.toString());
                console.log(results);
                // results.forEach(function(result){
                //     ascii.addRow(result)
                    // parameters.forEach(function(parameter){
                        // process.stdout.write(`${result[parameter]} `);
                    // });
                    // process.stdout.write('\n');
                // });
            } else {
                console.log(results);
            }
        }
    });
}
askQuestion(questionSets.welcome);




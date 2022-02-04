const inquirer = require('inquirer');
const mysql = require('mysql2');
const questionSets = require('./public/questions');
const queryStrings = require('./public/queryStrings');
const cTable = require('console.table');
console.log("\x1b[1m\x1b[36;1m%s\x1b[0m", ` _    _            _          _                
| |  | |          | |        | |               
| |  | | ___  _ __| | ___ __ | | __ _  ___ ___ 
| |/\\| |/ _ \\| '__| |/ | '_ \\| |/ _\` |/ __/ _ \\
\\  /\\  | (_) | |  |   <| |_) | | (_| | (_|  __/
 \\/  \\/ \\___/|_|  |_|\\_| .__/|_|\\__,_|\\___\\___|
 _____              _  | |                     
|_   _|            | | |_|                     
  | |_ __ __ _  ___| | _____ _ __              
  | | '__/ _\` |/ __| |/ / _ | '__|             
  | | | | (_| | (__|   |  __| |                
  \\_|_|  \\__,_|\\___|_|\\_\\___|_|                
                                    `);
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'password',
      database: 'employee_db'
    },
    
    console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`Connected to the employee_db database.`)
);

function askQuestion(questionSet) {  //questionSet located in ./public/questions.js
    console.log('\n');
    inquirer
        .prompt(questionSet)
        .then((response) => {
            // console.log(response);
             if (response.continue !== undefined) {   
               
                askQuestion(questionSets.welcome);  
             }
            else if (response.managerToView) {
                // console.debug('dept viewed');
                queryDatabase(queryStrings.viewManager, response.managerToView);
             }
             else if (response.departmentToView) {
                // console.debug('dept viewed');
                queryDatabase(queryStrings.viewDepartment, response.departmentToView);
             }
             else if (response.budget) {
                // console.debug('dept budget');
                queryDatabase(queryStrings.viewBudget, response.budget);
             }
             else if (response.departmentName) {
                // console.debug('dept entered');
                queryDatabase(`INSERT INTO department (name) VALUES ("${response.departmentName}")`,null, true);
                console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nAdded ${response.departmentName} department to the database.`);
             }
             else if (response.firstName) {
                //  console.debug('name entered');
                 queryDatabase(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", "${response.role}",  "${response.manager}")`, null, true);
                 console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nAdded ${response.firstName} ${response.lastName} to the database.`);
             }
             else if (response.roleName) {
                // console.debug('role entered');
                // console.log(response.department);
                queryDatabase(`INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", ${response.salary}, ${response.department})`,null, true);
                console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nAdded ${response.roleName} role to the database.`);
                
             }
             else if (response.role) {
                // console.debug('role changed');
                queryDatabase(`UPDATE employee SET role_id = ${response.role} WHERE id = ${response.name}`, null, true);
                console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nRole Removed.`);
             }
             else if (response.manager) {
                // console.debug('manager changed');
                queryDatabase(`UPDATE employee SET manager_id = ${response.manager} WHERE id = ${response.name}`, null, true);
                console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nManager Changed.`);
             }
             else if (response.employeeToRemove) {
                // console.debug('employee removed');
                queryDatabase(`DELETE FROM employee WHERE id = ${response.employeeToRemove}`, null, true);
                console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nEmployee Removed.`);
             }
             else if (response.roleToRemove) {
                // console.debug('role removed');
                queryDatabase(`DELETE FROM role WHERE id = ${response.roleToRemove}`, null, true);
                console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nRole Removed.`);
             }
             else if (response.departmentToRemove) {
                // console.debug('department removed');
                queryDatabase(`DELETE FROM department WHERE id = ${response.departmentToRemove}`, null, true);
                console.log("\x1b[1m\x1b[32;1m%s\x1b[0m",`\nDepartment Removed.`);
             }
             else if (response.whatToDo) {
                switch (response.whatToDo) {
                    case 'Quit' : {
                        process.exit();
                    }
                    case 'Add Department' : {
                        askQuestion(questionSets.addDepartment);
                        break;
                    }
                    case 'Remove Department' : {   
                        askQuestion(questionSets.removeDepartment);
                        break;
                    }
                    case 'Add Role' : {   
                        askQuestion(questionSets.addRole);
                        break;
                    }
                    case 'Remove Role' : {   
                        askQuestion(questionSets.removeRole);
                        break;
                    }
                    case 'Add Employee' : {
                        askQuestion(questionSets.addEmployee);
                        break;
                    }
                    case 'Remove Employee' : {
                        askQuestion(questionSets.removeEmployee);
                        break;
                    }
                    case 'Update Employee Role' : {
                        askQuestion(questionSets.updateEmployeeRole);
                        break;
                    }
                    case 'Update Employee Manager' : {
                        askQuestion(questionSets.updateEmployeeManager);
                        break;
                    }
                    case 'View Employees by Department' : {
                        askQuestion(questionSets.viewEmployeeByDepartment);
                        break;
                    }
                    case 'View Employees by Manager' : {
                        askQuestion(questionSets.viewEmployeeByManager);
                        break;
                    }
                    case 'View All Employees' : {
                        queryDatabase(queryStrings.viewAllEmployees);
                        break;
                    }
                    case 'View All Departments' : {
                        queryDatabase('SELECT name AS Department, id FROM department');
                        break;
                    }
                    case 'View Department Total Utilized Budget' : {
                        askQuestion(questionSets.viewDepartmentBudget);
                        break;
                    }
                    case 'View All Roles' : {
                        queryDatabase(queryStrings.viewAllRoles);
                        break;
                    }
                    default : return response;
                }
            }
        });
}
function queryDatabase (command, parameter, hideOutput) {
    db.query(command, parameter, function (err, results) {
        if(results) {
 
            if (!hideOutput) console.table('\n',results);
            updateQuestions();
            askQuestion(questionSets.continue);
        }
        if (err) console.error(err);
    });
}

function updateQuestions() {
    let departmentList = [];
    let roleList = [];
    let employeeList = [];
    db.query('SELECT CONCAT(name, " (id: ", id, ")") AS name FROM department', function (err, results) {  
        for (let i of results) {
            departmentList.push(i.name);
        }
        questionSets.addRole[2].choices = departmentList;
        questionSets.removeDepartment[0].choices = departmentList;
        questionSets.viewEmployeeByDepartment[0].choices = departmentList;
        questionSets.viewDepartmentBudget[0].choices = departmentList;

    });
    db.query('SELECT CONCAT(title, " (id: ", id, ")") AS title FROM role', function (err, results) {
        for (let i of results) {
            roleList.push(i.title);
        }
        questionSets.addEmployee[2].choices = roleList;
        questionSets.updateEmployeeRole[1].choices = roleList;
        questionSets.removeRole[0].choices = roleList;
    });
    db.query('SELECT CONCAT(first_name," ",last_name, " (id: ", id, ")") AS name FROM employee', function (err, results) {
        for (let i of results) {
            employeeList.push(i.name);
        }
        questionSets.removeEmployee[0].choices = employeeList;
        questionSets.addEmployee[3].choices = employeeList;
        questionSets.updateEmployeeRole[0].choices = employeeList;
        questionSets.updateEmployeeManager[0].choices = employeeList;
        questionSets.updateEmployeeManager[1].choices = employeeList;
        questionSets.viewEmployeeByManager[0].choices = employeeList;
    });
}

//init

updateQuestions();
askQuestion(questionSets.welcome);




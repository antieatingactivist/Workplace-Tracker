const inquirer = require('inquirer');
const mysql = require('mysql2');
const questionSets = require('./public/questions');
// const cTable = require('console.table');
// var AsciiTable = require('ascii-table');
console.log(questionSets);
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

function askQuestion(questionSet) {  //questionSet located in ./public/questions.js
    console.log('\n');
    inquirer
        .prompt(questionSet)
        .then((response) => {
            console.log(response);
             if (response.continue) {   
                askQuestion(questionSets.welcome);  
             }
             else if (response.managerToView) {
                console.debug('dept viewed');
                queryDatabase(`SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Name ,
                                IFNULL(role.title, "*none assigned*") AS "Job Title", 
                                IFNULL(department.name, "*none assigned*") AS Department, 
                                IFNULL(role.salary, "*.**") AS Salary, 
                                IFNULL(CONCAT(manager.first_name, " ", manager.last_name), "*none assigned*") AS Manager 
                                FROM employee 
                                LEFT JOIN employee AS manager 
                                ON employee.manager_id = manager.id 
                                LEFT JOIN role 
                                ON employee.role_id = role.id 
                                LEFT JOIN department 
                                ON role.department_id = department.id
                                WHERE manager.id = ${response.managerToView}
                                ORDER BY employee.id`);
             }
             else if (response.departmentToView) {
                console.debug('dept viewed');
                queryDatabase(`SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Name ,
                                IFNULL(role.title, "*none assigned*") AS "Job Title", 
                                IFNULL(department.name, "*none assigned*") AS Department, 
                                IFNULL(role.salary, "*.**") AS Salary, 
                                IFNULL(CONCAT(manager.first_name, " ", manager.last_name), "*none assigned*") AS Manager 
                                FROM employee 
                                LEFT JOIN employee AS manager 
                                ON employee.manager_id = manager.id 
                                LEFT JOIN role 
                                ON employee.role_id = role.id 
                                LEFT JOIN department 
                                ON role.department_id = department.id
                                WHERE department.id = ${response.departmentToView}
                                ORDER BY employee.id`);
             }
             else if (response.budget) {
                console.debug('dept budget');
                queryDatabase(`SELECT SUM(salary) as "Total Budget"            
                                FROM employee 
                                LEFT JOIN employee AS manager 
                                ON employee.manager_id = manager.id 
                                LEFT JOIN role 
                                ON employee.role_id = role.id 
                                LEFT JOIN department 
                                ON role.department_id = department.id
                                WHERE department.id = ${response.budget}
                                ORDER BY employee.id`);
             }
             else if (response.departmentName) {
                console.debug('dept entered');
                queryDatabase(`INSERT INTO department (name) VALUES ("${response.departmentName}")`, true);
                
             }
             else if (response.firstName) {
                 console.debug('name entered');
                 queryDatabase(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", "${response.role}",  "${response.manager}")`, true);
             }
             else if (response.roleName) {
                console.debug('role entered');
                console.log(response.department);
                queryDatabase(`INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", ${response.salary}, ${response.department})`, true);
                
             }
             else if (response.role) {
                console.debug('role changed');
                queryDatabase(`UPDATE employee SET role_id = ${response.role} WHERE id = ${response.name}`, true);
             }
             else if (response.manager) {
                console.debug('manager changed');
                queryDatabase(`UPDATE employee SET manager_id = ${response.manager} WHERE id = ${response.name}`, true);
             }
             else if (response.employeeToRemove) {
                console.debug('employee removed');
                queryDatabase(`DELETE FROM employee WHERE id = ${response.employeeToRemove}`, true);
             }
             else if (response.roleToRemove) {
                console.debug('role removed');
                queryDatabase(`DELETE FROM role WHERE id = ${response.roleToRemove}`, true);
             }
             else if (response.departmentToRemove) {
                console.debug('department removed');
                queryDatabase(`DELETE FROM department WHERE id = ${response.departmentToRemove}`, true);
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
                        queryDatabase(
                            `SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Name ,
                            IFNULL(role.title, "*none assigned*") AS "Job Title", 
                            IFNULL(department.name, "*none assigned*") AS Department, 
                            IFNULL(role.salary, "*.**") AS Salary, 
                            IFNULL(CONCAT(manager.first_name, " ", manager.last_name), "*none assigned*") AS Manager 
                            FROM employee 
                            LEFT JOIN employee AS manager 
                            ON employee.manager_id = manager.id 
                            LEFT JOIN role 
                            ON employee.role_id = role.id 
                            LEFT JOIN department 
                            ON role.department_id = department.id
                            ORDER BY employee.id`
                        );
                        break;
                    }
                    case 'View All Departments' : {
                        queryDatabase('SELECT name AS Department, id FROM department');
                        break;
                    }
                    case 'View Department Budget' : {
                        askQuestion(questionSets.viewDepartmentBudget);
                        break;
                    }
                    case 'View All Roles' : {
                        queryDatabase('SELECT title AS Title, role.id, name AS Department, salary AS Salary FROM role JOIN department ON role.department_id = department.id');
                        break;
                    }
                    default : return response;
                }
            }
        });
}
function queryDatabase (command, hideOutput) {
    db.query(command , function (err, results) {
        if(results) {

            if (!hideOutput) console.table(results);
            // console.log(results);
            updateQuestions();
            askQuestion(questionSets.continue);
        }
        if (err) console.error(err);
    });
}


//init
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
updateQuestions();
askQuestion(questionSets.welcome);




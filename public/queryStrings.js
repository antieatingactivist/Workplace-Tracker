const queryStrings = {
    viewManager: `SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Name ,
                    IFNULL(role.title, "*none assigned*") AS "Job Title", 
                    IFNULL(department.name, "*none assigned*") AS Department, 
                    CONCAT("$", IFNULL(role.salary, "*.**")) AS Salary, 
                    IFNULL(CONCAT(manager.first_name, " ", manager.last_name), "*none assigned*") AS Manager 
                    FROM employee 
                    LEFT JOIN employee AS manager 
                    ON employee.manager_id = manager.id 
                    LEFT JOIN role 
                    ON employee.role_id = role.id 
                    LEFT JOIN department 
                    ON role.department_id = department.id
                    WHERE manager.id = ?
                    ORDER BY employee.id`,

    viewDepartment: `SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Name ,
                    IFNULL(role.title, "*none assigned*") AS "Job Title", 
                    IFNULL(department.name, "*none assigned*") AS Department, 
                    CONCAT("$", IFNULL(role.salary, "*.**")) AS Salary, 
                    IFNULL(CONCAT(manager.first_name, " ", manager.last_name), "*none assigned*") AS Manager 
                    FROM employee 
                    LEFT JOIN employee AS manager 
                    ON employee.manager_id = manager.id 
                    LEFT JOIN role 
                    ON employee.role_id = role.id 
                    LEFT JOIN department 
                    ON role.department_id = department.id
                    WHERE department.id = ?
                    ORDER BY employee.id`,

    viewBudget: `SELECT SUM(salary) as "Total Budget"            
                    FROM employee 
                    LEFT JOIN employee AS manager 
                    ON employee.manager_id = manager.id 
                    LEFT JOIN role 
                    ON employee.role_id = role.id 
                    LEFT JOIN department 
                    ON role.department_id = department.id
                    WHERE department.id = ?
                    ORDER BY employee.id`,

    viewAllEmployees: `SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Name ,
                    IFNULL(role.title, "*none assigned*") AS "Job Title", 
                    IFNULL(department.name, "*none assigned*") AS Department, 
                    CONCAT("$", IFNULL(role.salary, "*.**")) AS Salary,  
                    IFNULL(CONCAT(manager.first_name, " ", manager.last_name), "*none assigned*") AS Manager 
                    FROM employee 
                    LEFT JOIN employee AS manager 
                    ON employee.manager_id = manager.id 
                    LEFT JOIN role 
                    ON employee.role_id = role.id 
                    LEFT JOIN department 
                    ON role.department_id = department.id
                    ORDER BY employee.id`,

    viewAllRoles: `SELECT title AS Title, role.id, name AS Department, salary AS Salary 
                FROM role 
                JOIN department 
                ON role.department_id = department.id`


}

module.exports = queryStrings;
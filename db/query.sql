SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS Name ,
role.title AS "Job Title", 
department.name AS Department, 
role.salary AS Salary, 
IFNULL(CONCAT(manager.first_name, " ", manager.last_name), "NULL") AS Manager 
FROM employee 


LEFT JOIN employee AS manager 
ON employee.manager_id = manager.id 

LEFT JOIN role 
ON employee.role_id = role.id 

LEFT JOIN department 
ON role.department_id = department.id
ORDER BY employee.id
;







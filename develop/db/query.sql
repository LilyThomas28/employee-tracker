-- mainMenu()
SELECT employees.id, first_name, last_name, title, salary, department_name FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;

-- viewAllRoles()
SELECT * FROM roles;

-- updateEmpRole()
SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;
UPDATE employee SET role_id = ? WHERE first_name = ?;
SELECT * FROM employee;

-- addRole()
SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;
INSERT INTO roles (title, salary, dpt_id) VALUES (?, ?, ?);
SELECT * FROM roles;

-- viewAllDpts()
SELECT * FROM departments;
INSERT INTO department (dpt_name) VALUES ('HR');
SELECT * FROM department;

-- addDpt()
SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;


-- viewAllEmps()
SELECT * FROM employees;

-- addEmp()
SELECT first_name, last_name, title FROM department JOIN roles ON department.id = roles.dpt_id JOIN employee ON employee.role_id = roles.id;
INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)

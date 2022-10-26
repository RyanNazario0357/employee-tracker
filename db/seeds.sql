USE employeetracker_db;

INSERT INTO departments (department_name)
VALUE
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, slaary, department_id)
VALUE
('Sales Lead', 100000, 1),
('Salesperson', 70000, 1),
('Lead Engineer', 120000, 2),
('Software Engineer', 140000, 2),
('Account Manager', 180000, 3), 
('Accountant', 145000, 3),
('Legal Team Lead', 255000, 4),
('Lawyer', 200000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUE
('Ryan', 'Garcia', 1, null),
('Daniel', 'Ching', 2, 1),
('Martha', 'Torres', 3, null),
('Briane', 'Smith', 4, 3),
('Mohammad', 'Abdul', 5, null),
('Jen', 'Cleveland', 6, 5),
('TJ', 'Collin', 7, null),
('Mike', 'Harrison', 8, 7);

SELECT 
employees.id
AS Id, 
employees.first_name
AS First_Name,
employees.last_name
AS Last_Name,
roles.title
AS Title,
departments.department_name 
AS Departments, 
roles.salary 
AS Salary,
CONCAT(manager.first_name, ' ', manager.last_name) 
AS Manager
FROM employees 
LEFT JOIN roles on employees.role_id = roles.id
LEFT JOIN departments on roles.department_id = departments.id 
LEFT JOIN employees manager on manager.id = employees.manager_id
ORDER BY department_name ASC;

SELECT
roles.title
AS Title
FROM employeetracker_db.roles
ORDER BY roles.title ASC;

SELECT
roles.id
AS Id,
roles.title
AS Title,
departments.department_name
AS Departments,
roles.salary
AS Salary
FROM employeetracker_db.roles
LEFT JOIN departments on roles.department_id = departments.id
ORDER BY department_name ASC;

SELECT departments.department_name 
AS Departments
FROM departments
ORDER BY department_name ASC;

USE employeetracker_db;

SELECT employees.id, 
CONCAT(employees.first_name," ", employees.last_name)
AS FullName, 
departments.department_name 
AS Departments
FROM employees 
LEFT JOIN roles on employees.role_id = roles.id
LEFT JOIN departments on roles.department_id = departments.id
ORDER BY department_name ASC;
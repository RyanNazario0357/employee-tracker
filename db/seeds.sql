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

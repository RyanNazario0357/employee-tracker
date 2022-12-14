const connection = require('./db/connection');
const inquirer = require('inquirer');
const figlet = require('figlet');
const consoleTable = require('console.table');
const { Endpoint } = require('googleapis-common');

const addBlankLine = () => {
    console.log(` \n`)
}

const startQuestion = () => {
    addBlankLine();
    inquirer.createPromptModule({
        name: 'action',
        type: 'rawlist',
        message: 'What is going to be done?',
        choices: [
            'Add Employee',
            'Delete Employee',
            'Update Employee',
            'View Employees',
            'Add Role',
            'Delete Role',
            'View Roles',
            'Add Department',
            'Delete Department',
            'View Departments',
            'End'
        ]
    })

    .then((answer) => {
        switch (answer.action) {
        case 'Add Employee':
            addEmployee()
            break;

        case 'Delete Employee':
            removeEmployee()
            break;

        case 'Update Employee':
            updateEmployee()
            break;

        case 'View Employees':
            viewEmployees()
            break;
        
        case 'Add Role':
            addRole()
            break;

        case 'Delete Role':
            deleteRole()
            break;

        case 'View Roles':
            viewRoles()
            break;

        case 'Add Department':
            addDepartment()
            break;

        case 'Delete Department':
            deleteDepartment()
            break;

        case 'View Departments':
            viewDepartments()
            break;

        case 'End':
            End()
            break;
    }
})
}

const addEmployee = () => {
    addBlankLine();
    connection.query(`SELECT * FROM roles;`, (err,res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name:`first_name`,
                type: `input`,
                message: `Employee First Name:`
            },
            {
                namke:`Last_name`,
                type:`input`,
                message:`Employee Last Name:`
            },
            {
                name:`role`,
                type:`input`,
                message() {
                    const addEmployeeArray = [];
                    res.forEach(({title, id}) => {
                        addEmployeeArray.push(id + '=' + title);
                    });
                    console.log(`Input Employees ID:`)
                    return addEmployeeArray.join(`\n`)
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Employees Role ID Number:";
                    }
                    return true;
                },
            },
            {
                name: `manager_id`,
                type: `input`,
                message: `Manager ID:`
            }
        ])
        .then((answer) => {
            connection.query(
                `insert into employees set`,
                [
                    {
                        first_name: answer.first_name,
                        Last_name: answer.last_name,
                        role_id: answer.role,
                        manager_id: answer.manager_id
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employee added. \n`)
                    viewEmployees();
                }
            )
        })
    })
}

const deleteEmployee = () => {
    addBlankLine();
    connection.query(`SELECT * FROM roles;`, (err,res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `employees`,
                type:`input`,
                message() {
                    const employeesArray = [];
                    res.forEach(({id, first_name, last_name}) => {
                        employeesArray.push(`${id} ${first_name} ${last_name}`);
                    });
                    console.log(`Employees ID whom is to be removed:`)
                    return employeesArray.join(`\n`)
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Employees ID Number:";
                    }
                    return true;
                },
            },
        ])
        .then((answer) => {
            connection.query(
                `delete from employees where ? `,
                    {
                       id: (answer.employee)
                    },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} Deleted\n`)
                    viewEmployees();
                }
            )
        })
    })
}

const updateEmployee = () => {
    addBlankLine();
    connection.query(
        `SELECT employees.id "ID", employees.first_name "First Name", employees.last_name "Last Name" FROKM employees;`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
        }
    )
    connection.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `employeeID`,
                type: `input`,
                message: `Input ID number of desired Employee:`,
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Enter Employees ID Number";
                    }
                    return true;
                },
            },
            {
                name:`roleID`,
                type:`input`,
                message() {
                    const roleArray = [];
                    res.forEach(({ title, id}) => {
                        roleArray.push(id + `=` + title);
                    });
                    console.log(`New roles ID Number:\n`)
                    return roleArray.join(`\n`)
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Enter new roles ID";
                    }
                    return true;
                },
            }        
        ])
        .then((answer) => {
            console.log(`Role: ${answer.roleID}`)
            console.log(`Employee id: ${answer.employeeID}`)
            connection.query(`UPDATE employee SET ? WHERE ?;`,
            [
                {
                    role_id: (answer.roleID),
                },
                {
                    id: (answer.employeeID)
                },
            ],
            (err, res) => {
                if (err) throw err
                console.log(`${res.affectedRows} employee update\n`)
                viewEmployees();
            }
            )
        })
    })
};

const viewEmployees = () => {
    addBlankLine();
    connection.query(
        `SELECT employees.id AS id, employees.first_name AS First_Name, employee.last_name AS Last_Name,
        roles.title AS Title, departments.department_name AS Departments, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
        FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = 
        employees.manager_id ORDER BY department_name ASC;`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
        }
    )
    setTimeout(startQuestion,30);
}

const viewAllRoles = () => {
    addBlankLine();
    connection.query(
        `SELECT roles.id "ID", roles.title "Title" FROM roles;`,
        (err,res) => {
            if (err) throw err;
            console.table(res)
            startQuestion();
        }
    )
}

const addRole = () => {
    connection.query(`SELECT * FROM departments;`, (err,res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name:`title`,
                type: `input`,
                message: `New Roles:`
            },
            {
                namke:`salary`,
                type:`input`,
                message:`Add Salary:`
            },
            {
                name:`departments`,
                type:`input`,
                message() {
                    const departmentArray = [];
                    res.forEach(({department_name, id}) => {
                        departmentArray.push(id + '=' + department_name);
                    });
                    console.log(`Input Department ID:`)
                    return departmentArray.join(`\n`)
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Department ID Number:";
                    }
                    return true;
                },
            }
        ])
        .then((answer) => {
            connection.query(
                `INSERT INTO roles SET`,
                [
                    {
                        titile: answer.title,
                        salary: answer.salary,
                        department_id: answer.departments
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} role added. \n`)
                    viewAllRoles();
                }
            )
        })
    })
};

const deleteRole = () => {
    connection.query(`SELECT * FROM roles;`, (err,res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `roles`,
                type:`rawlist`,
                message: `What role do you want to delete? \n`,
                choices() {
                    const roleArray = [];
                    res.forEach(({ title}) => {
                        roleArray.push(title);
                    });
                    return roleArray;
                },
            },
        ])
        .then((answer) => {
            connection.query(
                `delete from roles where ? `,
                    {
                       id: (answer.roles)
                    },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} Deleted\n`)
                    viewAllRoles();
                }
            )
        })
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: `name`,
            type: `input`,
            message: `Add Department:`
        }
    ])
    .then((answer) => {
        connection.query(
            `INSERT INTO departments SET ?`,
            [
                {
                    department_name: answer.name,
                },
            ],
            (err,res => {
                if (err) throw err;
                console.log(`${res.affectedRows} new department added. \n`)
                viewAllDepartments();
            }
        )
    )}
)};
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
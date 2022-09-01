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
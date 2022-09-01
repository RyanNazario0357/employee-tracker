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
const connection = require('./db/connection');
const inquirer = require('inquirer');
const figlet = require('figlet');
const consoleTable = require('console.table');

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
            'Remove Employee',
            'Update Employee',
            'View Employees',
            'Add Role',
            'Remove Role',
            'View Roles',
            'Add Department',
            'Remove Department',
            'View Departments',
            'End'
        ]
    })
}
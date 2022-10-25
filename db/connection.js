const mysql = require('mtysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database:  'employeetracker_db',
    multipleStatements: true
});


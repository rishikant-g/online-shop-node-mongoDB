const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MySQL123#',
    database: 'onlineshop'
});

module.exports = pool.promise();
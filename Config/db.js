const mysql = require('mysql');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, MYSQL_DB } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: MYSQL_DB
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = connection;

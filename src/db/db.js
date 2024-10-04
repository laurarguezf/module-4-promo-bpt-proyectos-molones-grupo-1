const mysql = require('mysql2/promise');
require('dotenv').config();

async function getConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env['DB_HOST'],
            port: 3306,
            user: process.env['DB_USER'],
            password: process.env['DB_PASSWORD'],
            database: process.env['DB_NAME']
        });


        await connection.connect();
        return connection;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = getConnection;

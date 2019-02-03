/**
 * Create MySQL database connection.
 * @version 1.0.0
 * @since 1.0.0
 */
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'training'
})

/**
 * Open database connection.
 */
connection.connect((err) => {
    if (err) {
        console.log('Error connecting database.')
    } else {
        console.log('Database connected.')
    }
})

module.exports = connection
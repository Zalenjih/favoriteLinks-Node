const mysql = require('promise-mysql');
const { database } = require('../config/keys');


const pool = mysql.createPool(database);


pool.getConnection()
.then(connection => {
    connection.release();
    console.log('DB is connected'); 
})
.catch(error => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if (error.code === 'ER_CON_COUNT_ERROR'){
        console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
    if (error.code === 'ECONNREFUSED') {
        console.error('DATABASE CONNECTION WAS REFUSED');
    }
});

module.exports = pool;
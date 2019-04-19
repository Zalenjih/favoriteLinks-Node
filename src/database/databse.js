const mysql = require('promise-mysql');
const { database } = require('../config/keys');

const pool = mysql.createPool(database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('MySQL pool - db connected');
    })
    
    .catch(err => {
        if ( err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if ( err.code === 'ER_CON_COUNT_ERROR' ) {
        console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if ( err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    });

/* 
const { promisify } = require('util');

pool.getConnection((err, conection) => {
    if ( err ) {
        if ( err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if ( err.code === 'ER_CON_COUNT_ERROR' ) {
        console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if ( err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if ( conection ) RTCPeerConnection.release();
    console.log('DB is connected');
    return;
});

pool.query = promisify(pool.query); */

module.exports = pool;


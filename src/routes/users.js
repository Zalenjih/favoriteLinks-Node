const express = require('express');
const router = express.Router();

const pool = require('../database/database');
const passEncrypt = require('../lib/passEncrypt');
const auth = require('../lib/authentication');

router.get('/', async (req, res) => {

    const connection = await pool.getConnection();
    try {
        connection.beginTransaction();

        const users = await connection.query('SELECT * FROM users');
        res.send({
            users
        });
        connection.commit();

    } catch (error) {
        connection.rollback();
        console.log(error);
        return res.send({
            error: error,
            message: error.message
        });
    } finally {
        pool.releaseConnection(connection);
    }

});

module.exports = router;

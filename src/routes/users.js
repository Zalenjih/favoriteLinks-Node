const express = require('express');
const router = express.Router();

const pool = require('../database/database');


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
        console.log(error);
        res.send({
            error: error,
            message: error.message
        });
        connection.rollback();
    } finally {
        pool.releaseConnection(connection);
    }

});

router.post('/', async (req, res) => {
    const connection = await pool.getConnection();
    let msj = {
        ok: 'true',
        error: '',
        msj: 'Usuario creado'
    };
    try {
        connection.beginTransaction();
        const rBody = {
            username,
            password,
            fullname
        } = req.body;
        const newUser = {
            username: rBody.username,
            password: rBody.password,
            fullname: rBody.fullname
        };
        await connection.query('INSERT INTO users SET ?', [newUser]);
        connection.commit();
    } catch (error) {
        connection.rollback();
        console.log(error);
        msj.ok = false;
        msj.error = error;
        msj.msj = error.message;
        return res.send(msj);
    } finally {
        pool.releaseConnection(connection);
        return res.send(msj);
    }


});

module.exports = router;

// Rutas con promesas y transacciones
/* let conn;
let msj = {
    ok: '',
    msj: ''
};
pool.getConnection()
.then(connection => {
    conn = connection;
    connection.beginTransaction();
})
.then(() => {
    const rBody = { username, password, fullname} = req.body;
    const newUser = {
    username: rBody.username,
    password: rBody.password,
    fullname: rBody.fullname
    };
    conn.query('INSERT INTO users SET ?', [newUser]);
})
.then(() => conn.commit())
.then(() => conn.release())
.catch(err => {
    msj.ok = false;
    msj.msj = 'Error';
    res.send(msj);
    conn.rollback();
    conn.release();
    throw err;
}); */
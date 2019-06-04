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

router.post('/', async (req, res) => {
    const connection = await pool.getConnection();
    let msj = {
        ok: 'true',
        error: '',
        msj: 'Usuario creado'
    };
    try {
        await connection.beginTransaction();
        const user = {username, email, password, fullname, role} = req.body;
        /* const rBody = {
            username,
            password,
            fullname
        } = req.body;
        const newUser = {
            username: rBody.username,
            password: rBody.password,
            fullname: rBody.fullname
        }; */
        await connection.query('INSERT INTO users SET ?', [user]);
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.log(error);
        msj.ok = false;
        msj.error = error;
        msj.msj = error.message;
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
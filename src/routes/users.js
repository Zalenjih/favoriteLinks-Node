const express = require('express');
const router = express.Router();

const pool = require('../database/database');


router.get('/', (req, res) => {
    res.send('get users');
});

router.post('/', (req, res) => {
    let conn;
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
    /* todos los then para mas consultas
    .then()
    */
    .then(() => conn.commit())
    .then(() => conn.release())
    .catch(err => {
        msj.ok = false;
        msj.msj = 'Error';
        res.send(msj);
        conn.rollback();
        conn.release();
        throw err;
    });
    

    /* const rBody = { username, password, fullname} = req.body;
    const newUser = {
        username: rBody.username,
        password: rBody.password,
        fullname: rBody.fullname
    };
    await pool.query('INSERT INTO links SET ?', [newLink]);
    console.log(newUser);
    res.send('recived user'); */

    /* pool.getConnection()
    .then(connection => {
        connection.beginTransaction();
        const query = connection.query('SELECT * FROM users');
        res.status(200).send(query);
        connection.commit();
    })
    .catch(err => {

    }); */
});

module.exports = router;
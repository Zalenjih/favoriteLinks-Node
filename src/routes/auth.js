const express = require('express');
const router = express.Router();

const pool = require('../database/database');
const passEncrypt = require('../lib/passEncrypt');
const jwt = require('jsonwebtoken');
const {JWT} = require('../config/keys');

router.post('/login', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const user = {username, password} = req.body;
        await connection.beginTransaction();
        const result = await connection.query('SELECT * FROM users WHERE username = ?', [user.username]);
        await connection.commit();
        if (result.length > 0){
            const userDb = result[0];
            const validPassword = await passEncrypt.matchPassword(user.password, userDb.password);
            if (validPassword) {
                let token = jwt.sign({
                    ususario: userDb
                }, JWT.seed, {
                    expiresIn: JWT.expiration
                });
                userDb.password = 'z';
                return res.status(200).json({
                    ok: true,
                    user: userDb,
                    token
                });
            }
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Credenciales incorrectas'
                }
            });
        }
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.send({
            error: error,
            message: error.message
        });
    }
});

// TODO: modificar esta ruta para creación de ususarios
router.post('/signup', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const user = {username, email, password, fullname, role} = req.body;
        user.password = await passEncrypt.encryptPassword(user.password);
        const result = await connection.query('INSERT INTO users SET ?', [user]);
        await connection.commit();
        return res.status(201).json({
            ok: true,
            message: 'El usuario fue creado correctamente',
            result
        });
    } catch (error) {
        await connection.rollback();
        return res.status(400).json({
            ok: false,
            error
        });
    } finally {
        pool.releaseConnection(connection);
    }
});

module.exports = router;
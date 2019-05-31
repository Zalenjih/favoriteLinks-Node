const express = require('express');
const router = express.Router();

const pool = require('../database/database');


router.get('/', (req, res) => {

});

router.post('/', async (req, res) => {

    try{
        const connection = await pool.getConnection();

        try {
            const rBody = {
                title,
                url,
                description
            } = req.body;
            const newLink = {
                title: rBody.title,
                url: rBody.url,
                description: rBody.description
            };
            await connection.query('INSERT INTO links SET ?', [newLink]);
            res.send('recivido');
        } finally{
            pool.releaseConnection(connection);
        }
    }
    catch(err){
        console.log(err);
        return res.send({error: err, message: err.message});
    }

    

    // Rutas con async await
    /* let connection = await pool.getConnection();
    try {
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
        res.send('recivido');
    } catch (e) {
        console.log('Error al crear link');
        throw e;
    }
    finally{
        connection.release();
    } */
});

module.exports = router;
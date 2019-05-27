const express = require('express');
const router = express.Router();

const pool = require('../database/database');


router.get('/', (req, res) => {
    
});

router.post('/', (req, res) => {

    console.log(req.body);
    res.send('recived link');

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
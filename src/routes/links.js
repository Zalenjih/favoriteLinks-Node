const express = require('express');
const router = express.Router();

const pool = require('../database/databse');

router.get('/', (req, res) => {
    res.send('Links!');
});

router.post('/', (req, res) => {
    res.json(req.body);
    console.log(req.body);
});

module.exports = router;
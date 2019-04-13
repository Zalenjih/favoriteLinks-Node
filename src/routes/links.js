const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Links!');
});

router.post('/', (req, res) => {
    res.send('post link!');
});

module.exports = router;
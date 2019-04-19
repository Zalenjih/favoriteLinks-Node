const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Links!');
});

router.post('/', (req, res) => {
    res.json(req.body);
    console.log(req.body);
});

module.exports = router;
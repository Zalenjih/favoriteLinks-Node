const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world!');
});
router.get('/profile', (req, res) => {
    return res.send('Gracias por registrarte');
});
router.get('/inicio', (req, res) => {
    return res.send('Bienvenido usuario');
});

module.exports = router;
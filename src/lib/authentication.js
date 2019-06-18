const jwt = require('jsonwebtoken');
const { JWT } = require('../config/keys');

const auth = {};

    auth.verificaToken = async (req, res, next) => {
        try {
            const token = req.get('token');
            const decoded = await jwt.verify(token, JWT.seed);
            req.usuario = decoded.usuario;
            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                error
            });
        }
    };


module.exports = auth; 
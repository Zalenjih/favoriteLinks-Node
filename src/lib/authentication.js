const jwt = require('jsonwebtoken');
const { JWT } = require('../config/keys');

const auth = {};

    auth.verificaToken = async (req, res, next) => {
        try {
            const token = req.get('token');
            await jwt.verify(token, JWT.seed);
            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                error
            });
        }
    }


module.exports = auth; 
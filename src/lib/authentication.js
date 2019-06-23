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
                error: error
            });
        }
    };

    auth.verificaAdmin = async (req, res, next) => {
        try {
            const role = req.usuario.role;
            if (role === 'ADMIN_ROLE') {
                next();
            }
            return res.status(401).json({
                ok: false,
                message: 'No tiene permisos suficientes',
            });
        } catch (error) {
            return res.send(500).json({
                ok: false,
                error: error
            });
        }
    }


module.exports = auth; 
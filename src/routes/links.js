const express = require('express');
const router = express.Router();
const pool = require('../database/database');
const jwt = require('jsonwebtoken');
const auth = require('../lib/authentication');

// ==============================================================
// ================== OBTENER TODOS LOS LINKS ===================
// ==============================================================
router.get('/', [auth.verificaToken], async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const links = await connection.query('SELECT * FROM links');
        await connection.commit();
        res.status(200).json({
            ok: true,
            links
        })
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(400).json({
            ok: false,
            error
        });
    }
    finally {
        pool.releaseConnection(connection);
    }
});


// ==============================================================
// ============ OBTENER TODOS LOS LINKS DE UN USUARIO ===========
// ==============================================================
router.get('/user', auth.verificaToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const usuario = req.usuario;
        console.log(usuario + "Hola mundo!!!!!!!!!!");
        console.log("Hola mundo!!!!!!!!!!");
        await connection.beginTransaction();
        const links = await connection.query('SELECT * FROM links WHERE userId = ?', [usuario.id]);
        await connection.commit();
        res.status(200).json({
            ok: true,
            links: links
        });
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(400).json({
            ok: false,
            error: error
        });
    } finally {
        pool.releaseConnection(connection);
    }
});


// ==============================================================
// =================== OBTENER UN LINK POR ID ===================
// ==============================================================
router.get('/:id', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const id = req.params.id;
        const links = await connection.query('SELECT * FROM links WHERE id = ?', id );
        await connection.commit();
        return res.status(200).send({links});
    } catch (error) {
        console.log(error);
        res.send({
            error: error,
            message: error.message
        });
        await connection.rollback();
    } finally {
        pool.releaseConnection(connection);
    }
});



// ==============================================================
// ===================== CREANDO UN LINK ========================
// ==============================================================
router.post('/', auth.verificaToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const rBody = {
            userId,
            title,
            url,
            description
        } = req.body;
        const newLink = {
            userId: req.usuario.id,
            title: rBody.title,
            url: rBody.url,
            description: rBody.description
        };
        await connection.query('INSERT INTO links SET ?', [newLink]);
        await connection.commit();
        return res.status(201).json({
            ok: true,
            message: 'Link creado correctamente'
        });
    } catch (error) {
        await connection.rollback();
        return res.status(400).json({
            ok: false,
            error: error
        });
    } finally {
        pool.releaseConnection(connection);
    }
});


// ==============================================================
// ===================== EDITANDO UN LINK =======================
// ==============================================================
router.put('/:id', auth.verificaToken, async (req, res) => {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        const id = req.params.id;
        const rBody = {userId,title, url, description} = req.body;
        const editLink = {
            title,
            description,
            url
        };
        const link = await connection.query('SELECT * FROM links WHERE id = ?', id);
        if (!link.length) {
            return res.status(400).json({
                ok: false,
                message: 'No existe ese link'
            });
        } else{
        await connection.query('UPDATE links SET ? WHERE id = ?', [editLink, id]);
        await connection.commit();
        return res.status(200).json({
            ok: true,
            message: 'Link modificado correctamente'
        });
        }
    } catch (error) {
        await connection.rollback();
        return res.json({
            ok: false,
            error: error
        });
    } finally {
        pool.releaseConnection(connection);
    }
});

// ==============================================================
// ===================== BORRANDO UN LINK =======================
// ==============================================================
router.delete('/:id', auth.verificaToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();x
        const id = req.params.id;
        const link = await connection.query('SELECT * FROM links WHERE id = ?', id);
        if (!link.length) {
            return res.status(400).json({
                ok: false,
                message: 'No existe ese link'
            });
        } else{
            await connection.query('DELETE FROM links WHERE id =' + id);
            await connection.commit();
            return res.status(200).json({
                ok: true,
                message: 'Link modificado correctamente'
            });
        }
    } catch (error) {
        await connection.rollback();
        return res.json({
            ok: false,
            error: error
        });
    }
    finally {
        pool.releaseConnection(connection);
    }
});

module.exports = router;
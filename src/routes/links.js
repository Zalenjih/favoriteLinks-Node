const express = require('express');
const router = express.Router();

const pool = require('../database/database');

// TODO: revisar si es necesario usar await al iniciar y terminar trasacciones

// ==============================================================
// =================== OBTENER TODOS LOS LINKS ==================
// ==============================================================
router.get('/', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const links = await connection.query('SELECT * FROM links');
        res.send({links});
        await connection.commit();

    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.send({
            error: error,
            message: error.message
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
        const links = await connection.query('SELECT * FROM links WHERE id =' + id );
        await connection.commit();
        return res.send({links});
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
router.post('/', async (req, res) => {
    const connection = await pool.getConnection();
    let msj = {
        ok: 'true',
        error: '',
        msj: 'Link creado'
    };
    try {
        await connection.beginTransaction();
        const rBody = {
            userId,
            title,
            url,
            description
        } = req.body;
        const newLink = {
            userId: rBody.userId,
            title: rBody.title,
            url: rBody.url,
            description: rBody.description
        };
        await connection.query('INSERT INTO links SET ?', [newLink]);
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        console.log(error);
        msj.ok = false;
        msj.error = error;
        msj.msj = error.message;
        return res.send(msj);
    } finally {
        pool.releaseConnection(connection);
        return res.send(msj);
    }
});


// ==============================================================
// ===================== EDITANDO UN LINK =======================
// ==============================================================
router.put('/:id', async (req, res) => {
    const connection = await pool.getConnection();
    let msj = {
        ok: 'true',
        error: '',
        msj: 'Link modificado'
    };
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
            msj.ok = false;
            msj.msj = 'No existe ese enlace';
            return res.send({msj});
        } else{
        await connection.query('UPDATE links SET ? WHERE id = ?', [editLink, id]);
        await connection.commit();
        return res.send(msj);
        }
    } catch (error) {
        await connection.rollback();
        console.log(error);
        msj.ok = false;
        msj.error = error;
        msj.msj = error.message;
        return res.send(msj);
    } finally {
        pool.releaseConnection(connection);
    }
});

// ==============================================================
// ===================== BORRANDO UN LINK =======================
// ==============================================================
router.delete('/:id', async (req, res) => {
    const connection = await pool.getConnection();
    let msj = {
        ok: 'true',
        error: '',
        msj: 'Link eliminado con éxito'
    };
    try {
        await connection.beginTransaction();
        const id = req.params.id;
        const link = await connection.query('SELECT * FROM links WHERE id = ?', id);
        if (!link.length) {
            msj.ok = false;
            msj.msj = 'No existe ese enlace';
            return res.send({msj});
        } else{
            await connection.query('DELETE FROM links WHERE id =' + id);
            await connection.commit();
            res.send(msj);
        }
    } catch (error) {
        await connection.rollback();
        console.log(error);
        msj.ok = false;
        msj.error = error;
        msj.msj = error.message;
        return res.send(msj);
    }
    finally {
        pool.releaseConnection(connection);
    }
});

module.exports = router;
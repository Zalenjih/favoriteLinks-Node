const express = require('express');
const router = express.Router();

const pool = require('../database/database');

// ==============================================================
// =================== OBTENER TODOS LOS LINKS ==================
// ==============================================================
router.get('/', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        connection.beginTransaction();

        const links = await connection.query('SELECT * FROM links');
        res.send({links});
        connection.commit();

    } catch (error) {
        connection.rollback();
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
// ============== OBTENER LOS LINKS DE UN USUARIO ===============
// ==============================================================
router.get('/:userId', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        connection.beginTransaction();
        const userId = req.params.userId;
        const links = await connection.query('SELECT * FROM links WHERE userId =' + userId );
        res.send({links});
        connection.commit();

    } catch (error) {
        console.log(error);
        res.send({
            error: error,
            message: error.message
        });
        connection.rollback();
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
        connection.beginTransaction();
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
        connection.commit();
    } catch (error) {
        connection.rollback();
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
        connection.beginTransaction();
        const id = req.params.id;
        const link = await connection.query('SELECT * FROM links WHERE id = ?', id);
        if (!link.length) {
            msj.ok = false;
            msj.msj = 'No existe ese enlace';
            return res.send({msj});
        } else{
            await connection.query('DELETE FROM links WHERE id =' + id);
            connection.commit();
            res.send(msj);
        }
    } catch (error) {
        connection.rollback();
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
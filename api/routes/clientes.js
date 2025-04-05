import express from 'express';
import pool from '../db.js'

const router = express.Router();

// Traer todos los clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando los clientes' });
  }
});

// Agregar cliente
router.post('/', async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Clientes (nombre, email, telefono, direccion) VALUES (?, ?, ?, ?)',
      [nombre, email, telefono, direccion]
    );
    res.json({ id: result.insertId, nombre, email, telefono, direccion });
  } catch (error) {
    res.status(500).json({ error: 'Error adding client' });
  }
});

// Actualizar cliente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion } = req.body;
  try {
    await pool.query(
      'UPDATE Clientes SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id_cliente = ?',
      [nombre, email, telefono, direccion, id]
    );
    res.json({ id, nombre, email, telefono, direccion });
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar cliente: ${error}` });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Clientes WHERE id_cliente = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

export default router;

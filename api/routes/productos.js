import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Traer todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando los productos' });
  }
});

// Agregar producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO Productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, stock]
    );
    res.json({ id: result.insertId, nombre, descripcion, precio, stock });
  } catch (error) {
    res.status(500).json({ error: 'Error adding client' });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    await pool.query(
      'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?',
      [nombre, descripcion, precio, stock, id]
    );
    res.json({ id, nombre, descripcion, precio, stock });
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar producto: ${error}` });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {

  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Productos WHERE id_producto = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;

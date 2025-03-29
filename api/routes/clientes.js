import express from 'express';
import pool from '../db.js'

const router = express.Router();

// Get all clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando los clientes' });
  }
});

// Add new client
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

export default router;

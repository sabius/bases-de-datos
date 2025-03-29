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

export default router;

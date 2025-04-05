import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Traer todos los pedidos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pedidos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error cargando los pedidos' });
  }
});

export default router;

import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Traer todos los pedidos con productos
router.get('/', async (req, res) => {
  try {
    // Obtener todos los pedidos
    const [pedidos] = await pool.query('SELECT * FROM Pedidos');

    // Para cada pedido, obtener los productos asociados
    const pedidosConProductos = await Promise.all(
      pedidos.map(async (pedido) => {
        const [productos] = await pool.query(
          `SELECT
            prod.id_producto,
            prod.nombre,
            prod.descripcion,
            prod.precio,
            prod.stock,
            pp.cantidad,
            pp.precio_unitario,
            pp.subtotal
          FROM PedidoProductos pp
          JOIN Productos prod ON pp.id_producto = prod.id_producto
          WHERE pp.id_pedido = ?`,
          [pedido.id_pedido]
        );

        return {
          ...pedido,
          productos,
        };
      })
    );

    res.json(pedidosConProductos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error cargando los pedidos con productos' });
  }
});

export default router;

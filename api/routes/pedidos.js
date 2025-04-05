import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id_pedido,
        c.nombre AS nombre_cliente,
        pr.nombre AS nombre_producto,
        pp.cantidad,
        t.nombre AS nombre_transportista,
        e.descripcion AS estado_pedido
      FROM Pedidos p
      JOIN Clientes c ON p.id_cliente = c.id_cliente
      JOIN PedidoProductos pp ON p.id_pedido = pp.id_pedido
      JOIN Productos pr ON pp.id_producto = pr.id_producto
      LEFT JOIN Transportistas t ON p.id_transportista = t.id_transportista
      JOIN EstadosEnvio e ON p.id_estado = e.id_estado
      ORDER BY p.id_pedido DESC
    `);

    // Agrupamos los productos por pedido
    const pedidosMap = {};

    rows.forEach(row => {
      const id = row.id_pedido;

      if (!pedidosMap[id]) {
        pedidosMap[id] = {
          id_pedido: id,
          cliente: row.nombre_cliente,
          transportista: row.nombre_transportista,
          estado: row.estado_pedido,
          productos: []
        };
      }

      pedidosMap[id].productos.push({
        nombre: row.nombre_producto,
        cantidad: row.cantidad
      });
    });

    // Convertimos el mapa a un array
    const pedidosAgrupados = Object.values(pedidosMap);

    res.json(pedidosAgrupados);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ error: 'Error cargando los pedidos con detalles' });
  }
});

export default router;

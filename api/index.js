import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientesRoutes from './routes/clientes.js';
import productosRoutes from './routes/productos.js';
import pedidosRoutes from './routes/pedidos.js';
import tablesRoutes from './routes/tables.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);

app.use('/api/tables', tablesRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

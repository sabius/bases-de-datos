import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientesRoutes from './routes/clientes.js';
import tablesRoutes from './routes/tables.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/clientes', clientesRoutes);
app.use('/api/tables', tablesRoutes);  // <-- Register tables route

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

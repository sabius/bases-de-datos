import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all tables and their data
router.get('/', async (req, res) => {
  try {
    // Get the list of tables
    const [tables] = await pool.query("SHOW TABLES");

    if (tables.length === 0) {
      return res.status(404).json({ error: "No tables found in the database." });
    }

    const databaseTables = tables.map(row => Object.values(row)[0]); // Extract table names
    const data = {};

    // Fetch data from each table
    for (const table of databaseTables) {
      try {
        const [rows] = await pool.query(`SELECT * FROM \`${table}\``);
        data[table] = rows;
      } catch (tableError) {
        console.error(`Error fetching data from table ${table}:`, tableError);
        data[table] = { error: `Error fetching data: ${tableError.message}` };
      }
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching tables and data:", error);
    res.status(500).json({ error: `Error fetching tables and data: ${error.message}` });
  }
});

export default router;

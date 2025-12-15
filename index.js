require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour lire les formulaires
app.use(express.urlencoded({ extended: true }));

// Connexion PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Initialisation de la table + valeur
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS counter (
      id INTEGER PRIMARY KEY,
      value INTEGER NOT NULL
    )
  `);

  await pool.query(`
    INSERT INTO counter (id, value)
    VALUES (1, 0)
    ON CONFLICT (id) DO NOTHING
  `);
}

initDB();

// Page principale
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT value FROM counter WHERE id = 1');
  const value = result.rows[0].value;

  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center;">
        <h1>Compteur</h1>
        <h2>${value}</h2>

        <form method="POST" action="/increment">
          <button type="submit">+1</button>
        </form>

        <form method="POST" action="/decrement">
          <button type="submit">-1</button>
        </form>
      </body>
    </html>
  `);
});

// +1
app.post('/increment', async (req, res) => {
  await pool.query('UPDATE counter SET value = value + 1 WHERE id = 1');
  res.redirect('/');
});

// -1
app.post('/decrement', async (req, res) => {
  await pool.query('UPDATE counter SET value = value - 1 WHERE id = 1');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

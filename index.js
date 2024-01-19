const express = require('express');
const { Pool } = require('pg');
const serverless = require('serverless-http');
const app = express();
const port = 3001;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'KAVItha@123',
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
//});


const isSSL = false;
const pool = new Pool({
    connectionString: 'postgres://postgres:KAVItha@123@localhost:5432/postgres',
    ssl: {
        rejectUnauthorized: false,
    },
    ssl: isSSL ? { rejectUnauthorized: false } : false,
});

// pool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to the database. Current timestamp:', res.rows[0].now);
//     }
//     pool.end();
// });

app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM login_user');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/', async (req, res) => {
    try {

        res.json("hello");
    } catch (error) {
        console.error('Error executing SQL query', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//module.exports.handler = serverless(app);